import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { lastValueFrom } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { CadastroUsuarioModel } from '../models/cadastro-usuario-model';
import { UsuarioModel } from '../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async loginUsuario(loginModel: LoginModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + 'login/LoginUsuario', loginModel)
      .pipe(catchError(super.serviceError))); 
  }
  async registrarUsuario(cadastroUsuarioModel: CadastroUsuarioModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + 'login/RegistrarUsuario', cadastroUsuarioModel)
      .pipe(catchError(super.serviceError))); 
  }
  async atualizarUsuario(UsuarioModel: UsuarioModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + 'login/AtualizarUsuario', UsuarioModel)
      .pipe(catchError(super.serviceError))); 
  }
}
