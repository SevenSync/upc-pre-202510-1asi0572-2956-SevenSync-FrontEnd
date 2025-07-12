import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Angular Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Core & Shared
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { TranslateModule } from '@ngx-translate/core';

// Local (ARM Module)
import { PotCardComponent } from '../../components/pot-card/pot-card.component';
import { AddPotDialogComponent } from '../../components/add-pot-dialog/add-pot-dialog.component';
import { PotService } from '../../services/pot.service';
import { BluetoothService } from '../../services/bluetooth.service';
import { Pot, PotStatus } from '../../model/pot.entity';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [
    // Angular & Shared
    CommonModule,
    TranslateModule,
    ToolbarComponent,
    // Angular Material
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    // Local Components
    PotCardComponent
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css'
})
export class PotsComponent implements OnInit, OnDestroy {
  // --- Propiedades del Estado de Datos ---
  pots: Pot[] = [];
  filteredPots: Pot[] = [];
  healthyCount = 0;
  warningCount = 0;
  criticalCount = 0;

  // --- Propiedades del Estado de la UI ---
  selectedTabIndex = 0;
  isLoading = false;
  errorMessage: string | null = null;
  userName = 'John Doe'; // En una app real, vendría de un servicio de autenticación

  // Subject para gestionar la desuscripción de Observables y evitar fugas de memoria
  private destroy$ = new Subject<void>();

  constructor(
    private potService: PotService,
    private bluetoothService: BluetoothService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPots();
    this.listenToBluetoothStatus();
  }

  ngOnDestroy(): void {
    // Emite un valor para notificar a todas las suscripciones que deben completarse
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carga la lista de macetas desde el servicio y actualiza la vista.
   */
  loadPots(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']); // Redirige si no hay token
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.potService.getAllPots(token)
      .pipe(takeUntil(this.destroy$)) // La suscripción se cancelará automáticamente al destruir el componente
      .subscribe({
        next: (mappedPots) => {
          // El servicio ya nos entrega los datos limpios y mapeados
          this.pots = mappedPots;
          this.updateAndRecalculate();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading pots:', error);
          this.errorMessage = 'No se pudieron cargar tus macetas. Inténtalo de nuevo.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Abre el diálogo de selección para añadir una nueva maceta.
   */
  onAddPot(): void {
    const dialogRef = this.dialog.open(AddPotDialogComponent, {
      width: '500px',
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result === 'bluetooth') {
          this.snackBar.open('Buscando dispositivos Bluetooth...', 'Cerrar', { duration: 5000 });
          this.bluetoothService.connectToDevice();
        } else if (result === 'manual') {
          // Aquí se implementaría la lógica para el ingreso manual
          this.snackBar.open('Ingreso manual no implementado aún.', 'Ok', { duration: 3000 });
        }
      });
  }

  /**
   * Se ejecuta cuando el usuario cambia de pestaña de filtro.
   * @param index - El índice de la pestaña seleccionada.
   */
  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    this.filterPots(); // Solo filtramos cuando la pestaña cambia, no en cada ciclo de Angular
  }

  // --- MÉTODOS PRIVADOS DE AYUDA ---

  /**
   * Agrupa las tareas de actualización de la UI después de recibir nuevos datos.
   */
  private updateAndRecalculate(): void {
    this.filterPots();
    this.calculateCounts();
  }

  /**
   * Filtra la lista de macetas según la pestaña seleccionada y actualiza `filteredPots`.
   */
  private filterPots(): void {
    switch (this.selectedTabIndex) {
      case 0:
        this.filteredPots = this.pots;
        break;
      case 1: // Saludables
        this.filteredPots = this.pots.filter(p => p.status === PotStatus.Healthy);
        break;
      case 2: // Necesitan atención
        this.filteredPots = this.pots.filter(p => p.status === PotStatus.Warning);
        break;
      case 3: // Críticas
        this.filteredPots = this.pots.filter(p => p.status === PotStatus.Critical);
        break;
      default:
        this.filteredPots = this.pots;
    }
  }

  /**
   * Calcula el número de macetas en cada estado para mostrar en la cabecera.
   */
  private calculateCounts(): void {
    this.healthyCount = this.pots.filter(p => p.status === PotStatus.Healthy).length;
    this.warningCount = this.pots.filter(p => p.status === PotStatus.Warning).length;
    this.criticalCount = this.pots.filter(p => p.status === PotStatus.Critical).length;
  }

  /**
   * Escucha el estado de la conexión Bluetooth para reaccionar a conexiones exitosas.
   */
  private listenToBluetoothStatus(): void {
    this.bluetoothService.connectionStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isConnected => {
        if (isConnected) {
          this.snackBar.open('¡Dispositivo conectado! Listo para configurar.', 'Ok', { duration: 4000 });
          // Lógica futura: navegar a la página de configuración de la nueva maceta,
          // pasando el ID del dispositivo que se obtuvo del servicio Bluetooth.
          // Ejemplo: this.router.navigate(['/pots/new/configure', { deviceId: '...' }]);
        }
      });
  }

  // --- MANEJADORES DE EVENTOS DE LAS TARJETAS (Implementación futura) ---

  onWaterPlant(potId: number): void {
    // En una implementación real, esto llamaría a `potService.waterPot(potId)`
    this.snackBar.open(`Acción "Regar" para maceta ${potId} no implementada.`, 'Ok', { duration: 3000 });
  }

  onViewPotDetails(potId: number): void {
    // Navegaría a la página de detalles de la maceta
    this.router.navigate(['/arm/pots', potId]);
  }
}
