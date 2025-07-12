import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common'; // ✅ Importa DatePipe
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Angular Material & Shared
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';

// Local & Core
import { PotMetricsComponent } from '../../components/pot-metrics/pot-metrics.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog-data';
import { PlantSelectionDialogComponent } from '../../components/plant-selection-data';
import { PotService } from '../../services/pot.service';
import { Pot } from '../../model/pot.entity';
import { LinkPlantToPotRequest } from '../../model/link-plant.request';

// ✅ Importa los Pipes que vamos a usar
import { PotStatusPipe } from '../../../pipes/pot-status.pipe';
import { PotStatusToClassPipe } from '../../../pipes/pot-status-to-class.pipe';
import { NeedsWateringPipe } from '../../../pipes/needs-watering.pipe';
import { RelativeTimePipe } from '../../../pipes/relative-time.pipe';


@Component({
  selector: 'app-pot-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, MatIconModule, MatTabsModule, MatCardModule, MatSnackBarModule,
    MatDialogModule, MatProgressSpinnerModule, MatTooltipModule,
    ToolbarComponent, PotMetricsComponent,
    // ✅ Añade los pipes a los imports del componente standalone
    PotStatusPipe, PotStatusToClassPipe, NeedsWateringPipe
  ],
  templateUrl: './pot-details.component.html',
  styleUrl: './pot-details.component.css'
})
export class PotDetailsComponent implements OnInit, OnDestroy {
  pot: Pot | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  selectedTabIndex = 0;

  private destroy$ = new Subject<void>();

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
      this.loadPotDetails(parseInt(potId, 10));
    } else {
      this.handleError("ID de maceta inválido en la URL.");
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPotDetails(potId: number): void {
    const token = this.getTokenOrRedirect();
    if (!token) return;

    if (!potId || potId === 0) {
      this.handleError('ID de maceta inválido para la carga.');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.potService.getPot(potId, token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (mappedPot) => {
          // ✅ El servicio ya nos entrega el modelo de datos limpio y mapeado. ¡Adiós a `new Pot()`!
          this.pot = mappedPot;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading pot details:', error);
          if (error.status === 404) {
            this.handleError('Maceta no encontrada.');
          } else if (error.status === 403) {
            this.handleError('No tienes permisos para ver esta maceta.');
          } else {
            this.handleError('Error al cargar los detalles de la maceta.');
          }
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/arm/pots']);
  }

  onRefreshMetrics(): void {
    if (this.pot) {
      this.loadPotDetails(this.pot.id);
      this.snackBar.open('Métricas actualizadas', 'Cerrar', { duration: 2000 });
    }
  }

  // ❗️ Lógica de presentación y getters eliminada de aquí y movida a la plantilla con pipes.

  // --- Métodos de Acción (llaman a servicios y recargan el estado) ---

  onWaterPlant(): void {
    if (!this.pot) return;
    // ❗️ La lógica ya no muta el estado local. Debería llamar a un servicio.
    // this.potService.waterPot(this.pot.id).subscribe(...)
    this.snackBar.open(`${this.pot.name} regada. (Simulación)`, 'Cerrar', { duration: 3000 });
    // Para una actualización visual, lo ideal es recargar.
    this.loadPotDetails(this.pot.id);
  }

  onUnlinkPlant(): void {
    // ... (la lógica de abrir el diálogo está bien)
    // El 'subscribe' interno debería llamar a this.loadPotDetails(this.pot.id) en caso de éxito.
  }

  onLinkPlant(): void {
    // ... (la lógica de abrir el diálogo está bien)
    // El 'subscribe' interno debería llamar a this.loadPotDetails(this.pot.id) en caso de éxito.
  }

  onDeletePot(): void {
    // ... (la lógica de abrir el diálogo está bien)
    // El 'subscribe' interno debería llamar a goBack() en caso de éxito.
  }

  // ... (el resto de tus métodos de acción como onUnassignPot, onEdit, etc. seguirían un patrón similar)

  private getTokenOrRedirect(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return null;
    }
    return token;
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
  }
}
