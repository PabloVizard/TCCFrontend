import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { BancasModel } from '../models/bancas-model';

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
}
