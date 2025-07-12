// src/app/arm/components/pot-metrics/pot-metrics.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // ✅ Importamos DatePipe

// Angular Material & Shared
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

// Modelos y Pipes
import { Pot } from '../../model/pot.entity'; // ✅ Usa nuestro modelo plano
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe'; // ✅ Para la fecha

@Component({
  selector: 'app-pot-metrics',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  templateUrl: './pot-metrics.component.html',
  styleUrl: './pot-metrics.component.css'
})
export class PotMetricsComponent {
  // ✅ El componente ahora recibe el objeto 'Pot' completo.
  @Input() pot!: Pot;

  // ❗️ ¡Toda la lógica de 'get...', 'format...' y 'getProgress...' ha sido eliminada!
}
