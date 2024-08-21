import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enviar-tao-dialog',
  templateUrl: './enviar-tao-dialog.component.html',
  styleUrls: ['./enviar-tao-dialog.component.scss'],
  providers: [DatePipe]
})
export class EnviarTaoDialogComponent {
  dataEnvioFormatada: string;
  linkTao: string = '';

  constructor(
    public dialogRef: MatDialogRef<EnviarTaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { dataEnvio: Date },
    private datePipe: DatePipe
  ) {
    // Formata a data recebida
    this.dataEnvioFormatada = this.datePipe.transform(data.dataEnvio, 'dd/MM/yyyy - HH:mm') || '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({ linkTao: this.linkTao });
  }
}
