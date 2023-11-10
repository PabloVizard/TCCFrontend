import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, lastValueFrom } from 'rxjs';

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

  async ObterProjetoAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `projetos/ObterProjetoAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}
