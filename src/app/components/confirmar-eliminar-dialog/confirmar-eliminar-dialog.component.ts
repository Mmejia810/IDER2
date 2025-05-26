import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar-dialog',
  templateUrl: './confirmar-eliminar-dialog.component.html'
})
export class ConfirmarEliminarDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmarEliminarDialogComponent>) {}

  onCancelar(): void {
    this.dialogRef.close(false);
  }

  onConfirmar(): void {
    this.dialogRef.close(true);
  }
}
