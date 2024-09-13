import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'banca-defesa',
  templateUrl: './banca-defesa.component.html', // Atualizado para usar o arquivo HTML
  styleUrls: ['./banca-defesa.component.scss']// Certifique-se de que o caminho está correto
})
export class BancaDefesaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { texto: string }) {}

  onClose(): void {
    // Fecha o modal
  }
}
