import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pot } from '../../model/pot.entity';

@Component({
  selector: 'app-plant-status',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  template: `
    <div class="plant-status-container">
      <div class="status-header">
        <mat-icon class="status-icon" [ngClass]="getStatusIconClass()">
          {{ getStatusIcon() }}
        </mat-icon>
        <div class="status-info">
          <h3 class="status-title">{{ getStatusTitle() }}</h3>
          <p class="status-description">{{ getStatusDescription() }}</p>
        </div>
      </div>

      <div class="status-chips" *ngIf="pot.metrics">
        <mat-chip-set>
          <mat-chip
            [class]="getChipClass('humidity')"
            [matTooltip]="getTooltip('humidity')">
            <mat-icon matChipAvatar>water_drop</mat-icon>
            {{ pot.metrics.humidity }}%
          </mat-chip>

          <mat-chip
            [class]="getChipClass('battery')"
            [matTooltip]="getTooltip('battery')">
            <mat-icon matChipAvatar>battery_std</mat-icon>
            {{ pot.metrics.batteryLevel }}%
          </mat-chip>

          <mat-chip
            [class]="getChipClass('temperature')"
            [matTooltip]="getTooltip('temperature')">
            <mat-icon matChipAvatar>thermostat</mat-icon>
            {{ pot.metrics.temperature }}°C
          </mat-chip>
        </mat-chip-set>
      </div>

      <div class="recommendations" *ngIf="getRecommendations().length > 0">
        <h4>Recomendaciones:</h4>
        <ul>
          <li *ngFor="let recommendation of getRecommendations()">
            {{ recommendation }}
          </li>
        </ul>
      </div>

      <div class="last-updated" *ngIf="pot.metrics">
        <small>Última actualización: {{ getLastUpdateTime() }}</small>
      </div>
    </div>
  `,
  styles: [`
    .plant-status-container {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .status-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .status-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .status-icon.healthy {
      color: #2ecc71;
    }

    .status-icon.warning {
      color: #f39c12;
    }

    .status-icon.critical {
      color: #e74c3c;
    }

    .status-info {
      flex: 1;
    }

    .status-title {
      margin: 0 0 4px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .status-description {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .status-chips {
      margin-bottom: 20px;
    }

    .chip-healthy {
      background-color: #e8f5e8;
      color: #2ecc71;
    }

    .chip-warning {
      background-color: #fff3e0;
      color: #f39c12;
    }

    .chip-critical {
      background-color: #ffebee;
      color: #e74c3c;
    }

    .recommendations {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .recommendations h4 {
      margin: 0 0 8px 0;
      color: #296244;
      font-size: 1rem;
    }

    .recommendations ul {
      margin: 0;
      padding-left: 20px;
    }

    .recommendations li {
      margin-bottom: 4px;
      font-size: 0.9rem;
    }

    .last-updated {
      text-align: center;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 12px;
    }
  `]
})
export class PlantStatusComponent {
  @Input() pot!: Pot;

  getStatusIcon(): string {
    switch (this.pot.healthStatus) {
      case 'healthy': return 'eco';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'help';
    }
  }

  getStatusIconClass(): string {
    return this.pot.healthStatus;
  }

  getStatusTitle(): string {
    switch (this.pot.healthStatus) {
      case 'healthy': return 'Planta Saludable';
      case 'warning': return 'Necesita Atención';
      case 'critical': return 'Estado Crítico';
      default: return 'Estado Desconocido';
    }
  }

  getStatusDescription(): string {
    switch (this.pot.healthStatus) {
      case 'healthy':
        return 'Tu planta está en excelentes condiciones. Continúa con el cuidado actual.';
      case 'warning':
        return 'Tu planta necesita algunos ajustes para mantenerse saludable.';
      case 'critical':
        return 'Tu planta requiere atención inmediata para evitar daños.';
      default:
        return 'No se puede determinar el estado actual de la planta.';
    }
  }

  getChipClass(metric: string): string {
    if (!this.pot.metrics) return '';

    switch (metric) {
      case 'humidity':
        const humidity = this.pot.metrics.humidity;
        if (humidity >= 60) return 'chip-healthy';
        if (humidity >= 30) return 'chip-warning';
        return 'chip-critical';

      case 'battery':
        const battery = this.pot.metrics.batteryLevel;
        if (battery >= 70) return 'chip-healthy';
        if (battery >= 30) return 'chip-warning';
        return 'chip-critical';

      case 'temperature':
        const temp = this.pot.metrics.temperature;
        if (temp >= 18 && temp <= 26) return 'chip-healthy';
        if (temp >= 15 && temp <= 30) return 'chip-warning';
        return 'chip-critical';

      default:
        return '';
    }
  }

  getTooltip(metric: string): string {
    if (!this.pot.metrics) return '';

    switch (metric) {
      case 'humidity':
        return `Humedad del suelo: ${this.pot.metrics.humidity}%`;
      case 'battery':
        return `Nivel de batería: ${this.pot.metrics.batteryLevel}%`;
      case 'temperature':
        return `Temperatura ambiente: ${this.pot.metrics.temperature}°C`;
      default:
        return '';
    }
  }

  getRecommendations(): string[] {
    const recommendations: string[] = [];

    if (!this.pot.metrics) return recommendations;

    const { humidity, batteryLevel, temperature } = this.pot.metrics;

    if (humidity < 30) {
      recommendations.push('Regar la planta - El nivel de humedad está bajo');
    }

    if (batteryLevel < 30) {
      recommendations.push('Cargar el sensor - La batería está baja');
    }

    if (temperature > 30) {
      recommendations.push('Mover a un lugar más fresco - La temperatura es alta');
    } else if (temperature < 15) {
      recommendations.push('Mover a un lugar más cálido - La temperatura es baja');
    }

    if (this.pot.metrics.luminance < 30) {
      recommendations.push('Colocar en un lugar con más luz natural');
    }

    return recommendations;
  }

  getLastUpdateTime(): string {
    if (!this.pot.metrics) return 'Sin datos';

    const now = new Date();
    const lastUpdate = this.pot.metrics.timestamp;
    const diffMinutes = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));

    if (diffMinutes < 1) return 'Hace menos de un minuto';
    if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Hace ${diffHours} horas`;

    const diffDays = Math.floor(diffHours / 24);
    return `Hace ${diffDays} días`;
  }
}
