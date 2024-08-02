import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EnumeratorService } from 'src/app/core/services/enumerator.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EditarAlunosOrientadosComponent } from '../editar-alunos-orientados/editar-alunos-orientados.component';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { UsuarioLightModel } from 'src/app/core/models/usuario-model';
import { BancasService } from 'src/app/core/services/bancas.service';
import { BancasFullModel, BancasModel } from 'src/app/core/models/bancas-model';
import { OrientacoesModel } from 'src/app/core/models/orientacoes-model';

@Component({
  selector: 'app-recomendar-banca',
  templateUrl: './recomendar-banca.component.html',
  styleUrls: ['./recomendar-banca.component.scss']
})
export class RecomendarBancaComponent implements OnInit {
  public orientacao!: OrientacoesModel;
  public statusSelecionado: any = 0;
  public professores: UsuarioLightModel[] = [];
  public professor1Selecionado!: number;
  public professor2Selecionado!: number;
  public banca!: BancasFullModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public orientacaoId: number,
    private orientacoesService: OrientacoesService,
    private toastService: ToastService,
    private enumeratorService: EnumeratorService,
    private router: Router,
    public dialogRef: MatDialogRef<EditarAlunosOrientadosComponent>,
    private usuariosService: UsuariosService,
    private bancasService: BancasService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.buscarOrientacaoPorId();
    await this.obterProfessores();
    await this.obterBancaAluno();
    this.statusSelecionado = this.orientacao.statusAprovacao;
    this.setSelectedProfessors();
  }

  async buscarOrientacaoPorId() {
    await this.orientacoesService.ObterOrientacaoProfessorPorId(this.orientacaoId).then(
      (result) => {
        this.orientacao = result;
      },
      (fail) => {
        this.toastService.show('fail', "Erro ao obter Orientação!" + fail.error);
      }
    );
  }

  async obterProfessores() {
    await this.usuariosService.obterProfessores().then(
      (result) => {
        this.professores = result;
      },
      (fail) => {
        this.toastService.show('fail', "Erro ao obter professores!" + fail.error);
      }
    );
  }

  async obterBancaAluno() {
    await this.bancasService.obterBancaAluno(this.orientacao.alunoOrientado.id).then(
      (result) => {
        this.banca = result;
      },
      (fail) => {
        this.toastService.show('fail', "Erro ao obter Banca!" + fail.error);
      }
    );
  }

  setSelectedProfessors() {
    if (this.banca) {
      this.professor1Selecionado = this.banca.avaliador01.id;
      this.professor2Selecionado = this.banca.avaliador02?.id!;
    }
  }

  async salvar() {
    if (this.professor1Selecionado != null) {
      var banca = new BancasModel();

      banca = {
        idProfessorOrientador: this.orientacao.professorOrientador.id,
        idAlunoOrientado: this.orientacao.alunoOrientado.id,
        idAvaliador01: this.professor1Selecionado,
        idAvaliador02: this.professor2Selecionado != null ? this.professor2Selecionado : null!,
        ano: this.orientacao.turma.ano,
        semestre: this.orientacao.turma.semestre,
        bancaConfirmada: false,
        dataDefesa: null!,
      };

      await this.bancasService.registrarSugestaoBanca(banca).then(
        (result) => {
          this.toastService.show('success', "Sugestão de Banca enviada com sucesso!");
        },
        (fail) => {
          this.toastService.show('fail', "Erro ao enviar sugestão de banca!" + fail.error);
        }
      );
    } else {
      this.toastService.show('fail', "Selecione pelo menos 1 professor!");
    }
  }
}
