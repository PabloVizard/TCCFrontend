import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarefaModel } from 'src/app/core/models/tarefa-model';
import { TurmaService } from 'src/app/core/services/turma.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { TarefaAlunoTurmaFullModel } from 'src/app/core/models/tarefa-aluno-model';

@Component({
  selector: 'app-alunos-tarefa',
  templateUrl: './alunos-tarefa.component.html',
  styleUrls: ['./alunos-tarefa.component.scss']
})
export class AlunosTarefaComponent implements OnInit {
  alunosTarefa: TarefaAlunoTurmaFullModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tarefasService: TarefasService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefasService.ObterAlunosTarefaPorTurma(this.data.turmaId, this.data.tarefaId).then(result => {
      this.alunosTarefa = result;
    }, fail => {
      console.error("Erro ao carregar tarefas:", fail);
    });
  }

  verAnexo(anexoUrl: string) {
    if (anexoUrl) {
      window.open(anexoUrl, '_blank');
    }
  }
}
