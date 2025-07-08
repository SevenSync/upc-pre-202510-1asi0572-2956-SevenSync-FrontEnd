import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Pot } from '../../model/pot.entity';

@Component({
  selector: 'app-pot-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <mat-card class="pot-card"
              [class.status-healthy]="pot.healthStatus === 'healthy'"
              [class.status-warning]="pot.healthStatus === 'warning'"
              [class.status-critical]="pot.healthStatus === 'critical'">

      <div class="pot-image-container">
        <img [src]="'demoplant.png'"
             [alt]="pot.name"
             class="pot-image" />
        <div class="status-overlay">
          <div class="status-indicator" [style.background-color]="getStatusColor()">
            <span class="status-text">{{ getStatusText() }}</span>
          </div>
        </div>
      </div>

      <mat-card-header class="pot-header">
        <div class="pot-info">
          <mat-card-title class="pot-name">{{ pot.name }}</mat-card-title>
          <mat-card-subtitle class="pot-location">{{ pot.location }}</mat-card-subtitle>
        </div>
      </mat-card-header>

      <mat-card-content class="pot-content" *ngIf="pot.metrics">
        <div class="metrics-grid">
          <div class="metric">
            <div class="metric-header">
              <mat-icon class="metric-icon">water_drop</mat-icon>
              <span class="metric-label">Humedad</span>
            </div>
            <div class="metric-value">
              <span class="value" [style.color]="getHumidityColor()">{{ pot.metrics.humidity }}%</span>
              <mat-progress-bar
                mode="determinate"
                [value]="pot.metrics.humidity"
                [color]="getHumidityProgressColor()">
              </mat-progress-bar>
            </div>
          </div>

          <div class="metric">
            <div class="metric-header">
              <mat-icon class="metric-icon">thermostat</mat-icon>
              <span class="metric-label">Temperatura</span>
            </div>
            <div class="metric-value">
              <span class="value">{{ pot.metrics.temperature }}°C</span>
            </div>
          </div>

          <div class="metric">
            <div class="metric-header">
              <mat-icon class="metric-icon">wb_sunny</mat-icon>
              <span class="metric-label">Luz</span>
            </div>
            <div class="metric-value">
              <span class="value">{{ pot.metrics.luminance }}%</span>
              <mat-progress-bar
                mode="determinate"
                [value]="pot.metrics.luminance"
                color="accent">
              </mat-progress-bar>
            </div>
          </div>

          <div class="metric">
            <div class="metric-header">
              <mat-icon class="metric-icon">battery_std</mat-icon>
              <span class="metric-label">Batería</span>
            </div>
            <div class="metric-value">
              <span class="value" [style.color]="getBatteryColor()">{{ pot.metrics.batteryLevel }}%</span>
              <mat-progress-bar
                mode="determinate"
                [value]="pot.metrics.batteryLevel"
                [color]="getBatteryProgressColor()">
              </mat-progress-bar>
            </div>
          </div>
        </div>

        <div class="watering-info">
          <div class="watering-item">
            <span class="label">Último riego:</span>
            <span class="value">{{ getLastWateredText() }}</span>
          </div>
          <div class="watering-item">
            <span class="label">Próximo riego:</span>
            <span class="value" [class.urgent]="pot.needsWatering">
              {{ getNextWateringText() }}
            </span>
          </div>
        </div>
      </mat-card-content>

      <mat-card-actions class="pot-actions">
        <button
          mat-button
          class="water-button"
          (click)="onWaterPlant()"
          [disabled]="!pot.needsWatering">
          <mat-icon>water_drop</mat-icon>
          Regar ahora
        </button>
        <button mat-button class="details-button" (click)="onViewDetails()">
          <mat-icon>visibility</mat-icon>
          Ver detalles
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './pot-card.component.css'
})
export class PotCardComponent {
  @Input() pot!: Pot;
  @Output() waterPlant = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<number>();

  getStatusColor(): string {
    switch (this.pot.healthStatus) {
      case 'healthy': return '#2ecc71';
      case 'warning': return '#f39c12';
      case 'critical': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  getStatusText(): string {
    switch (this.pot.healthStatus) {
      case 'healthy': return 'Saludable';
      case 'warning': return 'Necesita atención';
      case 'critical': return 'Crítico';
      default: return 'Desconocido';
    }
  }

  getHumidityColor(): string {
    if (!this.pot.metrics) return '#666';
    const humidity = this.pot.metrics.humidity;
    if (humidity >= 60) return '#2ecc71';
    if (humidity >= 30) return '#f39c12';
    return '#e74c3c';
  }

  getHumidityProgressColor(): 'primary' | 'accent' | 'warn' {
    if (!this.pot.metrics) return 'primary';
    const humidity = this.pot.metrics.humidity;
    if (humidity >= 60) return 'primary';
    if (humidity >= 30) return 'accent';
    return 'warn';
  }

  getBatteryColor(): string {
    if (!this.pot.metrics) return '#666';
    const battery = this.pot.metrics.batteryLevel;
    if (battery >= 70) return '#2ecc71';
    if (battery >= 30) return '#f39c12';
    return '#e74c3c';
  }

  getBatteryProgressColor(): 'primary' | 'accent' | 'warn' {
    if (!this.pot.metrics) return 'primary';
    const battery = this.pot.metrics.batteryLevel;
    if (battery >= 70) return 'primary';
    if (battery >= 30) return 'accent';
    return 'warn';
  }

  getLastWateredText(): string {
    if (this.pot.lastWatered) {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - this.pot.lastWatered.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return 'Ayer';
      if (diffDays === 0) return 'Hoy';
      return `Hace ${diffDays} días`;
    }
    return 'Sin datos';
  }

  getNextWateringText(): string {
    if (!this.pot.metrics) return 'Sin datos';

    if (this.pot.needsWatering) {
      if (this.pot.metrics.humidity < 20) return 'Urgente';
      return 'Hoy';
    }

    return 'En 2-3 días';
  }

  onWaterPlant(): void {
    this.waterPlant.emit(this.pot.id);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.pot.id);
  }
}
