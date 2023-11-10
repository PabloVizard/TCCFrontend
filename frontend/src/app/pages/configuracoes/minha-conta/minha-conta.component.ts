import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TipoUsuarioEnumerator, TipoUsuarioEnumeratorString } from 'src/app/core/enumerators/usuario.enumerator';
import { LoginService } from 'src/app/core/services/login.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {
  tipoSenha: string = 'password';
  minhaContaForm!: FormGroup;
  usuario: UsuarioModel;
  confirmacaoSenha!: string;
  usuarioAtualizar!: UsuarioModel;
  editarAtivo: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private loginService: LoginService,
              private toastService: ToastService) {
    
    this.usuario = this.authService.ObterUsuarioLogado();
  }
  ngOnInit(): void {
    this.iniciarFormulario()
   
    this.minhaContaForm.disable();
  }

  salvarAlteracoes() {
    this.minhaContaForm.enable();
    this.usuarioAtualizar = this.minhaContaForm.value;
    this.usuarioAtualizar.tipoUsuario = TipoUsuarioEnumeratorString[this.usuarioAtualizar.tipoUsuario];
    
    if(this.usuarioAtualizar.senha != this.confirmacaoSenha){
      this.toastService.show('fail', 'Senhas não estão iguais!')
    }

    else if (this.minhaContaForm.valid) {
      this.loginService.atualizarUsuario(this.usuarioAtualizar).then(result => {
        localStorage.setItem('user', JSON.stringify(result.data))
        this.toastService.show('success', 'Dados alterados com sucesso!')

        window.location.reload()
      }, fail =>{
        this.toastService.show('fail', 'Erro ao salvar usuário')
      })
    }
    else{
      this.toastService.show('fail', 'Preencha todos os campos corretamente!')
    }
  }


  mostrarSenha() {
    this.tipoSenha = this.tipoSenha === 'password' ? 'text' : 'password';
  }

  ativarEdicao() {
    
    this.editarAtivo = true;
    this.minhaContaForm.enable();
  }

  cancelarEdicao() {
    this.editarAtivo = false;
    this.iniciarFormulario();
    this.minhaContaForm.disable();
  }

  iniciarFormulario(){
    this.minhaContaForm = this.formBuilder.group({
      id: [this.usuario.id],
      nomeCompleto: [this.usuario.nomeCompleto, Validators.required],
      cpf: [this.usuario.cpf, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      tipoUsuario: [TipoUsuarioEnumerator[this.usuario.tipoUsuario]]
    });
  }


}