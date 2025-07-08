import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  template: `
    <div class="assign-form-container">
      <h2>Asignar Maceta</h2>
      <form (ngSubmit)="onSubmit()" #assignForm="ngForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre de la Maceta</mat-label>
          <input matInput [(ngModel)]="potName" name="potName" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Ubicación</mat-label>
          <input matInput [(ngModel)]="location" name="location" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="status" name="status" required>
            <mat-option [value]="0">Inactiva</mat-option>
            <mat-option [value]="1">Activa</mat-option>
            <mat-option [value]="2">Mantenimiento</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="form-actions">
          <button type="button" mat-button (click)="onCancel()">Cancelar</button>
          <button type="submit" mat-raised-button color="primary"
                  [disabled]="!assignForm.valid || isLoading">
            {{ isLoading ? 'Asignando...' : 'Asignar Maceta' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .assign-form-container {
      padding: 24px;
      max-width: 400px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }
    h2 {
      margin: 0 0 24px 0;
      color: #333;
    }
  `]
})
export class AssignPotFormComponent {
  @Input() potId!: number;
  @Input() isLoading = false;
  @Output() assign = new EventEmitter<AssignPotToUserRequest>(); // ✅ CORREGIDO
  @Output() cancel = new EventEmitter<void>();

  potName = '';
  location = '';
  status = 1;

  onSubmit(): void {
    if (this.potName && this.location) {
      const request = new AssignPotToUserRequest(
        this.potId,
        this.potName,
        this.location,
        this.status
      );
      this.assign.emit(request);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
