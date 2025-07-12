import { Pipe, PipeTransform } from '@angular/core';
import { Pot } from '../arm'; // Asegúrate de que la ruta sea correcta

@Pipe({
  name: 'needsWatering',
  standalone: true
})
export class NeedsWateringPipe implements PipeTransform {
  transform(pot: Pot | undefined | null): boolean {
    if (!pot) {
      return false;
    }
    // La lógica es que necesita agua si la humedad es menor a 30%
    return pot.humidity < 30;
  }
}
