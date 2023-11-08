import { Component, OnInit } from '@angular/core';
import { LoginModel } from './model/login-model';
import { LoginService } from './services/login.service';
import { UsuarioLogadoModel } from './model/usuario-logado-model';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginModel: LoginModel = new LoginModel('','');
  public usuarioLogadoModel: UsuarioLogadoModel = new UsuarioLogadoModel();
  public tokenUsuarioLogado: string = '';
  
  constructor(private loginService: LoginService,
              private toastService: ToastService,
              private router: Router){
  }
  ngOnInit(): void {
    
  }

  tipoSenha: string = 'password';

  mostrarSenha() {
    this.tipoSenha = this.tipoSenha === 'password' ? 'text' : 'password';
  }

  async LoginUsuario(){
    await this.loginService.loginUsuario(this.loginModel).then(result => {
      this.usuarioLogadoModel = result.data;
      this.tokenUsuarioLogado = result.token;
      localStorage.setItem("user", JSON.stringify(this.usuarioLogadoModel))
      localStorage.setItem("token", this.tokenUsuarioLogado)
      this.toastService.show('success',"Login realizado com sucesso!")

      
    }, fail => {
      this.toastService.show('fail',fail.error)
    })
  }
}
