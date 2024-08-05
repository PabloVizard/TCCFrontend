import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EnumeratorService } from 'src/app/core/services/enumerator.service';
import { OrientacoesService } from 'src/app/core/services/orientacoes.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-editar-alunos-orientados',
  templateUrl: './editar-alunos-orientados.component.html',
  styleUrls: ['./editar-alunos-orientados.component.scss']
})
export class EditarAlunosOrientadosComponent implements OnInit {

    public orientacao: any;
    public statusSelecionado: any = 0;

    constructor(@Inject(MAT_DIALOG_DATA) public orientacaoId: number,
                private orientacoesService: OrientacoesService,
                private toastService: ToastService,
                private enumeratorService: EnumeratorService,
                private router: Router,
                public dialogRef: MatDialogRef<EditarAlunosOrientadosComponent>){

    }

    async ngOnInit(): Promise<void> {
      await this.buscarOrientacaoPorId();
      this.statusSelecionado = this.orientacao.statusAprovacao;
    }

    async buscarOrientacaoPorId(){
      await this.orientacoesService.ObterOrientacaoProfessorPorId(this.orientacaoId).then(result => {
        this.orientacao = result;
        
      },fail => {
        this.toastService.show('fail', "Erro ao obter Orientação!" + fail.error)
      })
    }
    salvar() {
      if(this.statusSelecionado != this.orientacao.statusAprovacao && this.statusSelecionado != 0 && this.orientacao.turma.nPoc == 1){
        this.orientacoesService.AtualizarInformacoesPOC1(this.orientacao.id, this.statusSelecionado, this.orientacao.anexoTao)
        .then(result => {
          this.toastService.show('success', "Orientação Salva com Sucesso!")
          this.dialogRef.close(); 
          
        },fail => {
          this.toastService.show('fail', "Erro ao obter Orientação!" + fail.error)
        })
      }
      else if(this.statusSelecionado != this.orientacao.statusAprovacao && this.statusSelecionado != 0 && this.orientacao.turma.nPoc == 2){
        this.orientacoesService.AtualizarInformacoesPOC2(this.orientacao.id, this.statusSelecionado, this.orientacao.anexoResumoTrabalho, this.orientacao.localDivulgacao)
        .then(result => {
          this.toastService.show('success', "Orientação Salva com Sucesso!")
          this.dialogRef.close(); 
          
        },fail => {
          this.toastService.show('fail', "Erro ao obter Orientação!" + fail.error)
        })
      }
    }
    
}
