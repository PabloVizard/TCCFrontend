import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaModel } from 'src/app/core/models/tarefa-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { format } from 'date-fns';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { TarefaAlunoModel } from 'src/app/core/models/tarefa-aluno-model';
import { MatDialog } from '@angular/material/dialog';
import { EnviarTarefaAlunoComponent } from './enviar-tarefa-aluno/enviar-tarefa-aluno.component';

@Component({
  selector: 'app-tarefa-aluno',
  templateUrl: './tarefa-aluno.component.html',
  styleUrls: ['./tarefa-aluno.component.scss']
})
export class TarefaAlunoComponent implements OnInit {
  tarefas: Array<TarefaModel> = new Array<TarefaModel>();
  tarefasEnviadas!: Array<TarefaAlunoModel>;
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['descricao', 'dataentrega', 'datalimite', 'status', 'instrucoes', 'actions']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private tarefasService: TarefasService,
              private authService: AuthService,
              private toastService: ToastService,
              private dialog: MatDialog){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterTarefasEnviadas();
    await this.obterTarefas();
    this.dataSource = new MatTableDataSource(this.tarefas);
  }

  async obterTarefas(){
    await this.tarefasService.obterTarefasPorTurmaId(this.authService.ObterIdTurmaUsuario()).then(result => {
      console.log(result)
      console.log(new Date())
      this.tarefas = result;

      this.tarefas = result.map((tarefa: TarefaModel) => {
        
        var tarefasEnviadasAluno = this.tarefasEnviadas.find(x => x.idTarefa == tarefa.id)
        
        var atrasada = tarefasEnviadasAluno!?.dataEntrega < tarefa.dataLimite;

        return { ...tarefa, 
          status: tarefasEnviadasAluno != null ? 'Entregue' : atrasada ? 'Entregue Atrasada' : "Não Entregue",
          dataEntrega: tarefasEnviadasAluno!?.dataEntrega };
      });
      console.log(this.tarefas)
      
    },fail => {
      this.toastService.show('fail', "Erro ao obter tarefas!" + fail.error)
    })
  }
  async obterTarefasEnviadas(){
    await this.tarefasService.obterTarefasEnviadas(this.usuarioLogado.id).then(result => {
      console.log(result)
      this.tarefasEnviadas = result;

   
    },fail => {
      this.toastService.show('fail', "Erro ao obter tarefas enviadas!" + fail.error)
    })
  }

  parseDate(dateString: string): string  {
    var data = new Date(dateString);
    var dataformatada = format(data, 'dd/MM/yyyy HH:mm')
    return dataformatada;
  }

  abrirAnexo(anexo:string){
    window.open(anexo)
  }

  abrirModalEnviarTarefa(tarefaAluno: any): void {
    this.dialog.open(EnviarTarefaAlunoComponent, {
      width: '400px', 
      data: tarefaAluno
    });
  }
}
