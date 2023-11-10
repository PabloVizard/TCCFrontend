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
  constructor(@Inject(MAT_DIALOG_DATA) public dados: any,
              private tarefaService: TarefasService,
              private toastService: ToastService,
              private authService: AuthService){
    
  }
  ngOnInit(): void {
    console.log(this.dados)
    this.tarefaAluno = {
      id: undefined!,
      anexo: '',
      dataEntrega: this.dados.dataEntrega,
      dataLimite: this.dados.dataLimite,
      idAluno: this.authService.ObterUsuarioLogado().id,
      idTarefa: this.dados.id
    }
    console.log(this.tarefaAluno)
  }

  parseDate(dateString: string): string  {
    var data = new Date(dateString);
    var dataformatada = format(data, 'dd/MM/yyyy HH:mm')
    return dataformatada;
  }
  async enviar(){
    console.log(this.dados)
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
