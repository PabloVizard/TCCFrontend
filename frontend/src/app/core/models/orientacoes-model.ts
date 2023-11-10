import { StatusAprovacaoEnumerator } from '../enumerators/status-aprovacao.enumerator';
import { ProjetoModel } from './projeto-model';
import { TurmaModel } from './turma-model';
import { UsuarioLightModel } from './usuario-model';

export class OrientacoesModel{
    id!: number;
    alunoOrientado!: UsuarioLightModel;
    professorOrientador!: UsuarioLightModel;
    projeto!: ProjetoModel;
    turma!: TurmaModel;
    statusAprovacao!: number;
}
