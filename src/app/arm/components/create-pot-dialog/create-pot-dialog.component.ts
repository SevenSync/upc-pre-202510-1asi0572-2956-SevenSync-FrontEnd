import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { CreatePotRequest } from '../../model/create-pot.request';

@Component({
  selector: 'app-create-pot-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule
  ],
  template: `
    <div class="create-pot-dialog">
      <h2 mat-dialog-title>
        <mat-icon>add_circle</mat-icon>
        Agregar Nueva Maceta
      </h2>

      <mat-dialog-content>
        <mat-stepper #stepper linear="true" orientation="vertical" class="pot-stepper">

          <!-- Paso 1: Información Básica -->
          <mat-step [stepControl]="basicInfoForm" label="Información Básica">
            <form [formGroup]="basicInfoForm" class="step-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nombre de la Maceta</mat-label>
                <input matInput
                       placeholder="Ej: Monstera del Salón"
                       formControlName="name"
                       maxlength="50">
                <mat-hint>Dale un nombre descriptivo a tu maceta</mat-hint>
                <mat-error *ngIf="basicInfoForm.get('name')?.hasError('required')">
                  El nombre es obligatorio
                </mat-error>
                <mat-error *ngIf="basicInfoForm.get('name')?.hasError('minlength')">
                  El nombre debe tener al menos 2 caracteres
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Ubicación</mat-label>
                <input matInput
                       placeholder="Ej: Sala de estar, junto a la ventana"
                       formControlName="location"
                       maxlength="100">
                <mat-hint>¿Dónde estará ubicada la maceta?</mat-hint>
                <mat-error *ngIf="basicInfoForm.get('location')?.hasError('required')">
                  La ubicación es obligatoria
                </mat-error>
              </mat-form-field>

              <div class="step-actions">
                <button mat-raised-button
                        color="primary"
                        matStepperNext
                        [disabled]="!basicInfoForm.valid">
                  Continuar
                </button>
              </div>
            </form>
          </mat-step>

          <!-- Paso 2: Configuración Técnica -->
          <mat-step [stepControl]="technicalForm" label="Configuración Técnica">
            <form [formGroup]="technicalForm" class="step-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>ID del Dispositivo</mat-label>
                <input matInput
                       placeholder="Ej: MACETECH_001"
                       formControlName="deviceId"
                       maxlength="20">
                <mat-hint>Identificador único del dispositivo IoT (opcional)</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Estado Inicial</mat-label>
                <mat-select formControlName="status">
                  <mat-option [value]="1">
                    <div class="status-option">
                      <mat-icon class="status-icon active">check_circle</mat-icon>
                      <div>
                        <div class="status-name">Activa</div>
                        <div class="status-description">La maceta estará lista para monitoreo</div>
                      </div>
                    </div>
                  </mat-option>
                  <mat-option [value]="0">
                    <div class="status-option">
                      <mat-icon class="status-icon inactive">pause_circle</mat-icon>
                      <div>
                        <div class="status-name">Inactiva</div>
                        <div class="status-description">La maceta no enviará datos hasta activarla</div>
                      </div>
                    </div>
                  </mat-option>
                  <mat-option [value]="2">
                    <div class="status-option">
                      <mat-icon class="status-icon maintenance">build_circle</mat-icon>
                      <div>
                        <div class="status-name">Mantenimiento</div>
                        <div class="status-description">La maceta está en proceso de configuración</div>
                      </div>
                    </div>
                  </mat-option>
                </mat-select>
                <mat-hint>Estado inicial de la maceta en el sistema</mat-hint>
              </mat-form-field>

              <div class="info-card">
                <mat-icon>info</mat-icon>
                <div>
                  <h4>Configuración del Dispositivo</h4>
                  <p>Una vez creada la maceta, podrás vincular sensores específicos y configurar umbrales personalizados desde la página de detalles.</p>
                </div>
              </div>

              <div class="step-actions">
                <button mat-button matStepperPrevious>Atrás</button>
                <button mat-raised-button
                        color="primary"
                        matStepperNext
                        [disabled]="!technicalForm.valid">
                  Continuar
                </button>
              </div>
            </form>
          </mat-step>

          <!-- Paso 3: Confirmación -->
          <mat-step label="Confirmación">
            <div class="confirmation-step">
              <div class="summary-card">
                <h3>
                  <mat-icon>summarize</mat-icon>
                  Resumen de la Nueva Maceta
                </h3>

                <div class="summary-content">
                  <div class="summary-row">
                    <span class="label">Nombre:</span>
                    <span class="value">{{ basicInfoForm.get('name')?.value }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="label">Ubicación:</span>
                    <span class="value">{{ basicInfoForm.get('location')?.value }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="label">Dispositivo:</span>
                    <span class="value">{{ technicalForm.get('deviceId')?.value || 'No especificado' }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="label">Estado:</span>
                    <span class="value status" [class]="'status-' + technicalForm.get('status')?.value">
                      {{ getStatusName(technicalForm.get('status')?.value) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="next-steps-card">
                <h4>
                  <mat-icon>playlist_add_check</mat-icon>
                  Próximos Pasos
                </h4>
                <ul>
                  <li>La maceta será creada y asignada automáticamente a tu cuenta</li>
                  <li>Podrás configurar sensores y umbrales desde los detalles</li>
                  <li>Si tienes un dispositivo físico, sincronízalo usando el ID del dispositivo</li>
                  <li>Vincula una planta específica para obtener recomendaciones personalizadas</li>
                </ul>
              </div>

              <div class="step-actions">
                <button mat-button matStepperPrevious>Atrás</button>
                <button mat-raised-button
                        color="primary"
                        (click)="onCreatePot()"
                        [disabled]="isCreating">
                  <mat-icon *ngIf="isCreating">hourglass_empty</mat-icon>
                  <mat-icon *ngIf="!isCreating">add_circle</mat-icon>
                  {{ isCreating ? 'Creando...' : 'Crear Maceta' }}
                </button>
              </div>
            </div>
          </mat-step>
        </mat-stepper>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button [mat-dialog-close]="false" [disabled]="isCreating">
          Cancelar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrl: './create-pot-dialog.component.css'
})
export class CreatePotDialogComponent implements OnInit {
  basicInfoForm!: FormGroup;
  technicalForm!: FormGroup;
  isCreating = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePotDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.basicInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.technicalForm = this.fb.group({
      deviceId: ['', [Validators.maxLength(20)]],
      status: [1, [Validators.required]]
    });
  }

  getStatusName(status: number): string {
    switch (status) {
      case 0: return 'Inactiva';
      case 1: return 'Activa';
      case 2: return 'Mantenimiento';
      default: return 'Desconocido';
    }
  }

  onCreatePot(): void {
    if (this.basicInfoForm.valid && this.technicalForm.valid) {
      this.isCreating = true;

      const potRequest = new CreatePotRequest(
        this.basicInfoForm.get('name')?.value,
        this.basicInfoForm.get('location')?.value,
        this.technicalForm.get('status')?.value
      );

      // Simular delay de creación
      setTimeout(() => {
        this.dialogRef.close({
          success: true,
          potRequest: potRequest,
          deviceId: this.technicalForm.get('deviceId')?.value
        });
      }, 1500);
    }
  }
}
