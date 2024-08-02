import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjetoRetornoModel } from 'src/app/core/models/projeto-model';
import { UsuarioLightModel, UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-adicionar-projeto',
  templateUrl: './adicionar-projeto.component.html',
  styleUrls: ['./adicionar-projeto.component.scss']
})
export class AdicionarProjetoComponent implements OnInit {
  usuarioLogado: UsuarioModel = new UsuarioModel();
  alunosDisponiveis: Array<UsuarioLightModel> = new Array<UsuarioLightModel>();
  projetoForm!: FormGroup;
  projetoAtual!: ProjetoRetornoModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idProjeto: number,
    private fb: FormBuilder,
    private authService: AuthService,
    private orientacoesService: OrientacoesService,
    private toastService: ToastService,
    private projetosService: ProjetosService
  ) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    this.projetoForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      area: ['', Validators.required],
      descricao: ['', Validators.required],
      idProfessorResponsavel: [this.usuarioLogado.id],
      idAlunoResponsavel: [null, Validators.required],
    });

    await this.carregarDados();
  }

  async carregarDados() {
    if (this.idProjeto) {
      await this.buscarProjeto();
    }
    await this.obterAlunosDisponiveis();
    if (this.projetoAtual) {
      this.atualizarFormulario();
    }
  }

  async buscarProjeto() {
    if (this.idProjeto) {
      await this.projetosService.ObterProjetoPorId(this.idProjeto).then(result => {
        this.projetoAtual = result;
      }, fail => {
        this.toastService.show("fail", "Erro ao buscar projeto disponivel! " + fail.error);
      });
    }
  }

  async obterAlunosDisponiveis() {
    await this.orientacoesService.obterAlunos().then(result => {
      this.alunosDisponiveis = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar usuários disponíveis! " + fail.error);
    });
  }

  atualizarFormulario() {
    this.projetoForm.patchValue({
      id: this.projetoAtual.id,
      nome: this.projetoAtual.nome,
      area: this.projetoAtual.area,
      descricao: this.projetoAtual.descricao,
      idAlunoResponsavel: this.projetoAtual.idAlunoResponsavel
    });
  }

  async salvarProjeto() {
    if (this.projetoForm.valid) {
      if (this.idProjeto) {
        await this.projetosService.AtualizarProjeto(this.projetoForm.value).then(result => {
          this.toastService.show("success", "Projeto salvo com sucesso!");
        }, fail => {
          this.toastService.show("fail", "Erro ao salvar projeto! " + fail.error);
        });
      } else {
        await this.projetosService.CadastrarNovoProjeto(this.projetoForm.value).then(result => {
          this.toastService.show("success", "Projeto salvo com sucesso!");
        }, fail => {
          this.toastService.show("fail", "Erro ao salvar projeto! " + fail.error);
        });
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar projeto!");
    }
  }


}
