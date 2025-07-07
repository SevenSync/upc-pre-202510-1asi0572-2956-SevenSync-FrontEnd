import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {AssignPotToUserRequest} from '../../model/assign-pot.request';

@Component({
  selector: 'app-assign-pot-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  template: `
    <form [formGroup]="assignForm" (ngSubmit)="onSubmit()">
      <h2 mat-dialog-title>Asignar Maceta</h2>

      <mat-dialog-content class="form-content">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre de la maceta</mat-label>
          <input matInput formControlName="name" placeholder="Mi Monstera">
          <mat-error *ngIf="assignForm.get('name')?.hasError('required')">
            El nombre es requerido
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Ubicación</mat-label>
          <input matInput formControlName="location" placeholder="Sala de estar">
          <mat-error *ngIf="assignForm.get('location')?.hasError('required')">
            La ubicación es requerida
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado inicial</mat-label>
          <mat-select formControlName="status">
            <mat-option [value]="0">Inactiva</mat-option>
            <mat-option [value]="1">Activa</mat-option>
            <mat-option [value]="2">En mantenimiento</mat-option>
          </mat-select>
          <mat-error *ngIf="assignForm.get('status')?.hasError('required')">
            El estado es requerido
          </mat-error>
        </mat-form-field>

        <div class="info-message">
          <p>Esta maceta será asignada a tu cuenta y podrás comenzar a monitorearla inmediatamente.</p>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="assignForm.invalid || isLoading">
          {{ isLoading ? 'Asignando...' : 'Asignar Maceta' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .form-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 400px;
      padding: 16px 0;
    }
    .full-width {
      width: 100%;
    }
    .info-message {
      background-color: #e8f5e8;
      border: 1px solid #2ecc71;
      border-radius: 8px;
      padding: 12px;
      margin-top: 8px;
    }
    .info-message p {
      margin: 0;
      color: #296244;
      font-size: 0.9rem;
    }
  `]
})
export class AssignPotFormComponent {
  @Input() potId: number = 0;
  @Output() assignPot = new EventEmitter<AssignPotToUserRequest>();
  @Output() cancel = new EventEmitter<void>();

  assignForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.assignForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
      status: [1, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.assignForm.valid) {
      this.isLoading = true;
      const formValue = this.assignForm.value;

      const request = new AssignPotToUserRequest(
        this.potId,
        formValue.name,
        formValue.location,
        formValue.status
      );

      this.assignPot.emit(request);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
