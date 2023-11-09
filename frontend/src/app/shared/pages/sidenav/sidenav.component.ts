import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { TipoUsuarioEnumerator } from 'src/app/core/enumerators/usuario.enumerator';
import { UsuarioLogadoModel } from 'src/app/core/models/usuario-logado-model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  
  usuarioLogado!: UsuarioLogadoModel;
  tipoUsuario!: string;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    
    this.usuarioLogado = this.authService.ObterUsuarioLogado()
    this.tipoUsuario = TipoUsuarioEnumerator[this.usuarioLogado.tipoUsuario];
    console.log(this.tipoUsuario)
  }

  LogOut(){
    this.authService.LogOut()
  }

}
