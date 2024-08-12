import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioModel, UsuarioLightModel, UsuariosFullModel } from 'src/app/core/models/usuario-model';
import { PreRegistroModel } from 'src/app/core/models/pre-registro-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { TurmaService } from 'src/app/core/services/turma.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss']
})
export class EditarUsuariosComponent implements OnInit {
  usuarioLogado: UsuarioModel = new UsuarioModel();
  usuarioForm!: FormGroup;
  usuarioAtual!: UsuariosFullModel;
  turmasDisponiveis: TurmaModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: UsuariosFullModel, tipo: 'usuario' | 'preregistro' },
    private fb: FormBuilder,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    private turmasService: TurmaService
  ) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterTurmasDisponiveis();
    this.usuarioForm = this.fb.group({
      nomeCompleto: [''],
      cpf: [{value: ''}, Validators.required],
      matricula: ['', Validators.required],
      turma: ['', Validators.required]
    });

    if (this.data) {
      this.usuarioAtual = this.data?.data;
      this.atualizarFormulario();
    }
  }

  atualizarFormulario() {
    
    if (this.usuarioAtual) {
      if (this.usuarioAtual.usuario) {
        this.usuarioForm.patchValue({
          nomeCompleto: this.usuarioAtual.usuario.nomeCompleto,
          cpf: this.usuarioAtual.usuario.cpf,
          matricula: this.usuarioAtual.usuario.matricula,
          turma: this.usuarioAtual.turmaAluno?.id
        });
        
      } else if (this.usuarioAtual.preRegistro) {
        this.usuarioForm.patchValue({
          nomeCompleto: '',
          cpf: this.usuarioAtual.preRegistro.cpf,
          matricula: this.usuarioAtual.preRegistro.matricula,
          turma: this.usuarioAtual.turmaAluno?.id
        });
      }
    }
  }

  async obterTurmasDisponiveis() {
    await this.turmasService.ObterTurmasAtivas().then(result => {
      this.turmasDisponiveis = result;
      console.log('Turmas Disponíveis:', this.turmasDisponiveis); 
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar turmas disponíveis! " + fail.error);
    });
  }

  async salvarUsuario() {
    console.log(this.usuarioForm)
    
    if (this.usuarioForm.valid) {
      const formValue = this.usuarioForm.getRawValue();
      if(this.usuarioAtual ?? null){
        if (this.usuarioAtual.usuario) {

          var usuarioModel = new UsuarioModel();
          usuarioModel = {
            id: this.usuarioAtual.usuario.id,
            cpf: this.usuarioAtual.usuario.cpf,
            email: this.usuarioAtual.usuario.email,
            matricula: formValue.matricula,
            nomeCompleto: formValue.nomeCompleto,
            tipoUsuario: this.usuarioAtual.usuario.tipoUsuario,
            senha: ''
          }
          
          await this.usuariosService.AtualizarUsuario(usuarioModel, formValue.turma).then(result => {
            this.toastService.show("success", "Usuário atualizado com sucesso!");
          }, fail => {
            this.toastService.show("fail", "Erro ao atualizar usuário! " + fail.error);
          });
        } else if (this.usuarioAtual.preRegistro) {
          var preRegistros = new PreRegistroModel();
          preRegistros = {
            id: this.usuarioAtual.preRegistro.id,
            matricula: formValue.matricula,
            cadastrado: this.usuarioAtual.preRegistro.cadastrado, 
            cpf: formValue.cpf,
            idTurma: formValue.turma,
            tipoUsuario: this.usuarioAtual.preRegistro.tipoUsuario
          }
          await this.usuariosService.AtualizarPreRegistro(preRegistros).then(result => {
            this.toastService.show("success", "Pré-registro atualizado com sucesso!");
          }, fail => {
            this.toastService.show("fail", "Erro ao atualizar pré-registro! " + fail.error);
          });
        }
      }
      else{
        var preRegistros = new PreRegistroModel();
          preRegistros = {
            matricula: formValue.matricula,
            cadastrado: false, 
            cpf: formValue.cpf,
            idTurma: formValue.turma,
            tipoUsuario: 1
          }

          await this.usuariosService.CadastrarUsuario(preRegistros).then(result => {
            this.toastService.show("success", "Usuario cadastrado com sucesso!");
          }, fail => {
            this.toastService.show("fail", "Erro ao atualizar pré-registro! " + fail.error);
          });
      }
      
    } else {
      this.toastService.show("fail", "Erro ao salvar usuário!");
    }
  }
}
