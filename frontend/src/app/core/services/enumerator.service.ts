import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { StatusAprovacaoEnumerator } from '../enumerators/status-aprovacao.enumerator';
import { TipoUsuarioEnumerator } from '../enumerators/usuario.enumerator';

@Injectable({
  providedIn: 'root'
})
export class EnumeratorService {

  constructor() {
    
  }

  getStatusAprovacao(key: StatusAprovacaoEnumerator): string {
    switch (key) {
        case StatusAprovacaoEnumerator.Iniciado:
            return "Em andamento";
        case StatusAprovacaoEnumerator.PodeDefender:
            return "Pode defender";
        case StatusAprovacaoEnumerator.Concluido:
            return "Concluido";
        case StatusAprovacaoEnumerator.Adiado:
            return "Adiado";
        case StatusAprovacaoEnumerator.Reprovado:
            return "Reprovado";
        default:
            return "Status desconhecido";
    }
}

getTipoUsuario(key: number): string {
    switch (key) {
        case TipoUsuarioEnumerator.Aluno:
            return "Aluno";
        case TipoUsuarioEnumerator.Professor:
            return "Professor";
        case TipoUsuarioEnumerator.Orientador:
            return "Orientador";
        case TipoUsuarioEnumerator.ProfessorOrientador:
            return "Professor e Orientador";
        case TipoUsuarioEnumerator.Coordenador:
            return "Coordenador";
        default:
            return "Tipo de usuário desconhecido";
    }
}

}
