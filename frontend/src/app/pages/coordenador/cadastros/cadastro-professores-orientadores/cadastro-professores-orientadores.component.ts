import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioLightModel } from 'src/app/core/models/usuario-model';
import { EditarProfessoresOrientadoresComponent } from './editar-professores-orientadores/editar-professores-orientadores.component';
import { EnumeratorService } from 'src/app/core/services/enumerator.service';
import { ToastService } from 'src/app/core/services/toast.service';


@Component({
  selector: 'app-cadastro-professores-orientadores',
  templateUrl: './cadastro-professores-orientadores.component.html',
  styleUrls: ['./cadastro-professores-orientadores.component.scss']
})
export class CadastroProfessoresOrientadoresComponent implements OnInit {
  professores: UsuarioLightModel[] = [];
  dataSource: any;
  displayedColumns: string[] = ['nomeCompleto', 'cpf', 'matricula', 'email', 'tipoUsuario', 'actions'];

  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private dialog: MatDialog,
              private enumerator: EnumeratorService,
              private toastService: ToastService) {}

  async ngOnInit() {
    await this.ObterTodosProfessoresOrientadores();
    this.dataSource = new MatTableDataSource(this.professores);
  }

  async ObterTodosProfessoresOrientadores() {
    await this.usuarioService.ObterTodosProfessoresOrientadores().then(result => {
      this.professores = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar professores! " + fail.error);
    });
  }

  editarProfessor(professor: UsuarioLightModel){
    this.dialog.open(EditarProfessoresOrientadoresComponent, {
      width: '1024px',
      height: '600px',
      data: { data: professor }
    });
  }

  adicionarProfessor(){
    this.dialog.open(EditarProfessoresOrientadoresComponent, {
      width: '1024px',
      height: '600px',
      data: {}
    });
  }

  gerarRelatorio(){
    // Implementar lógica de geração de relatório
  }

  async excluirProfessor(matricula: string){
    if (confirm("Deseja realmente remover o professor selecionado?")){
      await this.usuarioService.Remover(matricula).then(result => {
        this.toastService.show("success", "Professor excluído com sucesso! ");
      }, fail => {
        this.toastService.show("fail", "Falha ao excluir professor! " + fail.error);
      });
    }
    await this.ObterTodosProfessoresOrientadores();
    this.dataSource = new MatTableDataSource(this.professores);
  }

  getTipoUsuario(usuario: number){
    return this.enumerator.getTipoUsuario(usuario);
  }
}
