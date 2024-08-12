import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { AulasService } from 'src/app/core/services/aulas.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/services/toast.service';
import { MatSort } from '@angular/material/sort';
import { AulasFullModel } from 'src/app/core/models/aulas-model';
import { EditarAulasComponent } from './editar-aulas/editar-aulas.component';

@Component({
  selector: 'app-cadastro-aulas',
  templateUrl: './cadastro-aulas.component.html',
  styleUrls: ['./cadastro-aulas.component.scss']
})
export class CadastroAulasComponent implements OnInit {
  aulas: Array<AulasFullModel> = new Array<AulasFullModel>();
  dataSource: any;
  displayedColumns: string[] = ['descricao', 'professor', 'turma', 'dataAula', 'local', 'link', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aulasService: AulasService,
              private router: Router,
              private dialog: MatDialog,
              private toastService: ToastService) {}

  async ngOnInit() {
    await this.obterAulas();
    this.dataSource = new MatTableDataSource(this.aulas);
    this.dataSource.sort = this.sort;
  }

  async obterAulas() {
    await this.aulasService.ObterTodasAulas().then(result => {
      this.aulas = result;
    }, fail => {
      this.toastService.show("fail", "Falha ao obter aulas! " + fail.error);
    });
  }

  editarAula(aula: AulasFullModel) {
    this.dialog.open(EditarAulasComponent, {
      width: '1024px', 
      height: '700px',
      data: { data: aula }
    });
  }

  adicionarAula() {
    this.dialog.open(EditarAulasComponent, {
      width: '1024px', 
      height: '700px',
      data: {}
    });
  }

  async excluirAula(id: number) {
    if (confirm("Deseja realmente remover a aula selecionada?")) {
      await this.aulasService.ExcluirAula(id).then(result => {
        this.toastService.show("success", "Aula excluída com sucesso! ");
      }, fail => {
        this.toastService.show("fail", "Falha ao excluir aula! " + fail.error);
      });
    }
    await this.obterAulas();
    this.dataSource = new MatTableDataSource(this.aulas);
    this.dataSource.sort = this.sort;
  }

  formatarData(data: any) {
    if (data == null) {
      return ' - ';
    }
    const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(data));
  
    const horaFormatada = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(data));
  
    return `${dataFormatada} ${horaFormatada}`;
  }
  acessarLink(link: string){
    window.open(link)
  }
}
