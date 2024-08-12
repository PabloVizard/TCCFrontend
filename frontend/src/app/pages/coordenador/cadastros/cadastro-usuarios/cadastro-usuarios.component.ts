import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PreRegistroModel } from 'src/app/core/models/pre-registro-model';
import { UsuariosFullModel } from 'src/app/core/models/usuario-model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { EnumeratorService } from 'src/app/core/services/enumerator.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {
  usuarios: Array<UsuariosFullModel> = new Array<UsuariosFullModel>();
  dataSource: any;
  displayedColumns: string[] = ['nomeCompleto', 'cpf', 'matricula', 'turma', 'projeto', 'orientador', 'status', 'cadastrado', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private dialog: MatDialog,
              private enumerator: EnumeratorService,
              private toastService: ToastService) {}

  async ngOnInit() {
    await this.obterPreRegistros();
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.sort = this.sort;
  }

  async obterPreRegistros() {
    await this.usuarioService.ObterTodosAlunos().then(result => {
      this.usuarios = result;
    }, fail => {
      this.toastService.show("fail", "Falha ao obter alunos! " + fail.error);
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

  async excluirUsuario(matricula: string){
    if (confirm("Deseja realmente remover o aluno selecionado?")){
      await this.usuarioService.Remover(matricula).then(result => {
        this.toastService.show("success", "Aluno excluído com sucesso! ");
      }, fail => {
        this.toastService.show("fail", "Falha ao excluir aluno! " + fail.error);
      });
    }
  }

  obterStatusAprovacao(status: number){
    if(status == null){
      return null;
    }
    return this.enumerator.getStatusAprovacao(status)
  }
}
