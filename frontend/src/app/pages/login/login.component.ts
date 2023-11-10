import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../core/models/login-model';
import { LoginService } from '../../core/services/login.service';
import { UsuarioModel } from '../../core/models/usuario-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginModel: LoginModel = new LoginModel('','');
  public UsuarioModel: UsuarioModel = new UsuarioModel();
  public tokenUsuarioLogado: string = '';
  
  tipoSenha: string = 'password';
  
  constructor(private loginService: LoginService,
              private toastService: ToastService,
              private router: Router,
              private authService: AuthService){
  }
  ngOnInit(): void {

    
    if(localStorage.getItem("user")! != null){
      this.authService.MostrarMenu();
      this.router.navigate(['/home'])
    }
    
  }


  mostrarSenha() {
    this.tipoSenha = this.tipoSenha === 'password' ? 'text' : 'password';
  }

  async LoginUsuario(){
    await this.loginService.loginUsuario(this.loginModel).then(result => {
      this.UsuarioModel = result.data;
      this.tokenUsuarioLogado = result.token;
      localStorage.setItem("user", JSON.stringify(this.UsuarioModel))
      localStorage.setItem("token", this.tokenUsuarioLogado)
      this.toastService.show('success',"Login realizado com sucesso!")
      this.authService.MostrarMenu()
      this.router.navigate(['/home'])

      
    }, fail => {
      this.toastService.show('fail',fail.error)
    })
  }
}
