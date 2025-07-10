import {Component, Input, Output, EventEmitter, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Profile } from '../../model/profile.entity';
import {UpdateProfileRequest} from '../../model/update-profile.request';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
      <div class="form-row">
        <mat-form-field appearance="outline" class="half-width">
          <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.FIRST_NAME.LABEL' | translate }}</mat-label>
          <input matInput formControlName="firstName" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.FIRST_NAME.PLACEHOLDER' | translate">
          <mat-error *ngIf="profileForm.get('firstName')?.hasError('required')">
            {{ 'CREATE_PROFILE.PROFILE_FORM.FIRST_NAME.REQUIRED' | translate }}
          </mat-error>
          <mat-error *ngIf="profileForm.get('firstName')?.hasError('pattern')">
            {{ 'CREATE_PROFILE.PROFILE_FORM.FIRST_NAME.PATTERN' | translate }}
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="half-width">
          <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.LAST_NAME.LABEL' | translate }}</mat-label>
          <input matInput formControlName="lastName" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.LAST_NAME.PLACEHOLDER' | translate">
          <mat-error *ngIf="profileForm.get('lastName')?.hasError('required')">
            {{ 'CREATE_PROFILE.PROFILE_FORM.LAST_NAME.REQUIRED' | translate }}
          </mat-error>
          <mat-error *ngIf="profileForm.get('lastName')?.hasError('pattern')">
            {{ 'CREATE_PROFILE.PROFILE_FORM.LAST_NAME.PATTERN' | translate }}
          </mat-error>
        </mat-form-field>
      </div>

      <div class="address-section">
        <h4 class="section-title">{{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.TITLE' | translate }}</h4>

        <div class="form-row">
          <mat-form-field appearance="outline" class="three-quarters">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.STREET' | translate }}</mat-label>
            <input matInput formControlName="street" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.ADDRESS.STREET_PLACEHOLDER' | translate">
            <mat-error *ngIf="profileForm.get('street')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.STREET_REQUIRED' | translate }}
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.NUMBER' | translate }}</mat-label>
            <input matInput formControlName="number" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.ADDRESS.NUMBER_PLACEHOLDER' | translate">
            <mat-error *ngIf="profileForm.get('number')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.NUMBER_REQUIRED' | translate }}
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.CITY' | translate }}</mat-label>
            <input matInput formControlName="city" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.ADDRESS.CITY_PLACEHOLDER' | translate">
            <mat-error *ngIf="profileForm.get('city')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.CITY_REQUIRED' | translate }}
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.POSTAL_CODE' | translate }}</mat-label>
            <input matInput formControlName="postalCode" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.ADDRESS.POSTAL_PLACEHOLDER' | translate">
            <mat-error *ngIf="profileForm.get('postalCode')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.POSTAL_REQUIRED' | translate }}
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.COUNTRY' | translate }}</mat-label>
            <input matInput formControlName="country" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.ADDRESS.COUNTRY_PLACEHOLDER' | translate">
            <mat-error *ngIf="profileForm.get('country')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.ADDRESS.COUNTRY_REQUIRED' | translate }}
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <div class="contact-section">
        <h4 class="section-title">{{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.TITLE' | translate }}</h4>

        <div class="form-row">
          <mat-form-field appearance="outline" class="quarter">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.CODE' | translate }}</mat-label>
            <input matInput formControlName="countryCode" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.CONTACT.CODE_PLACEHOLDER' | translate">
            <mat-error *ngIf="profileForm.get('countryCode')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.CODE_REQUIRED' | translate }}
            </mat-error>
            <mat-error *ngIf="profileForm.get('countryCode')?.hasError('pattern')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.CODE_PATTERN' | translate }}
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="three-quarters">
            <mat-label>{{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.PHONE' | translate }}</mat-label>
            <input matInput formControlName="phoneNumber" [placeholder]="'CREATE_PROFILE.PROFILE_FORM.CONTACT.PHONE_PLACEHOLDER' | translate">
            <mat-icon matSuffix>phone</mat-icon>
            <mat-error *ngIf="profileForm.get('phoneNumber')?.hasError('required')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.PHONE_REQUIRED' | translate }}
            </mat-error>
            <mat-error *ngIf="profileForm.get('phoneNumber')?.hasError('pattern')">
              {{ 'CREATE_PROFILE.PROFILE_FORM.CONTACT.PHONE_PATTERN' | translate }}
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <div class="form-actions">
        <button type="button"
                mat-button
                (click)="onCancel()"
                [disabled]="isLoading">
          {{ 'CREATE_PROFILE.PROFILE_FORM.CANCEL' | translate }}
        </button>

        <button type="submit"
                mat-raised-button
                color="primary"
                [disabled]="profileForm.invalid || isLoading">
          {{ isLoading ? ('CREATE_PROFILE.PROFILE_FORM.LOADING' | translate) : (editMode ? ('CREATE_PROFILE.PROFILE_FORM.UPDATE' | translate) : ('CREATE_PROFILE.PROFILE_FORM.CREATE' | translate)) }}
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
  translate : TranslateService= inject(TranslateService);
  setLanguage(lang: string): void {
    this.translate.use(lang);
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
