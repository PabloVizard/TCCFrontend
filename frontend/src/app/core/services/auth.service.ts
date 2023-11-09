import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "./toast.service";

@Injectable()
export class AuthService{

    private usuarioAutenticado: boolean = false;

    mostraMenuEmitter = new EventEmitter<boolean>();

    constructor(private router: Router,
                private toastService: ToastService){
        
    }

    MostrarMenu(){
        this.mostraMenuEmitter.emit(true);
    }
    EsconderMenu(){
        this.mostraMenuEmitter.emit(false);
    }

    VerificarUsuarioLogado(){
        
        var usuarioLogado = JSON.parse(localStorage.getItem('user')!)

        return usuarioLogado != null ? true : false;
    }

    ObterUsuarioLogado(){
        
        var usuarioLogado = JSON.parse(localStorage.getItem('user')!)

        if(usuarioLogado == null){
            this.ForcedLogOut();
        }

        return usuarioLogado;
    }
    ForcedLogOut(){
        
        localStorage.clear();
        this.EsconderMenu();
        
        this.toastService.show('fail', "Realize o login novamente!")
        this.router.navigate(['/'])
    }

    LogOut(){
        
        localStorage.clear();
        this.EsconderMenu();
        this.router.navigate(['/'])
    }
    
}