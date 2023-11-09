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

  async obterTurmaDoUsuario(idUsuario: number): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.urlApi + `UsuarioTurma/ObterTurmaPorUsuarioId?idUsuario=${idUsuario}`, super.ObterAuthHeaderJson())
      .pipe(catchError(super.serviceError))); 
  }

}
