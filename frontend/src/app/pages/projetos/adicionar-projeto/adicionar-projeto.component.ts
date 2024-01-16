import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { ProjetoModel, ProjetoRetornoModel } from 'src/app/core/models/projeto-model';
import { TarefaAlunoModel } from 'src/app/core/models/tarefa-aluno-model';
import { UsuarioLightModel, UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-adicionar-projeto',
  templateUrl: './adicionar-projeto.component.html',
  styleUrls: ['./adicionar-projeto.component.scss']
})
export class AdicionarProjetoComponent implements OnInit {
  dados: any;
  usuarioLogado: UsuarioModel = new UsuarioModel();
  alunosDisponiveis: Array<UsuarioLightModel> = new Array<UsuarioLightModel>();
  projetoForm!: FormGroup;
  projetoAtual!: ProjetoRetornoModel;

  constructor(@Inject(MAT_DIALOG_DATA) public idProjeto: number,
              private fb: FormBuilder,
              private authService: AuthService,
              private usuarioService: UsuariosService,
              private orientacoesService: OrientacoesService,
              private toastService: ToastService,
              private projetosService: ProjetosService) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.buscarProjeto()
    await this.obterAlunosDisponiveis()
    
    console.log(this.projetoAtual)
    this.projetoForm = this.fb.group({
        id: [this.projetoAtual?.id | 0],
        nome: [this.projetoAtual?.nome, Validators.required],
        descricao: [this.projetoAtual?.descricao, Validators.required],
        idProfessorResponsavel: [this.usuarioLogado.id],
        idAlunoResponsavel: [this.projetoAtual?.idAlunoResponsavel],
    });
    debugger
    
  }

  async salvarProjeto() {

      if(this.projetoForm.valid){

        if(this.idProjeto){
          await this.projetosService.AtualizarProjeto(this.projetoForm.value).then(result => {
            this.toastService.show("success", "Projeto salvo com sucesso!")
          }, fail => {
            this.toastService.show("fail", "Erro ao buscar usuários disponíveis! " + fail.error)
          })
        }

        else{
          await this.projetosService.CadastrarNovoProjeto(this.projetoForm.value).then(result => {
            this.toastService.show("success", "Projeto salvo com sucesso!")
          }, fail => {
            this.toastService.show("fail", "Erro ao buscar usuários disponíveis! " + fail.error)
          })
        }
      }
  }
  async buscarProjeto (){

    if(this.idProjeto){
      await this.projetosService.ObterProjetoPorId(this.idProjeto).then(result => {
        this.projetoAtual = result;
      }, fail => {
        this.toastService.show("fail", "Erro ao buscar projeto disponivel! " + fail.error)
      })
    }
    
  }
  async obterAlunosDisponiveis(){
    await this.orientacoesService.obterAlunos().then(async result => {
      
      this.alunosDisponiveis = result
      
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar usuários disponíveis! " + fail.error)
    })
    
    /* if(this.projetoAtual?.idAlunoResponsavel != null){
      await this.usuarioService.obterPorId(this.projetoAtual.idAlunoResponsavel).then(result =>{
        
        this.alunosDisponiveis.push(result)
        console.log(this.alunosDisponiveis)
      }, fail => {
        this.toastService.show("fail", "Falha ao buscar aluno responsavel")
      })
      
    } */
  }

  compareAlunos(aluno1: any, aluno2: any) {
    debugger
    return aluno1 && aluno2 ? aluno1.id === aluno2.id : aluno1 === aluno2;
  }



}