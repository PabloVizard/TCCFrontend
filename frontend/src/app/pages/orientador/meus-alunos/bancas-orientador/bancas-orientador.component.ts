import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnumeratorService } from 'src/app/core/services/enumerator.service';
import { BancasService } from 'src/app/core/services/bancas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { BancasFullModel } from 'src/app/core/models/bancas-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';

@Component({
  selector: 'app-bancas-orientador',
  templateUrl: './bancas-orientador.component.html',
  styleUrls: ['./bancas-orientador.component.scss']
})
export class BancasOrientadorComponent implements OnInit {
  usuarioLogado: UsuarioModel | undefined;
  dataSource!: MatTableDataSource<BancasFullModel>;
  displayedColumns: string[] = ['aluno', 'projeto', 'professorOrientador', 'avaliador1', 'avaliador2', 'ano', 'semestre', 'statusConfirmada', 'dataDefesa'];
  bancasOrientador: BancasFullModel[] = [];
  
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private bancasService: BancasService,
    private enumeratorService: EnumeratorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterBancasDoOrientador();
    this.dataSource = new MatTableDataSource(this.bancasOrientador);
  }

  async obterBancasDoOrientador() {
    if (this.usuarioLogado) {
      await this.bancasService.obterBancaPorOrientadorId(this.usuarioLogado.id).then(result => {
        this.bancasOrientador = result;
      }, fail => {
        this.toastService.show('fail', "Erro ao obter Bancas!" + fail.error);
      });
    }
  }

  obterStatusAprovacao(status: number) {
    return this.enumeratorService.getStatusAprovacao(status);
  }

  recarregarPagina() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
