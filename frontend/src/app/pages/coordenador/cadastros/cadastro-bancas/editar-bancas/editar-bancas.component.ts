import { OnInit, Inject, Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BancasFullModel, BancasModel } from "src/app/core/models/bancas-model";
import { ProjetoModel } from "src/app/core/models/projeto-model";
import { UsuarioLightModel } from "src/app/core/models/usuario-model";
import { BancasService } from "src/app/core/services/bancas.service";
import { ProjetosService } from "src/app/core/services/projetos.service";
import { ToastService } from "src/app/core/services/toast.service";
import { UsuariosService } from "src/app/core/services/usuarios.service";

@Component({
  selector: 'app-editar-bancas',
  templateUrl: './editar-bancas.component.html',
  styleUrls: ['./editar-bancas.component.scss']
})

export class EditarBancasComponent implements OnInit {
  bancaForm!: FormGroup;
  bancaAtual!: BancasFullModel; // Usando BancasFullModel agora
  avaliadoresDisponiveis: UsuarioLightModel[] = [];
  projetosDisponiveis: ProjetoModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: BancasFullModel },
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private bancaService: BancasService,
    private toastService: ToastService,
    private projetoService: ProjetosService
  ) {}

  async ngOnInit() {
    await this.obterAvaliadoresDisponiveis();
    this.bancaForm = this.fb.group({
      avaliador01: ['', Validators.required],
      avaliador02: [''],
      bancaConfirmada: [false, Validators.required],
      dataDefesa: [''],
      horaDefesa: ['', Validators.required],
      status: [false]
    });

    if (this.data?.data) {
      this.bancaAtual = this.data.data;
      this.atualizarFormulario();
    }
  }

  atualizarFormulario() {
    if (this.bancaAtual) {
      const dataDefesa = this.bancaAtual.dataDefesa ? new Date(this.bancaAtual.dataDefesa) : null;
      this.bancaForm.patchValue({
        avaliador01: this.bancaAtual.avaliador01.id,
        avaliador02: this.bancaAtual.avaliador02?.id || null,
        bancaConfirmada: this.bancaAtual.bancaConfirmada,
        // Formata a data para o formato YYYY-MM-DD
        dataDefesa: dataDefesa ? dataDefesa.toISOString().split('T')[0] : '',
        // Formata a hora para o formato HH:mm
        horaDefesa: dataDefesa ? dataDefesa.toTimeString().substring(0, 5) : '',
        status: this.bancaAtual.status
      });
    }
  }
  

  async obterAvaliadoresDisponiveis() {
    await this.usuarioService.ObterTodosProfessoresOrientadores().then(result => {
      this.avaliadoresDisponiveis = result;
    }, fail => {
      this.toastService.show("fail", "Erro ao buscar avaliadores disponíveis! " + fail.error);
    });
  }

  async salvarBanca() {
    if (this.bancaForm.valid) {
      const formValue = this.bancaForm.value;
  
      // Combine dataDefesa e horaDefesa em uma única data no formato ISO
      const dataDefesa: Date = formValue.dataDefesa;
      const horaDefesa: string = formValue.horaDefesa;
      let dataHoraDefesa: string | undefined;
  
      if (dataDefesa && horaDefesa) {
        const formattedDate = this.formatDateToISO(new Date(dataDefesa));
        const dataHoraStr = `${formattedDate}T${horaDefesa}`;
        const dataHora = new Date(dataHoraStr);
  
        if (!isNaN(dataHora.getTime())) {
          dataHoraDefesa = dataHora.toISOString();
        }
      }
  
      const bancaModel: BancasModel = {
        id: this.bancaAtual ? this.bancaAtual.id : 0,
        idProjeto: this.bancaAtual.projeto.id,
        idProfessorOrientador: this.bancaAtual.professorOrientador.id,
        idAlunoOrientado: this.bancaAtual.alunoOrientado.id,
        idAvaliador01: formValue.avaliador01,
        idAvaliador02: formValue.avaliador02,
        ano: this.bancaAtual.ano,
        semestre: this.bancaAtual.semestre,
        bancaConfirmada: formValue.bancaConfirmada,
        dataDefesa: dataHoraDefesa ? new Date(dataHoraDefesa) : undefined,
        status: formValue.status
      };
  
      if (this.bancaAtual) {
        await this.bancaService.AtualizarBanca(bancaModel).then(result => {
          this.toastService.show("success", "Banca atualizada com sucesso!");
          window.location.reload();
        }, fail => {
          this.toastService.show("fail", "Erro ao atualizar banca! " + fail.error);
        });
      }
    } else {
      this.toastService.show("fail", "Erro ao salvar banca!");
    }    
  }
  
  // Helper function to format the date to ISO
  formatDateToISO(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}  