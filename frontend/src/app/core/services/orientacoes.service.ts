import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrientacoesService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async ObterOrientacaoAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `orientacoes/ObterOrientacaoAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async obterAlunosDisponiveis(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `orientacoes/ObterAlunosDisponiveis`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async obterOrientacaoProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `orientacoes/ObterOrientacaoProfessor`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }
    
  async obterAlunosProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `orientacoes/ObterAlunos`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async ObterOrientacaoProfessorPorId(orientacaoId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `orientacoes/ObterOrientacaoProfessorPorId?orientacaoid=${orientacaoId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }
  async AtualizarInformacoesPOC1(orientacaoId: number, statusAprovacao: number, anexoTao: string): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `orientacoes/AtualizarInformacoesPOC1?orientacaoid=${orientacaoId}&status=${statusAprovacao}&anexoTao=${anexoTao}`, null, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }
  async AtualizarInformacoesPOC2(orientacaoId: number, statusAprovacao: number, anexoResumoTrabalho: string, localDivulgacao: string): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `orientacoes/AtualizarInformacoesPOC2?orientacaoid=${orientacaoId}&status=${statusAprovacao}&anexoResumoTrabalho=${anexoResumoTrabalho}&localDivulgacao=${localDivulgacao}`, null, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError)));
  }

}
