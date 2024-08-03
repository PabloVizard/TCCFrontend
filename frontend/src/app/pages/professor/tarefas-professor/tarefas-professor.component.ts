import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format } from 'date-fns';

import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CadastrarTarefaComponent } from '../tarefas-professor/cadastrar-tarefa/cadastrar-tarefa.component';
import { TarefaFullModel } from 'src/app/core/models/tarefa-model';
import { AlunosTarefaComponent } from './alunos-tarefa/alunos-tarefa.component';

@Component({
  selector: 'app-tarefas-professor',
  templateUrl: './tarefas-professor.component.html',
  styleUrls: ['./tarefas-professor.component.scss']
})
export class TarefasProfessorComponent implements OnInit {

  tarefas: TarefaFullModel[] = [];
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['descricao', 'descricaoTurma', 'dataLimite', 'anexo', 'alunos', 'actions'];

  constructor(private tarefasService: TarefasService,
              private authService: AuthService,
              private toastService: ToastService,
              private dialog: MatDialog,
              private router: Router) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterTarefasProfessor();
    this.dataSource = new MatTableDataSource(this.tarefas);
  }

  async obterTarefasProfessor(){
    await this.tarefasService.ObterTarefasProfessor().then(result => {
      this.tarefas = result;
    }, fail => {
      this.toastService.show('fail', "Erro ao obter tarefas!" + fail.error);
    });
  }

  parseDate(dateString: string): string {
    const data = new Date(dateString);
    return format(data, 'dd/MM/yyyy HH:mm');
  }

  adicionarTarefa(): void {
    this.dialog.open(CadastrarTarefaComponent, {
      width: '1024px', 
      height: '600px',
    });
  }

  editarTarefa(tarefaId: number): void {
    this.dialog.open(CadastrarTarefaComponent, {
      width: '1024px', 
      height: '600px',
      data: tarefaId
    });
  }

  excluirTarefa(tarefaId: number): void {
    if (confirm("Deseja realmente excluir a tarefa selecionada?")) {
      this.tarefasService.ExcluirTarefa(tarefaId).then(result => {
        this.toastService.show('success', "Tarefa excluída com sucesso!");
        this.recarregarPagina()
      }, fail => {
        this.toastService.show('fail', "Erro ao excluir tarefa!" + fail.error);
      });
    }
  }

  mostrarAlunos(turmaId: number, tarefaId: number){
    this.dialog.open(AlunosTarefaComponent, {
      width: '800px', 
      height: '900px',
      data: { turmaId, tarefaId }
    });
  }

  recarregarPagina() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  abrirAnexo(anexo:string){
    window.open(anexo)
  }
}
