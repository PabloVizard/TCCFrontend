import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async obterTarefasPorTurmaId(idTurma: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefas/ObterPorTurmaId?idTurma=${idTurma}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async obterTarefasEnviadas(idAluno: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `tarefaAluno/ObterTarefasAlunoPorIdAluno?&idAluno=${idAluno}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }


}
