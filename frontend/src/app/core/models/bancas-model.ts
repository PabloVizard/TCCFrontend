import { UsuarioLightModel } from "./usuario-model";

export class BancasModel{
    id?: number;
    idProfessorOrientador!: number;
    idAlunoOrientado!: number;
    idAvaliador01!: number;
    idAvaliador02?: number;
    ano!: number;
    semestre!: number;
    bancaConfirmada!: boolean;
    dataDefesa?: Date;
}

export class BancasFullModel{
    id?: number;
    professorOrientador!: UsuarioLightModel;
    alunoOrientado!: UsuarioLightModel;
    avaliador01!: UsuarioLightModel;
    avaliador02?: UsuarioLightModel;
    ano!: number;
    semestre!: number;
    bancaConfirmada!: boolean;
    dataDefesa?: Date;
}