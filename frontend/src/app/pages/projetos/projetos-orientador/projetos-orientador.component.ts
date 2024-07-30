import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TipoUsuarioEnumerator } from 'src/app/core/enumerators/usuario.enumerator';
import { ProjetoModel } from 'src/app/core/models/projeto-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { AdicionarProjetoComponent } from '../adicionar-projeto/adicionar-projeto.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projetos-orientador',
  templateUrl: './projetos-orientador.component.html',
  styleUrls: ['./projetos-orientador.component.scss']
})
export class ProjetosOrientadorComponent implements OnInit {
  projetos: Array<ProjetoModel> = new Array<ProjetoModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['nome', 'descricao', 'area', 'alunoResponsavel', 'professorResponsavel', 'contato', 'actions']; // Adicione mais colunas aqui conforme necessário
  

  constructor(private projetosService: ProjetosService,
              private authService: AuthService,
              private toastService: ToastService,
              private dialog: MatDialog,
              private router: Router){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterProjetosDisponiveis();
    this.dataSource = new MatTableDataSource(this.projetos);
  }

  async obterProjetosDisponiveis(){
      await this.projetosService.obterProjetosDisponiveisProfessor(this.usuarioLogado.id).then(result => {
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

  adicionarProjeto(): void {
    this.dialog.open(AdicionarProjetoComponent, {
      width: '1024px', 
      height: '600px',
    });
  }
  editarProjeto(idProjeto: number): void {

    this.dialog.open(AdicionarProjetoComponent, {
      width: '1024px', 
      height: '600px',
      data: idProjeto
    });
  }

  excluirProjeto(idProjeto: number): void {

    if (confirm("Deseja realmente excluir o projeto selecionado?")) {
      this.projetosService.ExcluirProjeto(idProjeto).then(result => {
        this.toastService.show('success', "Projeto excluído com sucesso!");
        this.recarregarPagina()
      }, fail => {
        this.toastService.show('fail', "Erro ao excluir Projeto!" + fail.error);
      });
    }
  }

  recarregarPagina() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
