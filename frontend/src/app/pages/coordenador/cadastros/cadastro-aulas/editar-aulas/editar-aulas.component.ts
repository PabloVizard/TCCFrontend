import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AulasModelApi } from 'src/app/core/models/aulas-model';
import { UsuarioLightModel } from 'src/app/core/models/usuario-model';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { TurmaService } from 'src/app/core/services/turma.service';
import { AulasService } from 'src/app/core/services/aulas.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-editar-aulas',
  templateUrl: './editar-aulas.component.html',
  styleUrls: ['./editar-aulas.component.scss']
})
export class EditarAulasComponent implements OnInit {
  aulaForm!: FormGroup;
  aulaAtual!: AulasModelApi;
  professoresDisponiveis: UsuarioLightModel[] = [];
  turmasDisponiveis: TurmaModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: AulasModelApi },
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private turmaService: TurmaService,
    private aulasService: AulasService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    await this.obterProfessoresDisponiveis();
    await this.obterTurmasDisponiveis();
    this.aulaForm = this.fb.group({
      descricao: ['', Validators.required],
      professor: ['', Validators.required],
      turma: ['', Validators.required],
      dataAula: ['', Validators.required],
      horaAula: ['', Validators.required],
      local: [''],
      link: ['']
    });

    if (this.data?.data) {
      this.aulaAtual = this.data.data;
      this.atualizarFormulario();
    }
  }

  atualizarFormulario() {
    if (this.aulaAtual) {
      this.aulaForm.patchValue({
        descricao: this.aulaAtual.descricao,
        professor: this.aulaAtual.idProfessor,
        turma: this.aulaAtual.idTurma,
        dataAula: new Date(this.aulaAtual.dataAula).toISOString().split('T')[0], // Apenas a data
        horaAula: new Date(this.aulaAtual.dataAula).toTimeString().split(' ')[0], // Apenas a hora
        local: this.aulaAtual.local,
        link: this.aulaAtual.link
      });
    }
  }

  async obterProfessoresDisponiveis() {
    await this.usuariosService.obterProfessores().then(result => {
      this.professoresDisponiveis = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar professores disponíveis! " + fail.error);
    });
  }

  async obterTurmasDisponiveis() {
    await this.turmaService.ObterTurmasAtivas().then(result => {
      this.turmasDisponiveis = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar turmas disponíveis! " + fail.error);
    });
  }

  async salvarAula() {
    console.log(this.aulaForm)
    if (this.aulaForm.valid) {
      const formValue = this.aulaForm.value;

      const dataLimite: Date = formValue.dataLimite;
      const horaLimite: string = formValue.horaLimite;
      if (dataLimite && horaLimite) {
        const formattedDate = this.formatDateToISO(new Date(dataLimite));
        const dataHoraStr = `${formattedDate}T${horaLimite}`;
        const dataHora = new Date(dataHoraStr);

        if (!isNaN(dataHora.getTime())) {
          formValue.dataLimite = dataHora.toISOString();

      const aulaModel: AulasModelApi = {
        id: this.aulaAtual ? this.aulaAtual.id : 0,
        descricao: formValue.descricao,
        idProfessor: formValue.professor,
        idTurma: formValue.turma,
        dataAula: formValue.dataLimite,
        local: formValue.local,
        link: formValue.link
      };

      if (this.aulaAtual) {
        await this.aulasService.AtualizarAula(aulaModel).then(result => {
          this.toastService.show("success", "Aula atualizada com sucesso!");
          window.location.reload();
        }, fail => {
          this.toastService.show("fail", "Erro ao atualizar aula! " + fail.error);
        });
      } else {
        await this.aulasService.CadastrarNovaAula(aulaModel).then(result => {
          this.toastService.show("success", "Aula cadastrada com sucesso!");
          window.location.reload();
        }, fail => {
          this.toastService.show("fail", "Erro ao cadastrar aula! " + fail.error);
        });
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar aula!");
    }    
  }
}
}

  formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
