import { Component, OnInit } from '@angular/core';
import { UsuarioLogadoModel } from '../../core/models/usuario-logado-model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  usuarioLogado!: UsuarioLogadoModel;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    
    this.usuarioLogado = this.authService.ObterUsuarioLogado()
  }
}
