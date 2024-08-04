import { UsuarioLightModel } from "./usuario-model";

export class ProjetoModel{
    id!: number;
    nome!: string;
    area!: string;
    descricao!: string;
    professorResponsavel!: UsuarioLightModel;
    alunoResponsavel!: UsuarioLightModel;
}

export class ProjetoRetornoModel{
    id!: number;
    nome!: string;
    descricao!: string;
    area!: string;
    idProfessorResponsavel!: number;
    idAlunoResponsavel?: number;
}