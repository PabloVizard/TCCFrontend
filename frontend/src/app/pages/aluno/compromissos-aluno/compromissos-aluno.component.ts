import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { TipoCompromissoEnumerator } from 'src/app/core/enumerators/tipo-compromisso';
import { CompromissosModel } from 'src/app/core/models/compromissos-model';
import { TarefaAlunoModel } from 'src/app/core/models/tarefa-aluno-model';
import { TarefaModel } from 'src/app/core/models/tarefa-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { CompromissosService } from 'src/app/core/services/compromissos.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-compromissos-aluno',
  templateUrl: './compromissos-aluno.component.html',
  styleUrls: ['./compromissos-aluno.component.scss']
})
export class CompromissosAlunoComponent implements OnInit {
  compromissos: Array<CompromissosModel> = new Array<CompromissosModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['tipoCompromisso', 'descricao', 'professorOrientador', 'alunoOrientado', 'turma', 'dataCompromisso', 'local', 'link']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private compromissosService: CompromissosService,
              private authService: AuthService,
              private toastService: ToastService){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterCompromissosAluno();
    this.dataSource = new MatTableDataSource(this.compromissos);
  }

  async obterCompromissosAluno(){
    await this.compromissosService.ObterCompromissosAluno().then(result => {
      this.compromissos = result;
    
    },fail => {
      this.toastService.show('fail', "Erro ao obter compromissos!" + fail.error)
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

  obterTextoTipoCompromisso(tipoCompromisso: number): string {
    return TipoCompromissoEnumerator[tipoCompromisso];
  }
}
