import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Pot, PotMetrics } from '../../model/pot.entity';

@Component({
  selector: 'app-pot-metrics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule
  ],
  template: `
    <div class="metrics-container">
      <div class="metrics-header">
        <h3>Métricas en Tiempo Real</h3>
        <button mat-icon-button (click)="onRefresh()" [matTooltip]="'Actualizar datos'">
          <mat-icon>refresh</mat-icon>
        </button>
      </div>

      <div class="metrics-grid" *ngIf="pot.metrics; else noMetrics">
        <!-- Humedad -->
        <mat-card class="metric-card">
          <mat-card-header>
            <div mat-card-avatar class="metric-avatar humidity">
              <mat-icon>water_drop</mat-icon>
            </div>
            <mat-card-title>Humedad</mat-card-title>
            <mat-card-subtitle>{{ pot.metrics.humidity }}%</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-progress-bar
              mode="determinate"
              [value]="pot.metrics.humidity"
              [color]="getProgressColor('humidity')">
            </mat-progress-bar>
            <div class="metric-status">
              <span [ngClass]="getStatusClass('humidity')">
                {{ getStatusText('humidity') }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Temperatura -->
        <mat-card class="metric-card">
          <mat-card-header>
            <div mat-card-avatar class="metric-avatar temperature">
              <mat-icon>thermostat</mat-icon>
            </div>
            <mat-card-title>Temperatura</mat-card-title>
            <mat-card-subtitle>{{ pot.metrics.temperature }}°C</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-progress-bar
              mode="determinate"
              [value]="getTemperaturePercentage()"
              [color]="getProgressColor('temperature')">
            </mat-progress-bar>
            <div class="metric-status">
              <span [ngClass]="getStatusClass('temperature')">
                {{ getStatusText('temperature') }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Luminosidad -->
        <mat-card class="metric-card">
          <mat-card-header>
            <div mat-card-avatar class="metric-avatar light">
              <mat-icon>wb_sunny</mat-icon>
            </div>
            <mat-card-title>Luz</mat-card-title>
            <mat-card-subtitle>{{ pot.metrics.luminance }}%</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-progress-bar
              mode="determinate"
              [value]="pot.metrics.luminance"
              color="accent">
            </mat-progress-bar>
            <div class="metric-status">
              <span [ngClass]="getStatusClass('light')">
                {{ getStatusText('light') }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Batería -->
        <mat-card class="metric-card">
          <mat-card-header>
            <div mat-card-avatar class="metric-avatar battery">
              <mat-icon>battery_std</mat-icon>
            </div>
            <mat-card-title>Batería</mat-card-title>
            <mat-card-subtitle>{{ pot.metrics.batteryLevel }}%</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-progress-bar
              mode="determinate"
              [value]="pot.metrics.batteryLevel"
              [color]="getProgressColor('battery')">
            </mat-progress-bar>
            <div class="metric-status">
              <span [ngClass]="getStatusClass('battery')">
                {{ getStatusText('battery') }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- pH -->
        <mat-card class="metric-card">
          <mat-card-header>
            <div mat-card-avatar class="metric-avatar ph">
              <mat-icon>science</mat-icon>
            </div>
            <mat-card-title>pH del Suelo</mat-card-title>
            <mat-card-subtitle>{{ pot.metrics.ph.toFixed(1) }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-progress-bar
              mode="determinate"
              [value]="getPhPercentage()"
              [color]="getProgressColor('ph')">
            </mat-progress-bar>
            <div class="metric-status">
              <span [ngClass]="getStatusClass('ph')">
                {{ getStatusText('ph') }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Salinidad -->
        <mat-card class="metric-card">
          <mat-card-header>
            <div mat-card-avatar class="metric-avatar salinity">
              <mat-icon>grain</mat-icon>
            </div>
            <mat-card-title>Salinidad</mat-card-title>
            <mat-card-subtitle>{{ pot.metrics.salinity.toFixed(2) }} ppm</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mat-progress-bar
              mode="determinate"
              [value]="getSalinityPercentage()"
              [color]="getProgressColor('salinity')">
            </mat-progress-bar>
            <div class="metric-status">
              <span [ngClass]="getStatusClass('salinity')">
                {{ getStatusText('salinity') }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <ng-template #noMetrics>
        <div class="no-metrics">
          <mat-icon>sensors_off</mat-icon>
          <h4>Sin datos de sensores</h4>
          <p>No se han recibido datos de los sensores de esta maceta.</p>
          <button mat-raised-button color="primary" (click)="onRefresh()">
            Intentar nuevamente
          </button>
        </div>
      </ng-template>

      <div class="last-update" *ngIf="pot.metrics">
        <small>Última actualización: {{ getLastUpdateTime() }}</small>
      </div>
    </div>
  `,
  styles: [`
    .metrics-container {
      width: 100%;
    }

    .metrics-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .metrics-header h3 {
      margin: 0;
      color: #296244;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .metric-card {
      border-radius: 12px;
    }

    .metric-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: white;
    }

    .metric-avatar.humidity { background-color: #2196f3; }
    .metric-avatar.temperature { background-color: #ff9800; }
    .metric-avatar.light { background-color: #ffc107; }
    .metric-avatar.battery { background-color: #4caf50; }
    .metric-avatar.ph { background-color: #9c27b0; }
    .metric-avatar.salinity { background-color: #795548; }

    .metric-status {
      margin-top: 8px;
      text-align: center;
    }

    .status-optimal { color: #2ecc71; font-weight: 500; }
    .status-good { color: #2ecc71; }
    .status-warning { color: #f39c12; font-weight: 500; }
    .status-critical { color: #e74c3c; font-weight: 500; }

    .no-metrics {
      text-align: center;
      padding: 40px 20px;
      color: #666;
    }

    .no-metrics mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .last-update {
      text-align: center;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 12px;
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PotMetricsComponent implements OnInit {
  @Input() pot!: Pot;
  @Output() refresh = new EventEmitter<void>();

  ngOnInit(): void {
    // Auto-refresh every 5 minutes
    setInterval(() => {
      this.onRefresh();
    }, 5 * 60 * 1000);
  }

  onRefresh(): void {
    this.refresh.emit();
  }

  getProgressColor(metric: string): 'primary' | 'accent' | 'warn' {
    const status = this.getStatusClass(metric);
    if (status.includes('critical')) return 'warn';
    if (status.includes('warning')) return 'accent';
    return 'primary';
  }

  getStatusClass(metric: string): string {
    if (!this.pot.metrics) return '';

    switch (metric) {
      case 'humidity':
        const humidity = this.pot.metrics.humidity;
        if (humidity >= 60) return 'status-optimal';
        if (humidity >= 40) return 'status-good';
        if (humidity >= 20) return 'status-warning';
        return 'status-critical';

      case 'temperature':
        const temp = this.pot.metrics.temperature;
        if (temp >= 20 && temp <= 25) return 'status-optimal';
        if (temp >= 18 && temp <= 28) return 'status-good';
        if (temp >= 15 && temp <= 32) return 'status-warning';
        return 'status-critical';

      case 'light':
        const light = this.pot.metrics.luminance;
        if (light >= 60) return 'status-optimal';
        if (light >= 40) return 'status-good';
        if (light >= 20) return 'status-warning';
        return 'status-critical';

      case 'battery':
        const battery = this.pot.metrics.batteryLevel;
        if (battery >= 70) return 'status-optimal';
        if (battery >= 50) return 'status-good';
        if (battery >= 20) return 'status-warning';
        return 'status-critical';

      case 'ph':
        const ph = this.pot.metrics.ph;
        if (ph >= 6.0 && ph <= 7.0) return 'status-optimal';
        if (ph >= 5.5 && ph <= 7.5) return 'status-good';
        if (ph >= 5.0 && ph <= 8.0) return 'status-warning';
        return 'status-critical';

      case 'salinity':
        const salinity = this.pot.metrics.salinity;
        if (salinity <= 1.5) return 'status-optimal';
        if (salinity <= 2.5) return 'status-good';
        if (salinity <= 4.0) return 'status-warning';
        return 'status-critical';

      default:
        return '';
    }
  }

  getStatusText(metric: string): string {
    const statusClass = this.getStatusClass(metric);

    switch (statusClass) {
      case 'status-optimal': return 'Óptimo';
      case 'status-good': return 'Bueno';
      case 'status-warning': return 'Atención';
      case 'status-critical': return 'Crítico';
      default: return 'Sin datos';
    }
  }

  getTemperaturePercentage(): number {
    if (!this.pot.metrics) return 0;
    // Convert temperature to percentage (0-40°C range)
    return Math.min(Math.max((this.pot.metrics.temperature / 40) * 100, 0), 100);
  }

  getPhPercentage(): number {
    if (!this.pot.metrics) return 0;
    // Convert pH to percentage (0-14 range)
    return (this.pot.metrics.ph / 14) * 100;
  }

  getSalinityPercentage(): number {
    if (!this.pot.metrics) return 0;
    // Convert salinity to percentage (0-5 ppm range for visualization)
    return Math.min((this.pot.metrics.salinity / 5) * 100, 100);
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
