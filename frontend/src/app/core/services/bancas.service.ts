import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { BancasFullModel, BancasModel } from '../models/bancas-model';

@Injectable({
  providedIn: 'root'
})
export class BancasService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async obterBancaAluno(alunoId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `bancas/ObterBancaPorAlunoId?alunoId=${alunoId}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async registrarSugestaoBanca(banca: BancasModel): Promise<any> {
    return await lastValueFrom(this.http
      .post(this.urlApi + `bancas/Registrar`, banca, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async AtualizarBanca(banca: BancasModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `bancas/Atualizar`, banca, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async obterBancaPorOrientadorId(orientadorId: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `bancas/ObterBancaPorOrientadorId?orientadorId=${orientadorId}`,super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterTodasBancas(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `bancas/ObterTodasBancas`,super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ExcluirBanca(bancaId: number): Promise<any> {
    return await lastValueFrom(this.http
      .delete(this.urlApi + `bancas/Remover?id=${bancaId}`,super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

  async ObterBancasNaoConfirmadas(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `bancas/ObterBancasNaoConfirmadas`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async BalancearBancas(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `bancas/BalancearBancas`,super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ConfirmarSugestao(banca: BancasModel): Promise<any> {
    return await lastValueFrom(this.http
      .put(this.urlApi + `bancas/atualizar`, banca,super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

}
