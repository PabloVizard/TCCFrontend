import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PreRegistroModel } from 'src/app/core/models/pre-registro-model';
import { UsuariosFullModel } from 'src/app/core/models/usuario-model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {
  usuarios: Array<UsuariosFullModel> = new Array<UsuariosFullModel>();
  dataSource: any;
  displayedColumns: string[] = ['nomeCompleto', 'cpf', 'matricula', 'turma', 'cadastrado', 'actions'];

  constructor(private usuarioService: UsuariosService, private router: Router, private dialog: MatDialog) {}

  async ngOnInit() {
    await this.obterPreRegistros();
    this.dataSource = new MatTableDataSource(this.usuarios);
  }

  async obterPreRegistros() {
    await this.usuarioService.ObterTodosAlunos().then(result => {
      this.usuarios = result;
    }, fail => {
      console.error('Erro ao obter pré-registros:', fail.error);
    });
  }

  editarusuario(usuario: UsuariosFullModel){
    this.dialog.open(EditarUsuariosComponent, {
      width: '1024px', 
      height: '600px',
      data: { data: usuario, tipo: usuario.usuario == null ? 'preregistro' : 'usuario'}
    });
  }

  adicionarAluno(){
    this.dialog.open(EditarUsuariosComponent, {
      width: '1024px', 
      height: '600px',
      data: {}
    });
  }

  gerarRelatorio(){
    // Implementar lógica de geração de relatório
  }

  excluirUsuario(matricula: number){
    if (confirm("Deseja realmente remover o aluno selecionado?")){
      // Implementar lógica de exclusão de usuário
    }
  }
}
