import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { ProjetoModel } from 'src/app/core/models/projeto-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ProjetosService } from '../../core/services/projetos.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.scss']
})
export class ProjetosComponent implements OnInit {
  projetos: Array<ProjetoModel> = new Array<ProjetoModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['nome', 'descricao', 'professorResponsavel', 'contato', 'actions']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private projetosService: ProjetosService,
              private authService: AuthService,
              private toastService: ToastService){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterProjetosDisponiveis();
    this.dataSource = new MatTableDataSource(this.projetos);
  }

  async obterProjetosDisponiveis(){
    await this.projetosService.obterProjetosDisponiveis().then(result => {
      this.projetos = result;
      
    },fail => {
      this.toastService.show('fail', "Erro ao obter Projetos Disponíveis!" + fail.error)
    })
  }

  enviarEmail(email: string, projeto: string) {
    const destinatario = email;
    
    const encodedDestinatario = encodeURIComponent(destinatario);
    const encodedAssunto = encodeURIComponent(`Projeto de TCC: ${projeto}`);
    const encodedCorpoEmail = encodeURIComponent(`Estou interessado no projeto ${projeto}. Pode me passar mais informações?`);

    // Construa o URL do Gmail com destinatário, assunto e corpo do e-mail como parâmetros
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedDestinatario}&su=${encodedAssunto}&body=${encodedCorpoEmail}`;


    window.open(url, '_blank');
  }
}
