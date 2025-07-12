// src/app/pipes/pot-status.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
// Importamos el enum
import { PotStatus } from '../arm/model/pot.entity'; // Ajusta la ruta

@Pipe({
  name: 'potStatus',
  standalone: true
})
export class PotStatusPipe implements PipeTransform {
  transform(value: PotStatus | undefined | null): string {
    // Verificamos si el valor es un número (incluido el 0)
    if (value === undefined || value === null) return 'Desconocido';

    // Usamos el enum para la comparación, lo que hace el código muy legible
    switch (value) {
      case PotStatus.Healthy: return 'Saludable';
      case PotStatus.Warning: return 'Necesita atención';
      case PotStatus.Critical: return 'Crítico';
      case PotStatus.Deleted: return 'Eliminado';
      default: return 'Desconocido';
    }
  }
}
