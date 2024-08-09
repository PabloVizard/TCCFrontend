import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioLightModel } from 'src/app/core/models/usuario-model';
import { ToastService } from 'src/app/core/services/toast.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-editar-professores-orientadores',
  templateUrl: './editar-professores-orientadores.component.html',
  styleUrls: ['./editar-professores-orientadores.component.scss']
})
export class EditarProfessoresOrientadoresComponent implements OnInit {
  professorForm!: FormGroup;
  professorAtual!: UsuarioLightModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: UsuarioLightModel },
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.professorForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      matricula: ['', Validators.required],
      tipoUsuario: ['', Validators.required]
    });

    if (this.data?.data) {
      this.professorAtual = this.data.data;
      this.atualizarFormulario();
    }
  }

  atualizarFormulario() {
    if (this.professorAtual) {
      this.professorForm.patchValue({
        nomeCompleto: this.professorAtual.nomeCompleto,
        cpf: this.professorAtual.cpf,
        email: this.professorAtual.email,
        matricula: this.professorAtual.matricula,
        tipoUsuario: this.professorAtual.tipoUsuario
      });
    }
  }

  async salvarProfessor() {
    if (this.professorForm.valid) {
      const formValue = this.professorForm.getRawValue();
      if (this.professorAtual) {
        const professorModel = {
          id: this.professorAtual.id,
          ...formValue
        };
        await this.usuariosService.AtualizarProfessor(professorModel).then(result => {
          this.toastService.show("success", "Professor/Orientador atualizado com sucesso!");
          window.location.reload()
        }, fail => {
          this.toastService.show("fail", "Erro ao atualizar Professor/Orientador! " + fail.error);
        });
      } else {
        const professorModel = formValue;
        await this.usuariosService.CadastrarProfessor(professorModel).then(result => {
          this.toastService.show("success", "Professor/Orientador cadastrado com sucesso!");
          window.location.reload()
        }, fail => {
          this.toastService.show("fail", "Erro ao cadastrar Professor/Orientador! " + fail.error);
        });
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar Professor/Orientador!");
    }
  }
}
