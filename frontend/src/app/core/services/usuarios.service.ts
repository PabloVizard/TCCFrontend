import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { CadastroUsuarioModel } from '../models/cadastro-usuario-model';
import { LoginModel } from '../models/login-model';
import { BaseService } from './base.service';
import { PreRegistroModel } from '../models/pre-registro-model';
import { UsuarioLightModel, UsuarioModel } from '../models/usuario-model';

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
  async obterProfessores(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `usuarios/ObterProfessores`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTodosProfessoresOrientadores(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `usuarios/ObterTodosProfessoresOrientadores`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTodosAlunos(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `usuarios/ObterTodosAlunos`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarUsuario(usuarioModel: UsuarioModel, idTurma: number): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `usuarios/AtualizarUsuario?idTurma=${idTurma}`, usuarioModel, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarPreRegistro(preRegistro: PreRegistroModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `preregistro/Atualizar`, preRegistro, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async CadastrarUsuario(preRegistro: PreRegistroModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `preregistro/Registrar`, preRegistro, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async Remover(matricula: string): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `usuarios/RemoverUsuario?matricula=${matricula}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async CadastrarProfessor(usuario: UsuarioLightModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `usuarios/CadastrarProfessor`, usuario, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarProfessor(usuario: UsuarioLightModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `usuarios/AtualizarProfessor`, usuario, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}