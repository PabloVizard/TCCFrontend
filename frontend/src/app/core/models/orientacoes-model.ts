import { StatusAprovacaoEnumerator } from '../enumerators/status-aprovacao.enumerator';
import { BancasModel } from './bancas-model';
import { ProjetoModel } from './projeto-model';
import { TurmaModel } from './turma-model';
import { UsuarioLightModel } from './usuario-model';

export class OrientacoesModel {
    id!: number;
    alunoOrientado!: UsuarioLightModel;
    professorOrientador!: UsuarioLightModel;
    projeto!: ProjetoModel;
    turma!: TurmaModel;
    statusAprovacao!: number;
    banca?: BancasModel;
    anexoResumoTrabalho?: string;
    anexoTAO?: string;
    localDivulgacao?: string;
  }

  export class OrientacoesModelApi {
    id!: number;
    idProfessorOrientador!: number;
    idAlunoOrientado!: number;
    idProjeto!: number;
    idTurma!: number;
    statusAprovacao!: number;
    anexoResumoTrabalho?: string;
    anexoTAO?: string;
    localDivulgacao?: string;
  }