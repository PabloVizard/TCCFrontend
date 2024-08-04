import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { TarefaAlunoModel } from 'src/app/core/models/tarefa-aluno-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-enviar-tarefa-aluno',
  templateUrl: './enviar-tarefa-aluno.component.html',
  styleUrls: ['./enviar-tarefa-aluno.component.scss']
})
export class EnviarTarefaAlunoComponent implements OnInit {

  tarefaAluno!: TarefaAlunoModel;
  dataLimite!: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private tarefaService: TarefasService,
              private toastService: ToastService,
              private authService: AuthService){
    
  }
  async ngOnInit(): Promise<void> {

    await this.buscarTarefaAluno()

  }
  async buscarTarefaAluno(){
    this.tarefaService.obterTarefaAluno(this.data.tarefaId).then(result => {
      this.tarefaAluno = result;
      //window.location.reload()
    },fail => {
      this.toastService.show('fail', "Erro ao enviar resposta da tarefa.")
    })
  }

  parseDate(dateString: string): string  {
    var data = new Date(dateString);
    var dataformatada = format(data, 'dd/MM/yyyy HH:mm')
    return dataformatada;
  }
  async enviar(){

    if (!this.tarefaAluno.anexo) {
      this.toastService.show('fail', "Preencha o anexo!")
      return;
    }
    this.tarefaAluno.dataEntrega = new Date()
    await this.tarefaService.registrarEnvioDeTarefa(this.tarefaAluno).then(result => {
      this.toastService.show('success', "Tarefa Enviada com sucesso");
      //window.location.reload()
    },fail => {
      this.toastService.show('fail', "Erro ao enviar resposta da tarefa.")
    })
  }
}
