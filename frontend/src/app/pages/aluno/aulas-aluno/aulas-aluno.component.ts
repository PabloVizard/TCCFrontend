import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { AulasModel } from 'src/app/core/models/aulas-model';
import { TarefaAlunoModel } from 'src/app/core/models/tarefa-aluno-model';
import { TarefaModel } from 'src/app/core/models/tarefa-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AulasService } from 'src/app/core/services/aulas.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-aulas-aluno',
  templateUrl: './aulas-aluno.component.html',
  styleUrls: ['./aulas-aluno.component.scss']
})
export class AulasAlunoComponent implements OnInit {
  aulas: Array<AulasModel> = new Array<AulasModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['tipoCompromisso', 'descricao', 'professorOrientador', 'alunoOrientado', 'turma', 'dataCompromisso', 'local', 'link']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private aulasService: AulasService,
              private authService: AuthService,
              private toastService: ToastService){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterAulasAluno();
    this.dataSource = new MatTableDataSource(this.aulas);
  }

  async obterAulasAluno(){
    await this.aulasService.ObterAulasAluno().then(result => {
      this.aulas = result;
    
    },fail => {
      this.toastService.show('fail', "Erro ao obter aulas!" + fail.error)
    })
  }

  parseDate(dateString: string): string  {
    var data = new Date(dateString);
    var dataformatada = format(data, 'dd/MM/yyyy HH:mm')
    return dataformatada;
  }

  acessarLink(link:string){
    window.open(link)
  }

}
