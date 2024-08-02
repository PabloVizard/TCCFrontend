import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarefaModel } from 'src/app/core/models/tarefa-model';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TarefasService } from 'src/app/core/services/tarefas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaService } from 'src/app/core/services/turma.service';

@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.scss']
})
export class CadastrarTarefaComponent implements OnInit {
  usuarioLogado: UsuarioModel = new UsuarioModel();
  turmasDisponiveis: Array<TurmaModel> = new Array<TurmaModel>();
  tarefaForm!: FormGroup;
  tarefaAtual!: TarefaModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idTarefa: number,
    private fb: FormBuilder,
    private authService: AuthService,
    private tarefaService: TarefasService,
    private turmasService: TurmaService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    this.tarefaForm = this.fb.group({
      id: [0],
      descricao: ['', Validators.required],
      idTurma: [null, Validators.required],
      dataLimite: [null, Validators.required],
      horaLimite: [null, Validators.required],
      anexo: [''],
      idProfessor: [this.usuarioLogado.id]
    });

    await this.carregarDados();
  }

  async carregarDados() {
    await this.obterTurmasDisponiveis();
    if (this.idTarefa) {
      await this.buscarTarefa();
    }
    if (this.tarefaAtual) {
      this.atualizarFormulario();
    }
  }

  async buscarTarefa() {
    if (this.idTarefa) {
      await this.tarefaService.ObterTarefaPorId(this.idTarefa).then(result => {
        this.tarefaAtual = result;
      }, fail => {
        this.toastService.show("fail", "Erro ao buscar tarefa disponível! " + fail.error);
      });
    }
  }

  async obterTurmasDisponiveis() {
    await this.turmasService.ObterTurmasProfessor().then(result => {
      this.turmasDisponiveis = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar turmas disponíveis! " + fail.error);
    });
  }

  atualizarFormulario() {
    if (this.tarefaAtual) {
      const dataHora = new Date(this.tarefaAtual.dataLimite);
      this.tarefaForm.patchValue({
        id: this.tarefaAtual.id,
        descricao: this.tarefaAtual.descricao,
        idTurma: this.tarefaAtual.idTurma,
        dataLimite: this.tarefaAtual.dataLimite ? dataHora.toISOString().split('T')[0] : null,
        horaLimite: this.tarefaAtual.dataLimite ? dataHora.toTimeString().substring(0, 5) : null,
        anexo: this.tarefaAtual.anexo,
        idProfessor: this.tarefaAtual.idProfessor
      });
    }
  }

  async salvarTarefa() {
    if (this.tarefaForm.valid) {
      const formValues = this.tarefaForm.value;
      formValues.idProfessor = this.usuarioLogado.id
      const dataLimite: Date = formValues.dataLimite;
      const horaLimite: string = formValues.horaLimite;
      if (dataLimite && horaLimite) {
        const formattedDate = this.formatDateToISO(new Date(dataLimite));
        const dataHoraStr = `${formattedDate}T${horaLimite}`;
        const dataHora = new Date(dataHoraStr);

        if (!isNaN(dataHora.getTime())) {
          formValues.dataLimite = dataHora.toISOString();

          if (this.idTarefa) {
            await this.tarefaService.AtualizarTarefa(formValues).then(result => {
              this.toastService.show("success", "Tarefa salva com sucesso!");
              window.location.reload();
            }, fail => {
              this.toastService.show("fail", "Erro ao salvar tarefa! " + fail.error);
            });
          } else {
            await this.tarefaService.CadastrarNovaTarefa(formValues).then(result => {
              this.toastService.show("success", "Tarefa salva com sucesso!");
              window.location.reload();
            }, fail => {
              this.toastService.show("fail", "Erro ao salvar tarefa! " + fail.error);
            });
          }
        } else {
          this.toastService.show("fail", "Data e Hora inválidos!");
        }
      } else {
        this.toastService.show("fail", "Data e Hora devem ser preenchidos!");
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar tarefa!");
    }
  }

  formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
