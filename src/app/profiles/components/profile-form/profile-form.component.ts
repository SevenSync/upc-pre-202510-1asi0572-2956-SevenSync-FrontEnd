import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Profile } from '../../model/profile.entity';
import {UpdateProfileRequest} from '../../model/update-profile.request';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
      <div class="form-row">
        <mat-form-field appearance="outline" class="half-width">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="firstName" placeholder="Juan">
          <mat-error *ngIf="profileForm.get('firstName')?.hasError('required')">
            El nombre es requerido
          </mat-error>
          <mat-error *ngIf="profileForm.get('firstName')?.hasError('pattern')">
            Solo se permiten letras
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="half-width">
          <mat-label>Apellidos</mat-label>
          <input matInput formControlName="lastName" placeholder="Pérez García">
          <mat-error *ngIf="profileForm.get('lastName')?.hasError('required')">
            Los apellidos son requeridos
          </mat-error>
          <mat-error *ngIf="profileForm.get('lastName')?.hasError('pattern')">
            Solo se permiten letras
          </mat-error>
        </mat-form-field>
      </div>

      <div class="address-section">
        <h4 class="section-title">Dirección</h4>

        <div class="form-row">
          <mat-form-field appearance="outline" class="three-quarters">
            <mat-label>Calle</mat-label>
            <input matInput formControlName="street" placeholder="Av. Principal">
            <mat-error *ngIf="profileForm.get('street')?.hasError('required')">
              La calle es requerida
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter">
            <mat-label>Número</mat-label>
            <input matInput formControlName="number" placeholder="123">
            <mat-error *ngIf="profileForm.get('number')?.hasError('required')">
              El número es requerido
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Ciudad</mat-label>
            <input matInput formControlName="city" placeholder="Lima">
            <mat-error *ngIf="profileForm.get('city')?.hasError('required')">
              La ciudad es requerida
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter">
            <mat-label>Código Postal</mat-label>
            <input matInput formControlName="postalCode" placeholder="15001">
            <mat-error *ngIf="profileForm.get('postalCode')?.hasError('required')">
              El código postal es requerido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter">
            <mat-label>País</mat-label>
            <input matInput formControlName="country" placeholder="Perú">
            <mat-error *ngIf="profileForm.get('country')?.hasError('required')">
              El país es requerido
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <div class="contact-section">
        <h4 class="section-title">Información de Contacto</h4>

        <div class="form-row">
          <mat-form-field appearance="outline" class="quarter">
            <mat-label>Código País</mat-label>
            <input matInput formControlName="countryCode" placeholder="+51">
            <mat-error *ngIf="profileForm.get('countryCode')?.hasError('required')">
              El código es requerido
            </mat-error>
            <mat-error *ngIf="profileForm.get('countryCode')?.hasError('pattern')">
              Formato: +51
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="three-quarters">
            <mat-label>Número de teléfono</mat-label>
            <input matInput formControlName="phoneNumber" placeholder="987-654-321">
            <mat-icon matSuffix>phone</mat-icon>
            <mat-error *ngIf="profileForm.get('phoneNumber')?.hasError('required')">
              El teléfono es requerido
            </mat-error>
            <mat-error *ngIf="profileForm.get('phoneNumber')?.hasError('pattern')">
              Formato: 987-654-321
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <div class="form-actions">
        <button type="button"
                mat-button
                (click)="onCancel()"
                [disabled]="isLoading">
          Cancelar
        </button>

        <button type="submit"
                mat-raised-button
                color="primary"
                [disabled]="profileForm.invalid || isLoading">
          {{ isLoading ? 'Guardando...' : (editMode ? 'Actualizar Perfil' : 'Crear Perfil') }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .profile-form {
      max-width: 800px;
      margin: 0 auto;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .half-width {
      flex: 1;
    }

    .quarter {
      flex: 0 0 24%;
    }

    .three-quarters {
      flex: 1;
    }

    .address-section,
    .contact-section {
      margin: 32px 0;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .section-title {
      color: #296244;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 0 0 20px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::before {
      content: '';
      width: 4px;
      height: 20px;
      background-color: #2ecc71;
      border-radius: 2px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e9ecef;
    }

    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: 16px;
      }

      .half-width,
      .quarter,
      .three-quarters {
        flex: none;
        width: 100%;
      }

      .address-section,
      .contact-section {
        margin: 24px 0;
        padding: 16px;
      }

      .form-actions {
        flex-direction: column-reverse;
      }
    }
  `]
})
export class ProfileFormComponent implements OnInit {
  @Input() profile: Profile | null = null;
  @Input() editMode = false;
  @Input() isLoading = false;
  @Output() profileSubmit = new EventEmitter<UpdateProfileRequest>();
  @Output() cancel = new EventEmitter<void>();

  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      countryCode: ['', [Validators.required, Validators.pattern(/^\+\d{1,4}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)]]
    });
  }

  ngOnInit(): void {
    if (this.profile && this.editMode) {
      this.loadProfileData();
    }
  }

  private loadProfileData(): void {
    if (!this.profile) return;

    // Parse full name
    const nameParts = this.profile.fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Parse address (basic implementation)
    const addressParts = this.profile.streetAddress.split(' ');

    this.profileForm.patchValue({
      firstName,
      lastName,
      street: this.profile.streetAddress || '',
      number: '123', // Default value since we don't have it parsed
      city: 'Lima', // Default value
      postalCode: '15001', // Default value
      country: 'Perú', // Default value
      countryCode: '+51', // Default value
      phoneNumber: this.profile.phoneNumber || ''
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;

      const request = new UpdateProfileRequest(
        formValue.firstName,
        formValue.lastName,
        formValue.street,
        formValue.number,
        formValue.city,
        formValue.postalCode,
        formValue.country,
        formValue.countryCode,
        formValue.phoneNumber
      );

      this.profileSubmit.emit(request);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
