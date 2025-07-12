// src/app/pipes/pot-status-to-class.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { PotStatus } from '../arm/model/pot.entity'; // Ajusta la ruta

@Pipe({
  name: 'potStatusToClass',
  standalone: true
})
export class PotStatusToClassPipe implements PipeTransform {
  transform(value: PotStatus | undefined | null): string {
    if (value === undefined || value === null) return '';

    switch (value) {
      case PotStatus.Healthy: return 'healthy';
      case PotStatus.Warning: return 'warning';
      case PotStatus.Critical: return 'critical';
      case PotStatus.Deleted: return 'deleted';
      default: return '';
    }
  }
}
