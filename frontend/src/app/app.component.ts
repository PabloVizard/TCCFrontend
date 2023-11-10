import { Component, OnInit } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { delay } from 'rxjs';
import { UsuarioModel } from './core/models/usuario-model';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-boilerplate';
  loading: boolean = false;
  mostrarMenu: boolean = false;

  constructor(
    private _loading: LoadingService,
    private authService: AuthService,
    private router: Router
  ){ }

  ngOnInit() {
    this.authService.mostraMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
    
    this.listenToLoading();

    this.mostrarMenu = this.authService.VerificarUsuarioLogado();

  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) 
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
  
}
