import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TarefaModel } from 'src/app/core/models/tarefa-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { format } from 'date-fns';
import { UsuarioLogadoModel } from 'src/app/core/models/usuario-logado-model';
import { TarefaAlunoModel } from 'src/app/core/models/tarefa-aluno-model';

@Component({
  selector: 'app-tarefa-aluno',
  templateUrl: './tarefa-aluno.component.html',
  styleUrls: ['./tarefa-aluno.component.scss']
})
export class TarefaAlunoComponent implements OnInit {
  tarefas!: Array<TarefaModel>;
  tarefasEnviadas!: Array<TarefaAlunoModel>;
  dataSource: any;
  usuarioLogado!: UsuarioLogadoModel;

  displayedColumns: string[] = ['descricao', 'datalimite', 'status', 'instrucoes', 'actions']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private tarefasService: TarefasService,
              private authService: AuthService,
              private toastService: ToastService){

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
      this.tarefas = result;

      this.tarefas = result.map((tarefa: TarefaModel) => {
        return { ...tarefa, status: this.tarefasEnviadas.findIndex(x => x.id == tarefa.id) != -1 ? 'Entregue' : "Não Entregue" };
      });
      
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
}
