import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { TurmaService } from 'src/app/core/services/turma.service';
import { EditarTurmasComponent } from './editar-turmas/editar-turmas.component';
import { ToastService } from 'src/app/core/services/toast.service';
@Component({
  selector: 'app-cadastro-turmas',
  templateUrl: './cadastro-turmas.component.html',
  styleUrls: ['./cadastro-turmas.component.scss']
})
export class CadastroTurmasComponent implements OnInit {
  turmas: Array<TurmaModel> = new Array<TurmaModel>();
  dataSource: any;
  displayedColumns: string[] = ['descricao', 'ano', 'semestre', 'nPoc', 'ativo', 'actions'];

  constructor(private turmasService: TurmaService,
              private router: Router,
              private dialog: MatDialog,
              private toastService: ToastService) {}

  async ngOnInit() {
    await this.obterTurmas();
    this.dataSource = new MatTableDataSource(this.turmas);
  }

  async obterTurmas() {
    await this.turmasService.ObterTodasTurmas().then(result => {
      this.turmas = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao obter turmas! " + fail.error);
    });
  }

  editarTurma(turma: TurmaModel){
    this.dialog.open(EditarTurmasComponent, {
      width: '1024px', 
      height: '600px',
      data: { data: turma }
    });
  }

  adicionarTurma(){
    this.dialog.open(EditarTurmasComponent, {
      width: '1024px', 
      height: '600px',
      data: {}
    });
  }

  async excluirTurma(id: number){
    if (confirm("Deseja realmente remover a turma selecionada?")){
      await this.turmasService.ExcluirTurma(id).then(result => {
        this.toastService.show("success", "Turma excluída com sucesso! ");
        
      }, fail => {
        this.toastService.show("fail", "Erro ao excluir turma! " + fail.error);
      });
    }
    await this.obterTurmas();
    this.dataSource = new MatTableDataSource(this.turmas);
  }

  obterAtivo(ativo: boolean){
    return ativo ? 'Sim' : 'Não';
  }
  gerarRelatorio(){
    
  }
}
