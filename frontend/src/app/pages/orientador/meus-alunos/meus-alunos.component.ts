import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StatusAprovacaoEnumerator, StatusAprovacaoEnumeratorString } from 'src/app/core/enumerators/status-aprovacao.enumerator';
import { AlunosModel } from 'src/app/core/models/alunos-model';
import { OrientacoesModel } from 'src/app/core/models/orientacoes-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnumeratorService } from 'src/app/core/services/enumerator.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ProjetosService } from 'src/app/core/services/projetos.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { EditarAlunosOrientadosComponent } from './editar-alunos-orientados/editar-alunos-orientados.component';

@Component({
  selector: 'app-meus-alunos',
  templateUrl: './meus-alunos.component.html',
  styleUrls: ['./meus-alunos.component.scss']
})

  export class MeusAlunosComponent {
  usuarioLogado: UsuarioModel | undefined;
  dataSource: any;
  alunosOrientados: AlunosModel[] = [];
  displayedColumns: string[] = ['aluno', 'projeto', 'turma', 'statusAprovacao', 'tao', 'actions'];
  displayedColumns2: string[] = ['aluno', 'projeto', 'turma', 'statusAprovacao', 'resumo', 'local', 'actions']; // Adicione mais colunas aqui conforme necessário
  pocUrl: number = 1;
  

    constructor(private projetosService: ProjetosService,
      private authService: AuthService,
      private toastService: ToastService,
      private dialog: MatDialog,
      private router: Router,
      private orientacoesService: OrientacoesService,
      private enumeratorService: EnumeratorService){

  }

  async ngOnInit() {
    if(this.router.url.match("meusalunospoc1")){
      this.pocUrl = 1
    }
    else{
      this.pocUrl = 2
    }
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterAlunosOrientados();
    this.dataSource = new MatTableDataSource(this.alunosOrientados);
  }
  async obterAlunosOrientados() {
    await this.orientacoesService.obterOrientacaoProfessor().then(result => {
      this.alunosOrientados = result.filter((aluno: OrientacoesModel) => aluno.turma.nPoc === this.pocUrl);;
      
    },fail => {
      this.toastService.show('fail', "Erro ao obter Projetos Disponíveis!" + fail.error)
    })
  }
  obterStatusAprovacao(status: number){
    return this.enumeratorService.getStatusAprovacao(status);
  }
  async editarOrientacao(orientacaoId: number){
    var dialogRef = this.dialog.open(EditarAlunosOrientadosComponent, {
      width: '1024px', 
      height: '300px',
      data: orientacaoId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recarregarPagina();
    });
  }

  recomendarBanca(alunoid: number){

  }

  recarregarPagina() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  abrirAnexo(anexo:string){
    window.open(anexo)
  }
}
