import { TarefaModel } from "./tarefa-model";
import { TurmaModel } from "./turma-model";
import { UsuarioLightModel } from "./usuario-model";

export class TarefaAlunoModel{
    id!: number;
    idAluno!: number;
    idTarefa!: number;
    dataLimite!: Date;
    dataEntrega!: Date;
    anexo!: string;
}

export class TarefaAlunoTurmaFullModel{
    id!: number;
    aluno!: UsuarioLightModel;
    tarefa!: TarefaModel;
    turma!: TurmaModel;
    dataEntrega!: Date;
    anexo!: string;
}