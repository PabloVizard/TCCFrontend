import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BancasService } from 'src/app/core/services/bancas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { BancasFullModel, BancasModel } from 'src/app/core/models/bancas-model';

@Component({
  selector: 'app-balancear-bancas',
  templateUrl: './balancear-bancas.component.html',
  styleUrls: ['./balancear-bancas.component.scss']
})
export class BalancearBancasComponent implements OnInit {
  bancasNaoConfirmadas: Array<BancasFullModel> = [];
  sugestoes: Array<BancasFullModel> = [];
  displayedColumns: string[] = ['select', 'projeto', 'semestre', 'alunoOrientado', 'professorOrientador', 'avaliador01'];
  selectedBancas: Set<BancasFullModel> = new Set();

  constructor(
    private bancasService: BancasService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<BalancearBancasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await this.obterBancasNaoConfirmadas();
  }

  async obterBancasNaoConfirmadas() {
    try {
      const result = await this.bancasService.ObterBancasNaoConfirmadas();
      this.bancasNaoConfirmadas = result;
      await this.obterSugestoes();
    } catch (error) {
      this.toastService.show("fail", "Falha ao obter bancas não confirmadas! " + error);
    }
  }

  async obterSugestoes() {
    try {
      const result = await this.bancasService.BalancearBancas();
      this.sugestoes = result;
    } catch (error) {
      this.toastService.show("fail", "Falha ao obter sugestões de bancas! " + error);
    }
  }

  toggleSelection(banca: BancasFullModel) {
    if (this.selectedBancas.has(banca)) {
      this.selectedBancas.delete(banca);
    } else {
      this.selectedBancas.add(banca);
    }
  }

  isSelected(banca: BancasFullModel): boolean {
    return this.selectedBancas.has(banca);
  }

  isAllSelected(): boolean {
    return this.selectedBancas.size === this.sugestoes.length;
  }

  isSomeSelected(): boolean {
    return this.selectedBancas.size > 0 && this.selectedBancas.size < this.sugestoes.length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selectedBancas.clear();
    } else {
      this.sugestoes.forEach(banca => this.selectedBancas.add(banca));
    }
  }

  async confirmarSugestoes() {
    const bancasParaConfirmar = Array.from(this.selectedBancas).map(bancaFull => {
      const banca: BancasModel = {
        id: bancaFull.id,
        idProjeto: bancaFull.projeto.id,
        idProfessorOrientador: bancaFull.professorOrientador.id,
        idAlunoOrientado: bancaFull.alunoOrientado.id,
        idAvaliador01: bancaFull.avaliador01.id,
        idAvaliador02: bancaFull.avaliador02?.id,
        ano: bancaFull.ano,
        semestre: bancaFull.semestre,
        bancaConfirmada: true,
        dataDefesa: bancaFull.dataDefesa,
        status: bancaFull.status,
      };
      return banca;
    });

    try {
      for (const banca of bancasParaConfirmar) {
        await this.bancasService.ConfirmarSugestao(banca);
      }
      this.toastService.show("success", "Sugestões de bancas confirmadas com sucesso!");
      this.dialogRef.close(true);
    } catch (error) {
      this.toastService.show("fail", "Falha ao confirmar sugestões de bancas! " + error);
    }
  }
}
