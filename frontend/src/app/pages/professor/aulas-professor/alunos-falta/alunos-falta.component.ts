import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FaltaModel } from 'src/app/core/models/falta-model';
import { UsuarioLightModel } from 'src/app/core/models/usuario-model';
import { UsuarioTurmaFullModel } from 'src/app/core/models/usuarios-turma-model';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaService } from 'src/app/core/services/turma.service';

@Component({
  selector: 'app-alunos-falta',
  templateUrl: './alunos-falta.component.html',
  styleUrls: ['./alunos-falta.component.scss']
})
export class AlunosFaltaComponent implements OnInit {
  alunos: UsuarioTurmaFullModel[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private turmaService: TurmaService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.turmaService.ObterAlunosPorTurma(this.data.turmaId, this.data.aulaId).then(result => {
      this.alunos = result;
    }, fail => {
      console.error("Erro ao carregar alunos:", fail);
    });
  }

  lancarFalta(alunoId: number) {
    if (confirm("Deseja realmente lançar a falta para o aluno selecionado?")) {

      var faltaLancamento = new FaltaModel();
      faltaLancamento = {
        idAluno: alunoId,
        idAula: this.data.aulaId,
        idTurma: this.data.turmaId
      }
      this.turmaService.LancarFalta(faltaLancamento).then(result => {
        this.toastService.show('success', "Falta lançada com Sucesso!");
        this.carregarAlunos();
      }, fail => {
        this.toastService.show('fail', "Erro ao excluir Aula!" + fail.error);
      });
    }
  }
  removerFalta(idFalta: number) {
    if (confirm("Deseja realmente remover a falta para o aluno selecionado?")) {

      var faltaLancamento = new FaltaModel();

      this.turmaService.RemoverFalta(idFalta).then(result => {
        this.toastService.show('success', "Falta removida com Sucesso!");
        this.carregarAlunos();
      }, fail => {
        this.toastService.show('fail', "Erro ao excluir Falta!" + fail.error);
      });
    }
  }

}
