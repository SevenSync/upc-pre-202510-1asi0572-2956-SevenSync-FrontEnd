import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: Date | string | undefined | null): string {
    if (!value) return 'Sin datos';

    const date = typeof value === 'string' ? new Date(value) : value;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());

    const diffSeconds = Math.floor(diffTime / 1000);
    if (diffSeconds < 60) return 'Ahora mismo';

    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffMinutes < 60) return `Hace ${diffMinutes} min`;

    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 24) return `Hace ${diffHours} h`;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Ayer';
    return `Hace ${diffDays} días`;
  }
}
