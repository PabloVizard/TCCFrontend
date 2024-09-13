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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TurmaService } from 'src/app/core/services/turma.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {
  usuarios: Array<UsuariosFullModel> = [];
  turmas: Array<any> = [];
  selectedTurma: string = '';
  dataSource: MatTableDataSource<UsuariosFullModel> = new MatTableDataSource();
  displayedColumns: string[] = ['nomeCompleto', 'cpf', 'matricula', 'turma', 'faltas', 'projeto', 'orientador', 'status', 'cadastrado', 'actions'];
  pageSlice: Array<UsuariosFullModel> = new Array<UsuariosFullModel>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuariosService,
              private router: Router,
              private dialog: MatDialog,
              private enumerator: EnumeratorService,
              private toastService: ToastService,
              private turmasService: TurmaService) {}

async ngOnInit() {
  await this.obterTurmas();
  await this.obterPreRegistros();

  this.dataSource = new MatTableDataSource(this.usuarios);

  setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}


  async obterTurmas() {
    await this.turmasService.ObterTodasTurmas().then(result => {
      this.turmas = result;
    }, fail => {
      this.toastService.show("fail", "Falha ao obter turmas! " + fail.error);
    });
  }

  async obterPreRegistros() {
    await this.usuarioService.ObterTodosAlunos().then(result => {
      this.usuarios = result;
      this.dataSource.data = this.usuarios;  // Atualize o dataSource novamente após obter os dados
    }, fail => {
      this.toastService.show("fail", "Falha ao obter alunos! " + fail.error);
    });
  }

  editarusuario(usuario: UsuariosFullModel) {
    this.dialog.open(EditarUsuariosComponent, {
      width: '1024px', 
      height: '600px',
      data: { data: usuario, tipo: usuario.usuario == null ? 'preregistro' : 'usuario'}
    });
  }

  adicionarAluno() {
    this.dialog.open(EditarUsuariosComponent, {
      width: '1024px', 
      height: '600px',
      data: {}
    });
  }

  gerarRelatorio() {
    // Implementar lógica de geração de relatório
  }

  async excluirUsuario(matricula: string) {
    if (confirm("Deseja realmente remover o aluno selecionado?")) {
      await this.usuarioService.Remover(matricula).then(result => {
        this.toastService.show("success", "Aluno excluído com sucesso! ");
        this.obterPreRegistros();  // Atualize a lista após a exclusão
      }, fail => {
        this.toastService.show("fail", "Falha ao excluir aluno! " + fail.error);
      });
    }
  }

  obterStatusAprovacao(status: number) {
    if (status == null) {
      return null;
    }
    return this.enumerator.getStatusAprovacao(status);
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      this.dataSource.filter = ''; // Remove o filtro se não houver seleção
      return;
    }

    this.dataSource.filterPredicate = (data: UsuariosFullModel, filter: string) => {
      return data?.turmaAluno?.descricao.trim().toLowerCase() === filter.trim().toLowerCase();
    };

    this.dataSource.filter = filterValue;
  }
  OnPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.usuarios.length){
      endIndex = this.usuarios.length
    }
    this.pageSlice = this.usuarios.slice(startIndex, endIndex)
  }
  gerarRelatorioDeFaltas() {
    const dados = this.usuarios.map(usuario => ({
      Nome: usuario?.usuario?.nomeCompleto || ' - ',
      Matricula: usuario?.usuario?.matricula || usuario?.preRegistro?.matricula || ' - ',
      Turma: usuario?.turmaAluno?.descricao || ' - ',
      Faltas: usuario?.faltas?.length || 0
    }));

    // Cria a planilha
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dados);
    const workbook: XLSX.WorkBook = { Sheets: { 'Relatorio de Faltas': worksheet }, SheetNames: ['Relatorio de Faltas'] };

    // Gera o arquivo Excel e salva
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.salvarArquivoExcel(excelBuffer, 'Relatorio_Faltas');
  }

  salvarArquivoExcel(buffer: any, nomeArquivo: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, nomeArquivo + '.xlsx');
  }
}
