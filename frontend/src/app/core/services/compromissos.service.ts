import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CompromissosService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async ObterCompromissosAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `compromissos/ObterCompromissosAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterCompromissosProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `compromissos/ObterCompromissosProfessor`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}
