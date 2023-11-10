import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { CadastroUsuarioModel } from '../models/cadastro-usuario-model';
import { LoginModel } from '../models/login-model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async obterPorId(id: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `usuarios/ObterPorId?id=${id}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}