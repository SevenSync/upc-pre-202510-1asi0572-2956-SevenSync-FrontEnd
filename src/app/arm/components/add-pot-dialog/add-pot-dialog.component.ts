import { Component } from '@angular/core';

// Angular Material Modules
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-pot-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-pot-dialog.component.html',
  styleUrl: './add-pot-dialog.component.css'
})
export class AddPotDialogComponent {

  // Inyectamos una referencia a este mismo diálogo para poder controlarlo (cerrarlo).
  constructor(public dialogRef: MatDialogRef<AddPotDialogComponent>) {}

  /**
   * Cierra el diálogo y devuelve el método de conexión elegido por el usuario.
   * @param result - La opción seleccionada: 'bluetooth' o 'manual'.
   */
  closeDialog(result: 'bluetooth' | 'manual'): void {
    this.dialogRef.close(result);
  }

  /**
   * Cierra el diálogo sin devolver ningún resultado, lo que equivale a cancelar.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
