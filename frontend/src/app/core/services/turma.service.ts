import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { catchError, lastValueFrom } from 'rxjs';

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

}
