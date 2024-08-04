import { ProjetoModel } from "./projeto-model";
import { UsuarioLightModel } from "./usuario-model";

export class BancasModel{
    id?: number;
    idProjeto!: number;
    idProfessorOrientador!: number;
    idAlunoOrientado!: number;
    idAvaliador01!: number;
    idAvaliador02?: number;
    ano!: number;
    semestre!: number;
    bancaConfirmada!: boolean;
    dataDefesa?: Date;
    status?: boolean;
}

export class BancasFullModel{
    id?: number;
    projeto!: ProjetoModel;
    professorOrientador!: UsuarioLightModel;
    alunoOrientado!: UsuarioLightModel;
    avaliador01!: UsuarioLightModel;
    avaliador02?: UsuarioLightModel;
    ano!: number;
    semestre!: number;
    bancaConfirmada!: boolean;
    dataDefesa?: Date;
    status?: boolean;
}