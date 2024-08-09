import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurmaModel } from 'src/app/core/models/turma-model';
import { TurmaService } from 'src/app/core/services/turma.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-editar-turmas',
  templateUrl: './editar-turmas.component.html',
  styleUrls: ['./editar-turmas.component.scss']
})
export class EditarTurmasComponent implements OnInit {
  turmaForm!: FormGroup;
  turmaAtual!: TurmaModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: TurmaModel },
    private fb: FormBuilder,
    private turmasService: TurmaService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.turmaForm = this.fb.group({
      descricao: ['', Validators.required],
      ano: ['', Validators.required],
      semestre: ['', Validators.required],
      nPoc: ['', Validators.required],
      ativo: [true, Validators.required]
    });

    if (this.data?.data) {
      this.turmaAtual = this.data.data;
      this.atualizarFormulario();
    }
  }

  atualizarFormulario() {
    if (this.turmaAtual) {
      this.turmaForm.patchValue({
        descricao: this.turmaAtual.descricao,
        ano: this.turmaAtual.ano,
        semestre: this.turmaAtual.semestre,
        nPoc: this.turmaAtual.nPoc,
        ativo: this.turmaAtual.ativo
      });
    }
  }

  async salvarTurma() {
    if (this.turmaForm.valid) {
      const formValue = this.turmaForm.getRawValue();
      if (this.turmaAtual) {
        const turmaModel = {
          id: this.turmaAtual.id,
          ...formValue
        };
        await this.turmasService.AtualizarTurma(turmaModel).then(result => {
          this.toastService.show("success", "Turma atualizada com sucesso!");
          window.location.reload()
        }, fail => {
          this.toastService.show("fail", "Erro ao atualizar turma! " + fail.error);
        });
      } else {
        const turmaModel = formValue;
        await this.turmasService.CadastrarTurma(turmaModel).then(result => {
          this.toastService.show("success", "Turma cadastrada com sucesso!");
          window.location.reload()
        }, fail => {
          this.toastService.show("fail", "Erro ao cadastrar turma! " + fail.error);
        });
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar turma!");
    }
  }
}
