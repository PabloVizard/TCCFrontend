import { TurmaModel } from "./turma-model";
import { UsuarioLightModel, UsuarioModel } from "./usuario-model";

export class TarefaModel{
    id!: number;
    descricao!: number;
    idAluno!: number;
    idProfessor!: number;
    dataLimite!: Date;
    anexo!: string;
}

export class TarefaFullModel{
    id!: number;
    descricao!: number;
    aluno!: UsuarioLightModel;
    professor!: UsuarioLightModel;
    dataLimite!: Date;
    anexo!: string;
    entregue!: boolean;
    anexoEntregua!: string 
}