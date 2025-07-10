import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import {AssignPotToUserRequest} from '../../model/assign-pot.request';
import {TranslateModule} from '@ngx-translate/core';

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
    MatDialogModule,
    TranslateModule
  ],
  template: `
    <div class="assign-form-container">
      <h2>{{ 'ASSIGN_POT.TITLE' | translate }}</h2>
      <form (ngSubmit)="onSubmit()" #assignForm="ngForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ 'ASSIGN_POT.NAME_LABEL' | translate }}</mat-label>
          <input matInput [(ngModel)]="potName" name="potName" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ 'ASSIGN_POT.LOCATION_LABEL' | translate }}</mat-label>
          <input matInput [(ngModel)]="location" name="location" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ 'ASSIGN_POT.STATUS_LABEL' | translate }}</mat-label>
          <mat-select [(ngModel)]="status" name="status" required>
            <mat-option [value]="0">{{ 'ASSIGN_POT.STATUS.INACTIVE' | translate }}</mat-option>
            <mat-option [value]="1">{{ 'ASSIGN_POT.STATUS.ACTIVE' | translate }}</mat-option>
            <mat-option [value]="2">{{ 'ASSIGN_POT.STATUS.MAINTENANCE' | translate }}</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="form-actions">
          <button type="button" mat-button (click)="onCancel()">{{ 'ASSIGN_POT.CANCEL' | translate }}</button>
          <button type="submit"
                  mat-raised-button
                  color="primary"
                  [disabled]="!assignForm.valid || isLoading">
            {{ isLoading ? ('ASSIGN_POT.ASSIGNING' | translate) : ('ASSIGN_POT.SUBMIT' | translate) }}
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
