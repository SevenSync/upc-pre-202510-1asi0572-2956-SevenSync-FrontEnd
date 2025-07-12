// src/app/arm/components/pot-card/pot-card.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importamos Router

// Angular Material & Shared
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Modelos y Pipes
import { Pot } from '../../model/pot.entity';
import { PotStatusPipe } from '../../../pipes/pot-status.pipe';
import { PotStatusToClassPipe } from '../../../pipes/pot-status-to-class.pipe';
import { NeedsWateringPipe } from '../../../pipes/needs-watering.pipe';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';

@Component({
  selector: 'app-pot-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    RelativeTimePipe,
    PotStatusPipe,
    PotStatusToClassPipe,
    NeedsWateringPipe,
    // ✅ Importamos todos los pipes que usaremos en la plantilla
  ],
  // ✅ Apuntamos a archivos externos para la plantilla y los estilos
  templateUrl: './pot-card.component.html',
  styleUrl: './pot-card.component.css'
})
export class PotCardComponent {
  // --- Entradas y Salidas ---
  @Input() pot!: Pot;
  @Output() waterPlant = new EventEmitter<number>();

  // ❗️ Ya no necesitamos un evento para 'viewDetails', lo manejaremos directamente aquí

  // ✅ Inyectamos Router para la navegación
  constructor(private router: Router) {}

  // ❗️ TODA la lógica de 'get...' ha sido eliminada.

  // --- Manejadores de Eventos ---
  onWaterPlant(event: MouseEvent): void {
    event.stopPropagation(); // Evita que el clic se propague a la tarjeta
    this.waterPlant.emit(this.pot.id);
  }

  onViewDetails(): void {
    // Navegamos directamente a la página de detalles
    this.router.navigate(['/arm/pots', this.pot.id]);
  }
}
