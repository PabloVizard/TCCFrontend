import { Component, OnInit } from '@angular/core';
import { TipoUsuarioEnumerator } from 'src/app/core/enumerators/usuario.enumerator';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaService } from 'src/app/core/services/turma.service';

@Component({
  selector: 'app-menu-coordenador',
  templateUrl: './menu-coordenador.component.html',
  styleUrls: ['./menu-coordenador.component.scss']
})
export class MenuCoordenadorComponent implements OnInit {
  usuarioLogado!: UsuarioModel;
  turmaUsuario!: TurmaModel;

  constructor(private authService: AuthService,
              private turmaService: TurmaService,
              private toastService: ToastService){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
  }


  tipoUsuarioString(tipoUsuario: number){
    return TipoUsuarioEnumerator[tipoUsuario];
  }
}
