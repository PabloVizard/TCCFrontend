import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BancasFullModel } from 'src/app/core/models/bancas-model';

@Component({
  selector: 'app-gerar-documento',
  templateUrl: './gerar-documento.component.html',
  styleUrls: ['./gerar-documento.component.scss']
})
export class GerarDocumentoComponent {
  banca: BancasFullModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { banca: BancasFullModel }) {
    this.banca = data.banca;
  }

  formatarDocumento(): string {
    const alunoNome = this.banca.alunoOrientado?.nomeCompleto || '';
    const alunoMatricula = this.banca.alunoOrientado?.matricula || '';
    const projetoNome = this.banca.projeto?.nome || '';
    const projetoArea = this.banca.projeto?.area || '';
    const ano = this.banca.ano || '';
    const dataDefesa = this.banca.dataDefesa ? 
    this.formatarData(new Date(this.banca.dataDefesa)) : ' - ';
    const professorOrientador = this.banca.professorOrientador?.nomeCompleto || '';
    const avaliador01 = this.banca.avaliador01?.nomeCompleto || '';
    const avaliador01Matricula = this.banca.avaliador01?.matricula || '';

    return `
      Ofício no /${ano}/IEF

      Florestal, ${dataDefesa}.

      Senhor Chefe do Instituto de Ciências Exatas e Tecnológicas,

      Solicito, por gentileza, o ato de nomeação da banca do Trabalho de Conclusão de Curso de ${alunoNome} (matrícula ${alunoMatricula}), estudante do Curso de Ciência da Computação, intitulado "${projetoNome}" na área ${projetoArea}. A banca foi realizada no dia ${dataDefesa}, sendo presidida pelo professor orientador ${professorOrientador}, matrícula 8436-0/UFV e composta pelo(a) professor(a) ${avaliador01}, matrícula ${avaliador01Matricula}/UFV
      
      
      Atenciosamente,


      Ao Senhor
      Sérgio Henrique Nogueira

      -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      Aos ${dataDefesa} reuniu-se em sala virtual utilizando o Google Meet, a banca composta por ${professorOrientador} (IEF) e ${avaliador01} (IEF), para avaliar o trabalho de conclusão de curso de autoria do(a) bacharelando(a): ${alunoNome}, matrícula ${alunoMatricula}. 
      
      Intitulado: “${projetoNome}”. 
      
      Após apresentação pelo(a) bacharelando(a) e arguição dos membros, o trabalho foi aprovado com correções, sendo feita a comunicação da aprovação. Em seguida, eu, ${professorOrientador} (presidente da banca), lavrei a presente ata que, se estiver de acordo, deverá ser assinada pelos membros da banca e pelo(a) bacharelando(a).`;
  }
  formatarData(data: Date): string {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return formatter.format(data);
  }
}
