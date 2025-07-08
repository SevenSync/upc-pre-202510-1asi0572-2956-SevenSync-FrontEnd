import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import {Pot, PotMetrics} from '../../model/pot.entity';

@Component({
  selector: 'app-pot-metrics',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <div class="metrics-container" *ngIf="metrics">
      <div class="metrics-grid">
        <div class="metric-card humidity">
          <div class="metric-header">
            <mat-icon>water_drop</mat-icon>
            <span class="metric-title">Humedad del Suelo</span>
          </div>
          <div class="metric-value">
            <span class="value" [class]="metrics.humidityStatus">{{ metrics.humidity }}%</span>
            <mat-progress-bar mode="determinate" [value]="metrics.humidity"
                              [color]="getProgressColor(metrics.humidityStatus)">
            </mat-progress-bar>
            <span class="status-text">{{ getStatusText(metrics.humidityStatus) }}</span>
          </div>
        </div>

        <div class="metric-card temperature">
          <div class="metric-header">
            <mat-icon>thermostat</mat-icon>
            <span class="metric-title">Temperatura</span>
          </div>
          <div class="metric-value">
            <span class="value" [class]="metrics.temperatureStatus">{{ metrics.temperature }}°C</span>
            <span class="status-text">{{ getStatusText(metrics.temperatureStatus) }}</span>
          </div>
        </div>

        <div class="metric-card light">
          <div class="metric-header">
            <mat-icon>wb_sunny</mat-icon>
            <span class="metric-title">Luminosidad</span>
          </div>
          <div class="metric-value">
            <span class="value" [class]="metrics.lightStatus">{{ metrics.luminance }}%</span>
            <mat-progress-bar mode="determinate" [value]="metrics.luminance" color="accent">
            </mat-progress-bar>
            <span class="status-text">{{ getStatusText(metrics.lightStatus) }}</span>
          </div>
        </div>

        <div class="metric-card battery">
          <div class="metric-header">
            <mat-icon>battery_std</mat-icon>
            <span class="metric-title">Batería</span>
          </div>
          <div class="metric-value">
            <span class="value" [class]="metrics.batteryStatus">{{ metrics.batteryLevel }}%</span>
            <mat-progress-bar mode="determinate" [value]="metrics.batteryLevel"
                              [color]="getProgressColor(metrics.batteryStatus)">
            </mat-progress-bar>
            <span class="status-text">{{ getStatusText(metrics.batteryStatus) }}</span>
          </div>
        </div>
      </div>

      <div class="additional-metrics">
        <h3>Métricas Adicionales</h3>
        <div class="metric-row">
          <span class="label">pH del Suelo:</span>
          <span class="value">{{ metrics.ph }}</span>
        </div>
        <div class="metric-row">
          <span class="label">Salinidad:</span>
          <span class="value">{{ metrics.salinity }}</span>
        </div>
        <div class="metric-row">
          <span class="label">Nivel de Agua:</span>
          <span class="value">{{ metrics.waterLevel }}%</span>
        </div>
        <div class="metric-row">
          <span class="label">Última Actualización:</span>
          <span class="value">{{ formatTimestamp(metrics.timestamp) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metrics-container { padding: 20px; }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }
    .metric-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #e0e0e0;
    }
    .metric-card.humidity { border-left-color: #3498db; }
    .metric-card.temperature { border-left-color: #e74c3c; }
    .metric-card.light { border-left-color: #f39c12; }
    .metric-card.battery { border-left-color: #9b59b6; }
    .metric-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }
    .metric-title {
      font-weight: 600;
      color: #333;
    }
    .metric-value {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .value {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
    }
    .value.optimal, .value.good { color: #2ecc71; }
    .value.low, .value.hot, .value.high { color: #f39c12; }
    .value.critical, .value.cold { color: #e74c3c; }
    .status-text {
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
    }
    .additional-metrics {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 20px;
    }
    .additional-metrics h3 {
      margin: 0 0 16px 0;
      color: #333;
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e9ecef;
    }
    .metric-row:last-child { border-bottom: none; }
    .label { color: #666; font-weight: 500; }
    .value { font-weight: 600; color: #333; }
  `]
})
export class PotMetricsComponent {
  @Input() metrics!: PotMetrics;

  getProgressColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'optimal':
      case 'good':
        return 'primary';
      case 'low':
      case 'hot':
      case 'high':
        return 'accent';
      case 'critical':
      case 'cold':
        return 'warn';
      default:
        return 'primary';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'optimal': return 'Óptimo';
      case 'good': return 'Bueno';
      case 'low': return 'Bajo';
      case 'high': return 'Alto';
      case 'hot': return 'Caliente';
      case 'cold': return 'Frío';
      case 'critical': return 'Crítico';
      default: return 'Normal';
    }
  }

  formatTimestamp(timestamp: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  }
}
