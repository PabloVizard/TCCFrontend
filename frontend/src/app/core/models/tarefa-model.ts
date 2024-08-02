import { TurmaModel } from "./turma-model";
import { UsuarioLightModel, UsuarioModel } from "./usuario-model";

export class TarefaModel{
    id!: number;
    descricao!: number;
    idTurma!: number;
    idProfessor!: number;
    dataLimite!: Date;
    anexo!: string;
}

export class TarefaFullModel{
    id!: number;
    descricao!: number;
    turma!: TurmaModel;
    professor!: UsuarioLightModel;
    dataLimite!: Date;
    anexo!: string;
}