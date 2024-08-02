import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { AulasModel, AulasFullModel } from 'src/app/core/models/aulas-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AulasService } from 'src/app/core/services/aulas.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-aulas-professor',
  templateUrl: './aulas-professor.component.html',
  styleUrls: ['./aulas-professor.component.scss']
})
export class AulasProfessorComponent implements OnInit {
  aulas: Array<AulasFullModel> = new Array<AulasFullModel>();
  dataSource: any;
  usuarioLogado!: UsuarioModel;

  displayedColumns: string[] = ['descricao', 'nomeProfessor', 'turma', 'dataAula', 'local', 'link'];

  constructor(private aulasService: AulasService,
              private authService: AuthService,
              private toastService: ToastService) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterAulasAluno();
    this.dataSource = new MatTableDataSource(this.aulas);
  }

  async obterAulasAluno(){
    await this.aulasService.ObterAulasProfessor().then(result => {
      this.aulas = result;
    }, fail => {
      this.toastService.show('fail', "Erro ao obter aulas!" + fail.error);
    });
  }

  parseDate(dateString: string): string {
    const data = new Date(dateString);
    return format(data, 'dd/MM/yyyy HH:mm');
  }

  acessarLink(link: string) {
    window.open(link, '_blank');
  }
}
