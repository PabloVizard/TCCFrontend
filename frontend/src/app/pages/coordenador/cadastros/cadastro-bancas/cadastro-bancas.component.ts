import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BancasService } from 'src/app/core/services/bancas.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/services/toast.service';
import { MatSort } from '@angular/material/sort';
import { BancasFullModel } from 'src/app/core/models/bancas-model';
import {EditarBancasComponent} from './editar-bancas/editar-bancas.component';

@Component({
  selector: 'app-cadastro-bancas',
  templateUrl: './cadastro-bancas.component.html',
  styleUrls: ['./cadastro-bancas.component.scss']
})
export class CadastroBancasComponent implements OnInit {
  bancas: Array<BancasFullModel> = new Array<BancasFullModel>();
  dataSource: any;
  displayedColumns: string[] = ['projeto','semestre', 'professorOrientador', 'alunoOrientado', 'avaliador01', 'avaliador02', 'bancaConfirmada', 'dataDefesa', 'status', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bancasService: BancasService,
              private router: Router,
              private dialog: MatDialog,
              private toastService: ToastService) {}

  async ngOnInit() {
    await this.obterBancas();
    this.dataSource = new MatTableDataSource(this.bancas);
    this.dataSource.sort = this.sort;
  }

  async obterBancas() {
    await this.bancasService.ObterTodasBancas().then(result => {
      this.bancas = result;
    }, fail => {
      this.toastService.show("fail", "Falha ao obter bancas! " + fail.error);
    });
  }

  editarBanca(banca: BancasFullModel) {
    this.dialog.open(EditarBancasComponent, {
      width: '1024px', 
      height: '700px',
      data: { data: banca }
    });
  }

  balancearBancas() {
    this.dialog.open(EditarBancasComponent, {
      width: '1024px', 
      height: '700px',
      data: {}
    });
  }

  async excluirBanca(id: number) {
    if (confirm("Deseja realmente remover a banca selecionada?")) {
      await this.bancasService.ExcluirBanca(id).then(result => {
        this.toastService.show("success", "Banca excluída com sucesso! ");
      }, fail => {
        this.toastService.show("fail", "Falha ao excluir banca! " + fail.error);
      });
    }
    await this.obterBancas();
    this.dataSource = new MatTableDataSource(this.bancas);
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
  
}
