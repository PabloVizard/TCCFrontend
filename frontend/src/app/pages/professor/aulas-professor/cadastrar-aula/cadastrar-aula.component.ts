import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AulasModel } from 'src/app/core/models/aulas-model';
import { UsuarioModel } from 'src/app/core/models/usuario-model';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AulasService } from 'src/app/core/services/aulas.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { TurmaService } from 'src/app/core/services/turma.service';

@Component({
  selector: 'app-cadastrar-aula',
  templateUrl: './cadastrar-aula.component.html',
  styleUrls: ['./cadastrar-aula.component.scss']
})
export class CadastrarAulaComponent implements OnInit {
  usuarioLogado: UsuarioModel = new UsuarioModel();
  turmasDisponiveis: Array<TurmaModel> = new Array<TurmaModel>();
  aulaForm!: FormGroup;
  aulaAtual!: AulasModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public idAula: number,
    private fb: FormBuilder,
    private authService: AuthService,
    private aulasService: AulasService,
    private turmasService: TurmaService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.usuarioLogado = this.authService.ObterUsuarioLogado();
    this.aulaForm = this.fb.group({
      id: [0],
      descricao: ['', Validators.required],
      idTurma: [null, Validators.required],
      dataAula: [null, Validators.required],
      horaAula: [null, Validators.required],
      local: [''],
      link: [''],
      idProfessor: [this.usuarioLogado.id]
    });

    await this.carregarDados();
  }

  compareTurmas(turma1: number, turma2: number): boolean {
    return turma1 && turma2 ? turma1 === turma2 : turma1 === turma2;
  }

  async carregarDados() {
    await this.obterTurmasDisponiveis();
    if (this.idAula) {
      await this.buscarAula();
    }
    // Atualize o formulário somente após garantir que a aula atual está carregada
    if (this.aulaAtual) {
      this.atualizarFormulario();
    }
  }

  async buscarAula() {
    if (this.idAula) {
      await this.aulasService.ObterAulaPorId(this.idAula).then(result => {
        this.aulaAtual = result;
        console.log('Aula Atual:', this.aulaAtual); // Verifique se o valor está correto
      }, fail => {
        this.toastService.show("fail", "Erro ao buscar aula disponível! " + fail.error);
      });
    }
  }

  async obterTurmasDisponiveis() {
    await this.turmasService.ObterTurmasProfessor().then(result => {
      this.turmasDisponiveis = result;
      console.log('Turmas Disponíveis:', this.turmasDisponiveis); 
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar turmas disponíveis! " + fail.error);
    });
  }

  atualizarFormulario() {
    if (this.aulaAtual) {
      const dataHora = new Date(this.aulaAtual.dataAula);
      this.aulaForm.patchValue({
        id: this.aulaAtual.id,
        descricao: this.aulaAtual.descricao,
        idTurma: this.aulaAtual.idTurma,
        dataAula: this.aulaAtual.dataAula ? dataHora.toISOString().split('T')[0] : null,
        horaAula: this.aulaAtual.dataAula ? dataHora.toTimeString().substring(0, 5) : null, // Pegando apenas HH:MM
        local: this.aulaAtual.local,
        link: this.aulaAtual.link,
        idProfessor: this.aulaAtual.idProfessor
      });
    }
  }

  async salvarAula() {
    if (this.aulaForm.valid) {
      const formValues = this.aulaForm.value;
      formValues.idProfessor = this.usuarioLogado.id
      const dataAula: Date = formValues.dataAula; // Supondo que seja um objeto Date
      const horaAula: string = formValues.horaAula; // Formato 'HH:MM'
      if (dataAula && horaAula) {
        const formattedDate = this.formatDateToISO(new Date(dataAula));
        const dataHoraStr = `${formattedDate}T${horaAula}`;
        const dataHora = new Date(dataHoraStr);
  
        if (!isNaN(dataHora.getTime())) {

          formValues.dataAula = dataHora.toISOString();
  
          if (this.idAula) {
            await this.aulasService.AtualizarAula(formValues).then(result => {
              this.toastService.show("success", "Aula salva com sucesso!");
              window.location.reload()
            }, fail => {
              this.toastService.show("fail", "Erro ao salvar aula! " + fail.error);
            });
          } else {
            await this.aulasService.CadastrarNovaAula(formValues).then(result => {
              this.toastService.show("success", "Aula salva com sucesso!");
              window.location.reload()
            }, fail => {
              this.toastService.show("fail", "Erro ao salvar aula! " + fail.error);
            });
          }
        } else {
          this.toastService.show("fail", "Data e Hora inválidos!");
        }
      } else {
        this.toastService.show("fail", "Data e Hora devem ser preenchidos!");
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar aula!");
    }
  }
  

  formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês é zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}  
