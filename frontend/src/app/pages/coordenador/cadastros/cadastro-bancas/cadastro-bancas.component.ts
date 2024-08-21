import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BancasService } from 'src/app/core/services/bancas.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/core/services/toast.service';
import { MatSort } from '@angular/material/sort';
import { BancasFullModel } from 'src/app/core/models/bancas-model';
import { EditarBancasComponent } from './editar-bancas/editar-bancas.component';
import { GerarDocumentoComponent } from './gerar-documento/gerar-documento.component';
import { BalancearBancasComponent } from './balancear-bancas/balancear-bancas.component';

@Component({
  selector: 'app-cadastro-bancas',
  templateUrl: './cadastro-bancas.component.html',
  styleUrls: ['./cadastro-bancas.component.scss']
})
export class CadastroBancasComponent implements OnInit {
  bancas: Array<BancasFullModel> = [];
  dataSource: MatTableDataSource<BancasFullModel> = new MatTableDataSource<BancasFullModel>();
  displayedColumns: string[] = ['projeto', 'semestre', 'alunoOrientado', 'professorOrientador', 'avaliador01', 'avaliador02', 'bancaConfirmada', 'dataDefesa', 'status', 'actions'];
  anoSemestreOptions: Array<{ label: string, value: string }> = [];
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bancasService: BancasService,
              private router: Router,
              private dialog: MatDialog,
              private toastService: ToastService) {}

  async ngOnInit() {
    await this.obterBancas();
    this.dataSource.sort = this.sort;
  }

  async obterBancas() {
    try {
      const result = await this.bancasService.ObterTodasBancas();
      this.bancas = result;
      this.dataSource.data = this.bancas;
      this.populateAnoSemestreOptions();
    } catch (error) {
      this.toastService.show("fail", "Falha ao obter bancas! " + error);
    }
  }

  balancearBancas() {
    this.dialog.open(BalancearBancasComponent, {
      width: '1024px', 
      height: '700px',
      data: {} // Envie qualquer dado necessário para o componente, se houver
    }).afterClosed().subscribe(result => {
      if (result) {
        this.obterBancas(); // Recarrega as bancas após a confirmação
      }
    });
  }
  

  populateAnoSemestreOptions() {
    const uniqueAnoSemestre = new Set<string>();
    this.bancas.forEach(banca => {
      const anoSemestre = `${banca.ano}/${banca.semestre}`;
      uniqueAnoSemestre.add(anoSemestre);
    });

    this.anoSemestreOptions = [
      { label: 'Todos', value: '' }, // Adiciona a opção de "Todos"
      ...Array.from(uniqueAnoSemestre).map(anoSemestre => ({
        label: anoSemestre,
        value: anoSemestre.toLowerCase()
      }))
    ];
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data: BancasFullModel, filter: string) => {
      if (filter === '') {
        return true; // Mostra todas as bancas se o filtro for vazio
      }
      const semestre = `${data.ano}/${data.semestre}`;
      return semestre.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarBanca(banca: BancasFullModel) {
    this.dialog.open(EditarBancasComponent, {
      width: '1024px', 
      height: '700px',
      data: { data: banca }
    });
  }


  gerarDocumento(banca: BancasFullModel) {
    this.dialog.open(GerarDocumentoComponent, {
      width: '800px', 
      data: { banca }
    });
  }

  async excluirBanca(id: number) {
    if (confirm("Deseja realmente remover a banca selecionada?")) {
      try {
        await this.bancasService.ExcluirBanca(id);
        this.toastService.show("success", "Banca excluída com sucesso! ");
      } catch (error) {
        this.toastService.show("fail", "Falha ao excluir banca! " + error);
      }
      await this.obterBancas();
    }
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
