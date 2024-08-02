import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TipoUsuarioEnumerator } from 'src/app/core/enumerators/usuario.enumerator';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { TurmaService } from 'src/app/core/services/turma.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaModel } from 'src/app/core/models/turma-model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  usuarioLogado!: UsuarioModel;
  turmaUsuario!: TurmaModel;
  tipoUsuario!: string;

  constructor(private authService: AuthService,
              private turmaService: TurmaService,
              private toastService: ToastService){

  }

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado()
    this.tipoUsuario = TipoUsuarioEnumerator[this.usuarioLogado.tipoUsuario];

    console.log(this.usuarioLogado.tipoUsuario)
  }

  LogOut(){
    this.authService.LogOut()
  }

  tipoUsuarioString(tipoUsuario: number){
    return TipoUsuarioEnumerator[tipoUsuario];
  }

}
