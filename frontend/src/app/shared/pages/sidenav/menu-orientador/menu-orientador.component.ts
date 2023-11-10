import { Component, OnInit } from '@angular/core';
import { TipoUsuarioEnumerator } from 'src/app/core/enumerators/usuario.enumerator';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaService } from 'src/app/core/services/turma.service';

@Component({
  selector: 'app-menu-orientador',
  templateUrl: './menu-orientador.component.html',
  styleUrls: ['./menu-orientador.component.scss']
})
export class MenuOrientadorComponent implements OnInit {
  usuarioLogado!: UsuarioModel;
  turmaUsuario!: TurmaModel;

  constructor(private authService: AuthService,
              private turmaService: TurmaService,
              private toastService: ToastService){

  }
  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    await this.obterTurmaUsuario();
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
