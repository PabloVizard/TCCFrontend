import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { AulasModel, AulasFullModel } from 'src/app/core/models/aulas-model';
import { UsuarioLightModel, UsuarioModel } from 'src/app/core/models/usuario-model';
import { AulasService } from 'src/app/core/services/aulas.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { CadastrarAulaComponent } from './cadastrar-aula/cadastrar-aula.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlunosFaltaComponent } from './alunos-falta/alunos-falta.component';

@Component({
  selector: 'app-aulas-professor',
  templateUrl: './aulas-professor.component.html',
  styleUrls: ['./aulas-professor.component.scss']
})
export class AulasProfessorComponent implements OnInit {
  aulas: Array<AulasFullModel> = new Array<AulasFullModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;
  alunosAula: UsuarioLightModel[] = [];

  displayedColumns: string[] = ['descricao', 'nomeProfessor', 'turma', 'dataAula', 'local', 'link', 'alunos', 'actions'];

  constructor(private aulasService: AulasService,
              private authService: AuthService,
              private toastService: ToastService,
              private dialog: MatDialog,
              private router: Router) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterAulasProfessor();
    this.dataSource = new MatTableDataSource(this.aulas);
  }

  async obterAulasProfessor(){
    await this.aulasService.ObterAulasProfessor().then(result => {
      this.aulas = result;
    }, fail => {
      this.toastService.show('fail', "Erro ao obter aulas!" + fail.error);
    });
  }
  
  mostrarAlunos(turmaId: number, aulaId: number){
    this.dialog.open(AlunosFaltaComponent, {
      width: '800px', 
      height: '900px',
      data: { turmaId, aulaId }
    });
  }

  parseDate(dateString: string): string {
    const data = new Date(dateString);
    return format(data, 'dd/MM/yyyy HH:mm');
  }

  acessarLink(link: string) {
    window.open(link, '_blank');
  }

  adicionarAula(): void {
    this.dialog.open(CadastrarAulaComponent, {
      width: '1024px', 
      height: '600px',
    });
  }
  editarAula(aulaId: number): void {

    this.dialog.open(CadastrarAulaComponent, {
      width: '1024px', 
      height: '600px',
      data: aulaId
    });
  }

  excluirAula(aulaId: number): void {

    if (confirm("Deseja realmente excluir a aula selecionada?")) {
      this.aulasService.ExcluirAula(aulaId).then(result => {
        this.toastService.show('success', "Aula excluída com sucesso!");
        this.recarregarPagina()
      }, fail => {
        this.toastService.show('fail', "Erro ao excluir Aula!" + fail.error);
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
