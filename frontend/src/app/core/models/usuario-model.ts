import { BancasModel } from "./bancas-model";
import { FaltaModel } from "./falta-model";
import { OrientacoesModel } from "./orientacoes-model";
import { PreRegistroModel } from "./pre-registro-model";
import { ProjetoModel } from "./projeto-model";
import { TarefaAlunoModel } from "./tarefa-aluno-model";
import { TurmaModel } from "./turma-model";

export class UsuarioModel{
    id!: number;
    email!: string;
    cpf!: string;
    nomeCompleto!: string;
    senha?: string;
    tipoUsuario!: number;
    matricula!: string
} 

export class UsuarioLightModel{
    id!: number;
    email!: string;
    cpf!: string;
    nomeCompleto!: string;
    tipoUsuario!: number;
    matricula!: string;
}

export interface UsuariosFullModel {
    usuario: UsuarioLightModel;
    preRegistro: PreRegistroModel;
    projetos?: ProjetoModel;
    orientacoes?: OrientacoesModel;
    bancas?: BancasModel;
    faltas?: FaltaModel;
    tarefaAluno?: TarefaAlunoModel;
    turmaAluno?: TurmaModel;
  }