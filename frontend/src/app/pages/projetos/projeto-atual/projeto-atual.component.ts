import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProjetoModel } from 'src/app/core/models/projeto-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-projeto-atual',
  templateUrl: './projeto-atual.component.html',
  styleUrls: ['./projeto-atual.component.scss']
})
export class ProjetoAtualComponent implements OnInit {
  projeto!: ProjetoModel;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['nome', 'descricao', 'professorResponsavel', 'contato', 'actions']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private projetosService: ProjetosService,
              private authService: AuthService,
              private toastService: ToastService){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterProjetoAtual();
  }

  async obterProjetoAtual(){
    await this.projetosService.ObterProjetoAluno().then(result => {
      this.projeto = result;
      
    },fail => {
      this.toastService.show('fail', "Erro ao obter TCC do Aluno!" + fail.error)
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
}
