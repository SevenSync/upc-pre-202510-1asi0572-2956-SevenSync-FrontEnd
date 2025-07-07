import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { PotMetricsComponent } from '../../components/pot-metrics/pot-metrics.component';
import { PlantStatusComponent } from '../../components/plant-status/plant-status.component';
import { PotService } from '../../services/pot.service';
import { Pot, PotMetrics } from '../../model/pot.entity';

@Component({
  selector: 'app-pot-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    ToolbarComponent,
    PotMetricsComponent,
    PlantStatusComponent
  ],
  template: `
    <app-toolbar></app-toolbar>

    <div class="pot-details-container">
      <div class="header-section">
        <button mat-icon-button (click)="goBack()" class="back-button">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <div class="pot-info" *ngIf="pot">
          <h1 class="pot-name">{{ pot.name }}</h1>
          <p class="pot-location">
            <mat-icon>location_on</mat-icon>
            {{ pot.location }}
          </p>
        </div>
        <div class="header-actions" *ngIf="pot">
          <button mat-raised-button color="primary"
                  (click)="waterPot()"
                  [disabled]="!pot.needsWatering">
            <mat-icon>water_drop</mat-icon>
            Regar ahora
          </button>
          <button mat-button (click)="openSettings()">
            <mat-icon>settings</mat-icon>
            Configurar
          </button>
        </div>
      </div>

      <div class="content-wrapper" *ngIf="pot; else loading">
        <mat-tab-group animationDuration="200ms">
          <!-- Tab: Estado Actual -->
          <mat-tab label="Estado Actual">
            <div class="tab-content">
              <div class="status-overview">
                <app-plant-status [pot]="pot"></app-plant-status>
              </div>

              <div class="quick-actions">
                <mat-card>
                  <mat-card-header>
                    <mat-card-title>Acciones Rápidas</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="actions-grid">
                      <button mat-raised-button color="primary"
                              (click)="waterPot()"
                              [disabled]="!pot.needsWatering">
                        <mat-icon>water_drop</mat-icon>
                        Regar
                      </button>
                      <button mat-raised-button (click)="refreshData()">
                        <mat-icon>refresh</mat-icon>
                        Actualizar
                      </button>
                      <button mat-raised-button (click)="viewHistory()">
                        <mat-icon>history</mat-icon>
                        Historial
                      </button>
                      <button mat-raised-button (click)="generateReport()">
                        <mat-icon>assessment</mat-icon>
                        Reporte
                      </button>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Tab: Métricas Detalladas -->
          <mat-tab label="Métricas">
            <div class="tab-content">
              <app-pot-metrics [pot]="pot" (refresh)="refreshData()"></app-pot-metrics>
            </div>
          </mat-tab>

          <!-- Tab: Configuración -->
          <mat-tab label="Configuración">
            <div class="tab-content">
              <div class="settings-section">
                <mat-card>
                  <mat-card-header>
                    <mat-card-title>Información de la Maceta</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="info-grid">
                      <div class="info-item">
                        <strong>ID del Dispositivo:</strong>
                        <span>{{ pot.deviceId || 'No asignado' }}</span>
                      </div>
                      <div class="info-item">
                        <strong>Estado:</strong>
                        <span class="status-badge" [ngClass]="getStatusClass()">
                          {{ getStatusText() }}
                        </span>
                      </div>
                      <div class="info-item">
                        <strong>Planta Asignada:</strong>
                        <span>{{ pot.hasPlant ? 'Sí' : 'No asignada' }}</span>
                      </div>
                      <div class="info-item">
                        <strong>Último Riego:</strong>
                        <span>{{ getLastWateredText() }}</span>
                      </div>
                    </div>
                  </mat-card-content>
                  <mat-card-actions>
                    <button mat-button (click)="editPotInfo()">
                      <mat-icon>edit</mat-icon>
                      Editar Información
                    </button>
                    <button mat-button color="warn" (click)="unlinkPot()">
                      <mat-icon>link_off</mat-icon>
                      Desvincular Maceta
                    </button>
                  </mat-card-actions>
                </mat-card>

                <mat-card>
                  <mat-card-header>
                    <mat-card-title>Configuración de Alertas</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <div class="alert-settings">
                      <p>Configura cuando recibir notificaciones sobre esta maceta.</p>
                      <!-- Aquí puedes agregar controles para configurar alertas -->
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>

      <ng-template #loading>
        <div class="loading-container">
          <mat-icon class="loading-icon">eco</mat-icon>
          <p>Cargando información de la maceta...</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .pot-details-container {
      background-color: #eef3ef;
      min-height: 100vh;
      padding: 0;
    }

    .header-section {
      padding: 20px 40px;
      background: white;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .back-button {
      color: #296244;
    }

    .pot-info {
      flex: 1;
    }

    .pot-name {
      margin: 0 0 8px 0;
      color: #296244;
      font-size: 1.8rem;
      font-weight: 600;
    }

    .pot-location {
      margin: 0;
      color: #666;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pot-location mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 40px;
    }

    .tab-content {
      padding: 20px 0;
    }

    .status-overview {
      margin-bottom: 20px;
    }

    .quick-actions {
      margin-bottom: 20px;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .actions-grid button {
      height: 60px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .settings-section {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item strong {
      color: #296244;
      font-size: 0.9rem;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      display: inline-block;
      width: fit-content;
    }

    .status-badge.active {
      background-color: #e8f5e8;
      color: #2ecc71;
    }

    .status-badge.inactive {
      background-color: #fff3e0;
      color: #f39c12;
    }

    .status-badge.maintenance {
      background-color: #ffebee;
      color: #e74c3c;
    }

    .alert-settings {
      color: #666;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400px;
      color: #666;
    }

    .loading-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      opacity: 0.5;
      color: #2ecc71;
    }

    @media (max-width: 768px) {
      .header-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        padding: 16px 20px;
      }

      .header-actions {
        width: 100%;
        justify-content: stretch;
      }

      .content-wrapper {
        padding: 16px 20px;
      }

      .actions-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PotDetailsComponent implements OnInit {
  pot: Pot | null = null;
  potId: number = 0;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private potService: PotService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.potId = +params['id'];
      if (this.potId) {
        this.loadPotDetails();
      }
    });
  }

  loadPotDetails(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.potService.getPot(this.potId, token).subscribe({
      next: (potData) => {
        this.isLoading = false;
        this.pot = new Pot(
          potData.id,
          potData.name,
          potData.location,
          potData.status,
          potData.deviceId,
          potData.assignedUserId,
          potData.plantId,
          potData.metrics ? new PotMetrics(
            potData.metrics.batteryLevel,
            potData.metrics.waterLevel,
            potData.metrics.humidity,
            potData.metrics.luminance,
            potData.metrics.temperature,
            potData.metrics.ph,
            potData.metrics.salinity,
            new Date(potData.metrics.timestamp)
          ) : undefined
        );
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading pot details:', error);
        this.errorMessage = 'Error al cargar los detalles de la maceta';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pots']);
  }

  waterPot(): void {
    if (!this.pot) return;

    // Simulate watering
    if (this.pot.metrics) {
      this.pot.metrics.humidity = Math.min(this.pot.metrics.humidity + 30, 100);
      this.pot.lastWatered = new Date();
    }

    console.log(`Watering pot ${this.pot.id}`);
    // Here you could call the watering service if available
  }

  refreshData(): void {
    this.loadPotDetails();
  }

  openSettings(): void {
    console.log('Open pot settings');
    // Implement settings dialog
  }

  viewHistory(): void {
    console.log('View watering history');
    // Navigate to history page
  }

  generateReport(): void {
    console.log('Generate pot report');
    // Navigate to reports page
  }

  editPotInfo(): void {
    console.log('Edit pot information');
    // Open edit dialog
  }

  unlinkPot(): void {
    if (!this.pot) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    if (confirm('¿Estás seguro de que deseas desvincular esta maceta de tu cuenta?')) {
      this.potService.unassignPot(this.pot.id, token).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/pots']);
          }
        },
        error: (error) => {
          console.error('Error unlinking pot:', error);
        }
      });
    }
  }

  getStatusClass(): string {
    if (!this.pot) return '';

    switch (this.pot.status) {
      case 1: return 'active';
      case 2: return 'maintenance';
      default: return 'inactive';
    }
  }

  getStatusText(): string {
    if (!this.pot) return '';

    switch (this.pot.status) {
      case 1: return 'Activa';
      case 2: return 'En mantenimiento';
      default: return 'Inactiva';
    }
  }

  getLastWateredText(): string {
    if (!this.pot?.lastWatered) return 'Sin datos';

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.pot.lastWatered.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Ayer';
    if (diffDays === 0) return 'Hoy';
    return `Hace ${diffDays} días`;
  }
}
