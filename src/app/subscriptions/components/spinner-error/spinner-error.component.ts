import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-spinner-error',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './spinner-error.component.html',
  styleUrls: ['./spinner-error.component.css']
})
export class SpinnerErrorComponent {
  /** Mostrar spinner de carga */
  @Input() isLoading = false;

  /** Mensaje de error; si está definido, muestra el error */
  @Input() errorMsg?: string;
}
