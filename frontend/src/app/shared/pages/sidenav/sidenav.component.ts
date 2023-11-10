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
    await this.obterTurmaUsuario();
    console.log(this.turmaUsuario.descricao)
    this.tipoUsuario = TipoUsuarioEnumerator[this.usuarioLogado.tipoUsuario];
    console.log(this.tipoUsuario)
  }

  LogOut(){
    this.authService.LogOut()
  }

  async obterTurmaUsuario(){
    await this.turmaService.obterTurmaDoUsuario(this.usuarioLogado.id).then(result => {
      this.turmaUsuario = result;
      localStorage.setItem("turmaUsuario", this.turmaUsuario.id.toString())
    }, fail => {
      this.toastService.show('fail', "Erro ao buscar turma do usuário!");
    })
  }

  tipoUsuarioString(tipoUsuario: number){
    return TipoUsuarioEnumerator[tipoUsuario];
  }

}
