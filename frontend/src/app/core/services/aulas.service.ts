import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { AulasModel } from '../models/aulas-model';

@Injectable({
  providedIn: 'root'
})
export class AulasService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async ObterAulaPorId(aulaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterAulaPorId?aulaId=${aulaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterAulasAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterAulasAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterAulasProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterAulasProfessor`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTodasAulas(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterTodasAulas`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ExcluirAula(aulaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `aulas/Remover?id=${aulaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarAula(aula: AulasModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `aulas/Atualizar`, aula, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async CadastrarNovaAula(aula: AulasModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `aulas/Registrar`, aula, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterFaltasAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterFaltasAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}
