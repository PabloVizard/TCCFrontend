import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-realizar-cadastro',
  templateUrl: './realizar-cadastro.component.html',
  styleUrls: ['./realizar-cadastro.component.scss']
})
export class RealizarCadastroComponent implements OnInit {
  registerForm!: FormGroup;
  mostrarErro: boolean = false;

  tipoSenha: string = 'password';



  constructor(private formBuilder: FormBuilder,
              private location: Location,
              private router: Router,
              private toastService: ToastService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  mostrarSenha() {
    this.tipoSenha = this.tipoSenha === 'password' ? 'text' : 'password';
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.loginService.registrarUsuario(this.registerForm.value).then(result => {
        this.toastService.show('success',"Cadastro Realizado com Sucesso!")
        this.router.navigate(['/login'])
      }, fail => {
        this.toastService.show('fail',fail.error)
      })
    }
    else{
      this.toastService.show('fail',"Formulário Invalido!")

    }
  }

  voltar() {
    this.location.back();
  }
}
