import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { PotCardComponent } from '../../components/pot-card/pot-card.component';
import { PotService } from '../../services/pot.service';
import {Pot, PotMetrics} from '../../model/pot.entity';
import {AssignPotToUserRequest} from '../../model/assign-pot.request';
import {AssignPotFormComponent} from '../../components/assign-pot-form/assign-pot-form.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CreatePotRequest} from '../../model/create-pot.request';
import {CreatePotDialogComponent} from '../../components/create-pot-dialog/create-pot-dialog.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    PotCardComponent,
    TranslateModule
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css'
})
export class PotsComponent implements OnInit {
  pots: Pot[] = [];
  selectedTabIndex = 0;
  isLoading = false;
  errorMessage = '';

  constructor(
    private potService: PotService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPots();
  }

  loadPots(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.potService.getAllPots(token).subscribe({
      next: (potsData) => {
        this.isLoading = false;
        this.pots = potsData.map(potData => new Pot(
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
          undefined, // lastWatered - would need to be added to backend response
          '/assets/default-plant.png' // Default image
        ));
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading pots:', error);
        this.errorMessage = 'Error al cargar las macetas';
        this.snackBar.open('Error al cargar las macetas', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  get filteredPots(): Pot[] {
    switch (this.selectedTabIndex) {
      case 0: return this.pots; // Todas
      case 1: return this.pots.filter(p => p.healthStatus === 'healthy'); // Saludables
      case 2: return this.pots.filter(p => p.healthStatus === 'warning'); // Necesitan atención
      case 3: return this.pots.filter(p => p.healthStatus === 'critical'); // Críticas
      default: return this.pots;
    }
  }

  get healthyCount(): number {
    return this.pots.filter(p => p.healthStatus === 'healthy').length;
  }

  get warningCount(): number {
    return this.pots.filter(p => p.healthStatus === 'warning').length;
  }

  get criticalCount(): number {
    return this.pots.filter(p => p.healthStatus === 'critical').length;
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }

  onWaterPlant(potId: number): void {
    const pot = this.pots.find(p => p.id === potId);
    if (pot && pot.metrics) {
      // Optimistic update
      pot.waterNow();

      this.snackBar.open(`${pot.name} regada exitosamente`, 'Cerrar', {
        duration: 3000
      });

      // Here you could call the backend to log the watering action
      // this.wateringService.logWatering(potId, ...)
    }
  }

  onViewPotDetails(potId: number): void {
    console.log('Navigate to pot details:', potId);
    // Implement navigation to pot details page
    // this.router.navigate(['/pots', potId]);
  }

  onAddPot(): void {
    const dialogRef = this.dialog.open(CreatePotDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true // Evita cerrar accidentalmente durante la creación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.createPot(result.potRequest, result.deviceId);
      }
    });
  }

  // ✅ NUEVO MÉTODO: createPot
  private createPot(potRequest: CreatePotRequest, deviceId?: string): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // Mostrar loading en el snackbar
    const loadingSnackBar = this.snackBar.open('Creando maceta...', undefined, {
      duration: 0 // No auto-dismiss
    });

    this.potService.createPot(potRequest, token).subscribe({
      next: (response) => {
        loadingSnackBar.dismiss();

        if (response.success) {
          this.snackBar.open(
            `Maceta "${potRequest.name}" creada exitosamente`,
            'Cerrar',
            {
              duration: 4000,
              panelClass: ['success-snackbar']
            }
          );

          // Recargar la lista de macetas
          this.loadPots();

          // Si hay deviceId, mostrar información adicional
          if (deviceId) {
            setTimeout(() => {
              this.snackBar.open(
                `Recuerda configurar el dispositivo "${deviceId}" con la nueva maceta`,
                'Entendido',
                {
                  duration: 6000,
                  panelClass: ['info-snackbar']
                }
              );
            }, 1000);
          }

        } else {
          this.snackBar.open(
            'No se pudo crear la maceta. Intenta nuevamente.',
            'Cerrar',
            {
              duration: 4000,
              panelClass: ['error-snackbar']
            }
          );
        }
      },
      error: (error) => {
        loadingSnackBar.dismiss();
        console.error('Error creating pot:', error);

        let errorMessage = 'Error al crear la maceta';
        if (error.status === 400) {
          errorMessage = 'Datos inválidos. Verifica la información ingresada.';
        } else if (error.status === 403) {
          errorMessage = 'No tienes permisos para crear macetas.';
        } else if (error.status === 409) {
          errorMessage = 'Ya existe una maceta con ese nombre o dispositivo.';
        }

        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onAssignPot(potId: number): void {
    const dialogRef = this.dialog.open(AssignPotFormComponent, {
      width: '500px'
    });

    dialogRef.componentInstance.potId = potId;

    // ✅ CORRECCIÓN: Subscribe al EventEmitter
    const subscription = dialogRef.componentInstance.assign.subscribe((request: AssignPotToUserRequest) => {
      this.assignPot(potId, request);
      dialogRef.close();
    });

    // Subscribe al cancel también
    const cancelSubscription = dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });

    // Cleanup subscriptions cuando el dialog se cierre
    dialogRef.afterClosed().subscribe(() => {
      subscription.unsubscribe();
      cancelSubscription.unsubscribe();
    });
  }

  private assignPot(potId: number, request: AssignPotToUserRequest): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.potService.assignPot(potId, request, token).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Maceta asignada exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.loadPots(); // Reload to get updated data
        }
      },
      error: (error) => {
        console.error('Error assigning pot:', error);
        this.snackBar.open('Error al asignar la maceta', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onUnassignPot(potId: number): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.potService.unassignPot(potId, token).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Maceta desasignada exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.loadPots(); // Reload to get updated data
        }
      },
      error: (error) => {
        console.error('Error unassigning pot:', error);
        this.snackBar.open('Error al desasignar la maceta', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }
  getEmptyStateTitle(): string {
    if (this.pots.length === 0) {
      return '¡Bienvenido a MaceTech!';
    }

    switch (this.selectedTabIndex) {
      case 1: return 'No hay macetas saludables';
      case 2: return 'No hay macetas que necesiten atención';
      case 3: return 'No hay macetas en estado crítico';
      default: return 'No hay macetas en esta categoría';
    }
  }

  getEmptyStateMessage(): string {
    if (this.pots.length === 0) {
      return 'Comienza agregando tu primera maceta inteligente para monitorear tus plantas.';
    }

    switch (this.selectedTabIndex) {
      case 1: return 'Todas tus macetas necesitan algún tipo de atención.';
      case 2: return 'Excelente, ninguna de tus macetas necesita atención especial.';
      case 3: return 'Perfecto, ninguna de tus macetas está en estado crítico.';
      default: return 'Cambia de categoría para ver otras macetas.';
    }
  }
}
