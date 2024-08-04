import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, lastValueFrom } from 'rxjs';
import { TarefaModel } from '../models/tarefa-model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async obterTarefasAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefas/ObterTarefasAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async obterTarefaAluno(tarefaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefaAluno/obterTarefaAluno?tarefaId=${tarefaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async obterTarefasEnviadas(idAluno: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefaAluno/ObterTarefasAlunoPorIdAluno?idAluno=${idAluno}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async registrarEnvioDeTarefa(tarefa: any): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `tarefaaluno/Atualizar`, tarefa, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async ExcluirTarefa(tarefaId: any): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `tarefas/Remover?id=${tarefaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async ObterTarefasProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefas/ObterTarefasProfessor`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async ObterTarefaPorId(tarefaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefas/ObterTarefaPorId?tarefaId=${tarefaId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async CadastrarNovaTarefa(tarefa: TarefaModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `tarefas/Registrar`, tarefa, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async AtualizarTarefa(tarefa: TarefaModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `tarefas/atualizar`, tarefa, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

  async ObterAlunosTarefaPorTurma(idTurma: number, idTarefa: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefas/ObterAlunosTarefaPorTurma?idTurma=${idTurma}&idTarefa=${idTarefa}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }
}
