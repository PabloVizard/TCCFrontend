import { TurmaModel } from "./turma-model";
import { UsuarioLightModel } from "./usuario-model";

export class UsuarioTurmaModel{
    id!: number;
    idUsuario!: number;
    idTurma!: number;
}

export class UsuarioTurmaFullModel{
    id!: number;
    usuario!: UsuarioLightModel;
    turma!: TurmaModel;
    faltaAula!: boolean;
    quantidadeFaltas!: number;
    idFalta!: number;
}