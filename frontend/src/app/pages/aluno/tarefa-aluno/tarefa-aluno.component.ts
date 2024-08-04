import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaAlunoFullModel } from 'src/app/core/models/tarefa-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { format } from 'date-fns';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { MatDialog } from '@angular/material/dialog';
import { EnviarTarefaAlunoComponent } from './enviar-tarefa-aluno/enviar-tarefa-aluno.component';

@Component({
  selector: 'app-tarefa-aluno',
  templateUrl: './tarefa-aluno.component.html',
  styleUrls: ['./tarefa-aluno.component.scss']
})
export class TarefaAlunoComponent implements OnInit {
  tarefas: Array<TarefaAlunoFullModel> = [];
  dataSource = new MatTableDataSource<TarefaAlunoFullModel>();
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['descricao', 'dataLimite', 'dataEntrega', 'status', 'instrucoes', 'actions'];

  constructor(private tarefasService: TarefasService,
              private authService: AuthService,
              private toastService: ToastService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    this.obterTarefas();
  }

  obterTarefas() {
    this.tarefasService.obterTarefasAluno().then(result => {
      this.tarefas = result;
      this.dataSource.data = this.tarefas;
    }).catch(fail => {
      this.toastService.show('fail', "Erro ao obter tarefas!" + fail.error);
    });
  }

  parseDate(dateString: string): string {
    const data = new Date(dateString);
    return format(data, 'dd/MM/yyyy HH:mm');
  }

  abrirAnexo(anexo: string) {
    console.log(anexo)
    window.open(anexo);
  }

  abrirModalEnviarTarefa(tarefaId: number, dataLimite: Date): void {
    this.dialog.open(EnviarTarefaAlunoComponent, {
      width: '400px',
      data: {tarefaId, dataLimite }
    });
  }

  getStatus(tarefa: TarefaAlunoFullModel): string {
    if (tarefa.dataEntrega) {
      return 'Entregue';
    }
    return 'Pendente'; // Ou outra lógica para determinar o status
  }
}
