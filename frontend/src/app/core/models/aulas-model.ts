import { TurmaModel } from "./turma-model";
import { UsuarioLightModel } from "./usuario-model";

export class AulasModel {
    id!: number;
    descricao!: string;
    idProfessor!: number;
    idTurma!: number;
    dataAula!: Date;
    local?: string;
    link?: string;
    falta?: boolean;
}

export class AulasFullModel {
    id!: number;
    descricao!: string;
    professor!: UsuarioLightModel;
    turma!: TurmaModel;
    dataAula!: Date;
    local?: string;
    link?: string;
}
