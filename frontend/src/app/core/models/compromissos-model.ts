import { ProjetoModel } from "./projeto-model";
import { TurmaModel } from "./turma-model";
import { UsuarioLightModel } from "./usuario-model";

export class CompromissosModel{
    id!: number;
    tipoCompromisso!: number;
    descricao!: string;
    dataCompromisso!: Date;
    local!: string;
    link!: string;
    professorOrientador!: UsuarioLightModel;
    alunoOrientado!: UsuarioLightModel;
    turma!: TurmaModel
}