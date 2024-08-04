import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { AulasModel } from 'src/app/core/models/aulas-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AulasService } from 'src/app/core/services/aulas.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-aulas-aluno',
  templateUrl: './aulas-aluno.component.html',
  styleUrls: ['./aulas-aluno.component.scss']
})
export class AulasAlunoComponent implements OnInit {
  aulas: Array<AulasModel> = new Array<AulasModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['descricao', 'professor','turma', 'dataAula', 'local', 'link'];

  constructor(
    private aulasService: AulasService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterAulasAluno();
    this.dataSource = new MatTableDataSource(this.aulas);
  }

  async obterAulasAluno() {
    await this.aulasService.ObterAulasAluno().then(result => {
      this.aulas = result;
    }, fail => {
      this.toastService.show('fail', "Erro ao obter aulas!" + fail.error);
    });
  }

  parseDate(dateString: string): string {
    var data = new Date(dateString);
    return format(data, 'dd/MM/yyyy HH:mm');
  }

  acessarLink(link: string) {
    window.open(link, '_blank');
  }
}
