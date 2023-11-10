import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StatusAprovacaoEnumerator } from 'src/app/core/enumerators/status-aprovacao.enumerator';
import { BancasModel } from 'src/app/core/models/bancas-model';
import { OrientacoesModel } from 'src/app/core/models/orientacoes-model';
import { ProjetoModel } from 'src/app/core/models/projeto-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { BancasService } from 'src/app/core/services/bancas.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-projeto-atual',
  templateUrl: './projeto-atual.component.html',
  styleUrls: ['./projeto-atual.component.scss']
})
export class ProjetoAtualComponent implements OnInit {
  orientacao!: OrientacoesModel;
  banca!: BancasModel;
  usuarioLogado!: UsuarioModel;
  statusAprovacao!: string;
  
  constructor(private projetosService: ProjetosService,
              private authService: AuthService,
              private toastService: ToastService,
              private orientacoesService: OrientacoesService,
              private bancasService: BancasService){

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
    this.bancasService.obterBancaAluno().then(result => {
      this.banca = result
    }, fail => {
      this.toastService.show("fail", "Erro ao obter banca do aluno.")
    })
  }

}
