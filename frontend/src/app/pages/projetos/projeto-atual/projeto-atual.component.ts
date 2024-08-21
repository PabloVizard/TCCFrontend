import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusAprovacaoEnumerator } from 'src/app/core/enumerators/status-aprovacao.enumerator';
import { BancasModel } from 'src/app/core/models/bancas-model';
import { OrientacoesModel, OrientacoesModelApi } from 'src/app/core/models/orientacoes-model';
import { ProjetoModel } from 'src/app/core/models/projeto-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BancasService } from 'src/app/core/services/bancas.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EnviarTaoDialogComponent } from './enviar-tao-dialog/enviar-tao-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projeto-atual',
  templateUrl: './projeto-atual.component.html',
  styleUrls: ['./projeto-atual.component.scss']
})
export class ProjetoAtualComponent implements OnInit {
  orientacao!: OrientacoesModel;
  banca!: any;
  usuarioLogado!: UsuarioModel;
  statusAprovacao!: string;
  
  constructor(private projetosService: ProjetosService,
              private authService: AuthService,
              private toastService: ToastService,
              private orientacoesService: OrientacoesService,
              private bancasService: BancasService,
              private dialog: MatDialog){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterProjetoAtual();
    await this.obterBanca();
  }

  async obterProjetoAtual(){
    await this.orientacoesService.ObterOrientacaoAluno().then(result => {
      this.orientacao = result;
      this.statusAprovacao = StatusAprovacaoEnumerator[this.orientacao.statusAprovacao];
      
    },fail => {
      this.toastService.show('fail', "Erro ao obter orientacao!" + fail.error)
    })
  }

  enviarEmail(email: string, projeto: string) {
    const destinatario = email;
    
    const encodedDestinatario = encodeURIComponent(destinatario);
    const encodedAssunto = encodeURIComponent(`Projeto de TCC: ${projeto}`);
    const encodedCorpoEmail = encodeURIComponent(`Estou com dúvidas sobre o meu projeto: ${projeto}. Pode me ajudar?`);

    // Construa o URL do Gmail com destinatário, assunto e corpo do e-mail como parâmetros
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedDestinatario}&su=${encodedAssunto}&body=${encodedCorpoEmail}`;


    window.open(url, '_blank');
  }
  obterBanca(){
    this.bancasService.obterBancaAluno(this.authService.ObterUsuarioLogado().id).then(result => {
      this.banca = result
    }, fail => {
      this.toastService.show("fail", "Erro ao obter banca do aluno.")
    })
  }

  openEnviarTaoDialog(): void {
    const dialogRef = this.dialog.open(EnviarTaoDialogComponent, {
      width: '400px',
      data: { dataEnvio: new Date(), linkTao: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enviarTao(result.linkTao);
      }
    });
  }

  enviarTao(linkTao: string) {
    if (this.orientacao) {
      // Converte OrientacoesModel para OrientacoesModelApi
      const orientacaoApi: OrientacoesModelApi = {
        id: this.orientacao.id,
        idProfessorOrientador: this.orientacao.professorOrientador.id,
        idAlunoOrientado: this.orientacao.alunoOrientado.id,
        idProjeto: this.orientacao.projeto.id,
        idTurma: this.orientacao.turma.id,
        statusAprovacao: this.orientacao.statusAprovacao,
        anexoResumoTrabalho: this.orientacao.anexoResumoTrabalho,
        anexoTAO: linkTao,
        localDivulgacao: this.orientacao.localDivulgacao
      };

      // Chama o serviço para atualizar a orientação
      this.orientacoesService.Atualizar(orientacaoApi).then(response => {
        this.toastService.show('success', 'TAO atualizado com sucesso!');
      }).catch(error => {
        this.toastService.show('fail', 'Erro ao atualizar TAO: ' + error.message);
      });
    }
  }

}
