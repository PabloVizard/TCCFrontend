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

}
