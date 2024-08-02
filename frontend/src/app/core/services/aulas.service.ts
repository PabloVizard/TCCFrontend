import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AulasService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  async ObterAulasAluno(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterAulasAluno`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
  async ObterAulasProfessor(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `aulas/ObterAulasProfessor`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }
}
