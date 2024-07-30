import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, lastValueFrom } from 'rxjs';
import { ProjetoModel, ProjetoRetornoModel } from '../models/projeto-model';

@Injectable({
  providedIn: 'root'
})
export class ProjetosService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async obterProjetosDisponiveis(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `projetos/ObterProjetosDisponiveis`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async obterProjetosDisponiveisProfessor(idProfessor: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `projetos/obterProjetosDisponiveisProfessor?idProfessor=${idProfessor}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async ObterProjetoAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `projetos/ObterProjetoAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async ObterProjetoPorId(id: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `projetos/ObterPorId?id=${id}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async CadastrarNovoProjeto(projeto: ProjetoRetornoModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `projetos/Registrar`,projeto, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarProjeto(projeto: ProjetoRetornoModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `projetos/Atualizar`,projeto, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ExcluirProjeto(idProjeto: number): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `projetos/Remover?id=${idProjeto}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}
