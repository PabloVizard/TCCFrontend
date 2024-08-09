
import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-banca-defesa',
  templateUrl: './banca-defesa.component.html',
  styleUrls: ['./banca-defesa.component.scss']
})
export class BancaDefesaComponent {
  numeroOficio = '23114.922923';
  ano = '2023';
  dataAtual = '13 de dezembro de 2023';
  destinatario = 'Sérgio Henrique Nogueira';
  nomeAluno = 'Rafael de Assis Garibaldi';
  matriculaAluno = '3041';
  tituloProjeto = 'Crow Search Algorithm Aplicado à Otimização Robusta';
  area = 'Otimização';
  dataDefesa = '13 de dezembro de 2023';
  nomeOrientador = 'Marcus Henrique Soares Mendes';
  matriculaOrientador = '8436-0/UFV';
  nomeProfessora = 'Maria Amélia Lopes Silva';
  matriculaProfessora = '8717-3/UFV';

  gerarPDF() {
    const documentDefinition: any = {
      content: [
        { text: `Ofício nº ${this.numeroOficio}/${this.ano}/IEF`, style: 'header' },
        { text: `Florestal, ${this.dataAtual}`, alignment: 'right' },
        { text: `\n${this.destinatario}`, style: 'subheader' },
        { text: `\nSenhor Chefe do Instituto de Ciências Exatas e Tecnológicas,\n`, style: 'normal' },
        {
          text: `Solicito, por gentileza, o ato de nomeação da banca do Trabalho de Conclusão de Curso de ${this.nomeAluno} (matrícula ${this.matriculaAluno}), estudante do Curso de Ciência da Computação, intitulado "${this.tituloProjeto}" na área ${this.area}. A banca foi realizada no dia ${this.dataDefesa}, sendo presidida pelo professor orientador ${this.nomeOrientador}, matrícula ${this.matriculaOrientador} e composta pela professora ${this.nomeProfessora}, matrícula ${this.matriculaProfessora}.`,
          style: 'normal'
        },
        { text: '\nAtenciosamente,', style: 'normal' }
      ],
      styles: {
        header: { fontSize: 16, bold: true },
        subheader: { fontSize: 12, bold: true },
        normal: { fontSize: 12 }
      }
    };

    pdfMake.createPdf(documentDefinition).download('relatorio.pdf');
  }
}