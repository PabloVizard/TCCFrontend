import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, lastValueFrom } from 'rxjs';
import { FaltaModel } from '../models/falta-model';
import { TurmaModel } from '../models/turma-model';

@Injectable({
  providedIn: 'root'
})
export class TurmaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async ObterTurmasProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `UsuarioTurma/ObterTurmasProfessor`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTurmaAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `UsuarioTurma/ObterTurmaAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async LancarFalta(falta: FaltaModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `Faltas/Registrar`, falta, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterAlunosPorTurma(turmaId: number, aulaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `UsuarioTurma/ObterAlunosPorTurma?turmaId=${turmaId}&aulaId=${aulaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async RemoverFalta(idFalta: number): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `Faltas/Remover?id=${idFalta}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTurmasAtivas(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `turmas/ObterTurmasAtivas`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTodasTurmas(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `turmas/ObterTodasTurmas`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async ExcluirTurma(turmaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `turmas/Remover?id=${turmaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async CadastrarTurma(turma: TurmaModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `turmas/Registrar`, turma, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarTurma(turma: TurmaModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `turmas/Atualizar`, turma, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

}
