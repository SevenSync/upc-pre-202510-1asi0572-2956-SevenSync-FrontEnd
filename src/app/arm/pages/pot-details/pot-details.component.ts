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
import { PotService } from '../../services/pot.service';
import {Pot, PotMetrics} from '../../model/pot.entity';
import {LinkPlantToPotRequest} from '../../model/link-plant.request';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ConfirmDialogComponent} from '../../components/confirm-dialog-data';
import {PlantSelectionDialogComponent} from '../../components/plant-selection-data';

@Component({
  selector: 'app-pot-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ToolbarComponent,
    PotMetricsComponent
  ],
  templateUrl: './pot-details.component.html',
  styleUrl: './pot-details.component.css'
})
export class PotDetailsComponent implements OnInit {
  pot: Pot | null = null;
  isLoading = false;
  errorMessage = '';
  selectedTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private potService: PotService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const potId = this.route.snapshot.paramMap.get('id');
    if (potId) {
      this.loadPotDetails(parseInt(potId));
    } else {
      this.errorMessage = 'ID de maceta inválido';
    }
  }

  loadPotDetails(potId?: number): void {
    const id = potId || parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    if (!id || id === 0) {
      this.errorMessage = 'ID de maceta inválido';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.potService.getPot(id, token).subscribe({
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
          ) : undefined,
          undefined, // lastWatered - would come from backend if available
          '/assets/default-plant.png' // Default image
        );
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading pot details:', error);
        this.errorMessage = 'Error al cargar los detalles de la maceta';

        // Show user-friendly error messages
        if (error.status === 404) {
          this.errorMessage = 'Maceta no encontrada';
        } else if (error.status === 403) {
          this.errorMessage = 'No tienes permisos para ver esta maceta';
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pots']);
  }

  getStatusText(): string {
    if (!this.pot) return '';
    switch (this.pot.healthStatus) {
      case 'healthy': return 'Saludable';
      case 'warning': return 'Necesita Atención';
      case 'critical': return 'Estado Crítico';
      default: return 'Desconocido';
    }
  }

  getStatusName(status: number): string {
    switch (status) {
      case 0: return 'Inactiva';
      case 1: return 'Activa';
      case 2: return 'Mantenimiento';
      default: return 'Desconocido';
    }
  }

  onWaterPlant(): void {
    if (!this.pot || !this.pot.needsWatering) return;

    // Optimistic update
    this.pot.waterNow();

    this.snackBar.open(`${this.pot.name} regada exitosamente`, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });

    // Here you could call a watering service to log the action
    // this.wateringService.logWatering(this.pot.id, ...)
  }

  onRefreshMetrics(): void {
    if (this.pot) {
      this.loadPotDetails(this.pot.id);
      this.snackBar.open('Métricas actualizadas', 'Cerrar', {
        duration: 2000
      });
    }
  }

  onUnassignPot(): void {
    if (!this.pot) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // Confirm dialog
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Desasignar Maceta',
        message: `¿Estás seguro de que quieres desasignar "${this.pot.name}"?`,
        confirmText: 'Desasignar',
        cancelText: 'Cancelar'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result && this.pot) {
        this.potService.unassignPot(this.pot.id, token).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Maceta desasignada exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.goBack();
            }
          },
          error: (error) => {
            console.error('Error unassigning pot:', error);
            this.snackBar.open('Error al desasignar la maceta', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  onLinkPlant(): void {
    if (!this.pot) return;

    // Open plant selection dialog
    const plantDialog = this.dialog.open(PlantSelectionDialogComponent, {
      width: '500px',
      data: { currentPlantId: this.pot.plantId }
    });

    plantDialog.afterClosed().subscribe(result => {
      if (result && this.pot) {
        this.linkPlantToPot(result.plantId);
      }
    });
  }

  onUnlinkPlant(): void {
    if (!this.pot || !this.pot.plantId) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Desvincular Planta',
        message: '¿Estás seguro de que quieres desvincular la planta de esta maceta?',
        confirmText: 'Desvincular',
        cancelText: 'Cancelar'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result && this.pot) {
        this.potService.unlinkPlant(this.pot.id, token).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Planta desvinculada exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.loadPotDetails(this.pot!.id);
            }
          },
          error: (error) => {
            console.error('Error unlinking plant:', error);
            this.snackBar.open('Error al desvincular la planta', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  private linkPlantToPot(plantId: number): void {
    if (!this.pot) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    const request = new LinkPlantToPotRequest(plantId);

    this.potService.linkPlant(this.pot.id, request, token).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Planta vinculada exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.loadPotDetails(this.pot!.id);
        }
      },
      error: (error) => {
        console.error('Error linking plant:', error);
        this.snackBar.open('Error al vincular la planta', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onEditConfiguration(): void {
    // Navigate to edit configuration page or open dialog
    if (this.pot) {
      console.log('Edit configuration for pot:', this.pot.id);
      // this.router.navigate(['/pots', this.pot.id, 'edit']);
    }
  }

  onDeletePot(): void {
    if (!this.pot) return;

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Maceta',
        message: `¿Estás seguro de que quieres eliminar "${this.pot.name}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        isDestructive: true
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result && this.pot) {
        const token = localStorage.getItem('token');
        if (!token) return;

        this.potService.deletePot(this.pot.id, token).subscribe({
          next: (response) => {
            if (response.success) {
              this.snackBar.open('Maceta eliminada exitosamente', 'Cerrar', {
                duration: 3000
              });
              this.goBack();
            }
          },
          error: (error) => {
            console.error('Error deleting pot:', error);
            this.snackBar.open('Error al eliminar la maceta', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }

  // Utility methods for template
  get canWaterPlant(): boolean {
    return this.pot?.needsWatering ?? false;
  }

  get isAssigned(): boolean {
    return this.pot?.isAssigned ?? false;
  }

  get hasPlant(): boolean {
    return this.pot?.hasPlant ?? false;
  }

  get statusClass(): string {
    if (!this.pot) return '';
    return `status-${this.pot.healthStatus}`;
  }

  getLastUpdated(): string {
    if (!this.pot?.metrics?.timestamp) return 'Sin datos';

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(this.pot.metrics.timestamp);
  }
}
