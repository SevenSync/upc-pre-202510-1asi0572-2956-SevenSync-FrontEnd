import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

export interface CheckoutData {
  paymentMethod: 'card' | 'paypal';
  cardNumber?: string;
  fullName?: string;
  expiryDate?: string;
  cvv?: string;
  billingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule
  ],
  template: `
    <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="checkout-form">
      <!-- Método de pago -->
      <div class="section">
        <h3 class="section-title">Método de pago</h3>

        <mat-radio-group formControlName="paymentMethod" class="payment-methods">
          <div class="payment-option"
               [class.selected]="checkoutForm.get('paymentMethod')?.value === 'card'">
            <mat-radio-button value="card" class="payment-radio">
              <div class="payment-info">
                <mat-icon class="payment-icon">credit_card</mat-icon>
                <div class="payment-text">
                  <span class="payment-title">Tarjeta de crédito o débito</span>
                  <span class="payment-description">Visa, Mastercard, American Express</span>
                </div>
              </div>
            </mat-radio-button>
          </div>

          <div class="payment-option"
               [class.selected]="checkoutForm.get('paymentMethod')?.value === 'paypal'">
            <mat-radio-button value="paypal" class="payment-radio">
              <div class="payment-info">
                <img src="assets/paypal-icon.png" alt="PayPal" class="paypal-icon">
                <div class="payment-text">
                  <span class="payment-title">PayPal</span>
                  <span class="payment-description">Paga con tu cuenta PayPal</span>
                </div>
              </div>
            </mat-radio-button>
          </div>
        </mat-radio-group>
      </div>

      <!-- Detalles de la tarjeta (solo si es tarjeta) -->
      <div *ngIf="checkoutForm.get('paymentMethod')?.value === 'card'" class="section">
        <h3 class="section-title">Información de la tarjeta</h3>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Número de tarjeta</mat-label>
            <input matInput
                   formControlName="cardNumber"
                   placeholder="1234 5678 9012 3456"
                   maxlength="19">
            <mat-icon matSuffix>credit_card</mat-icon>
            <mat-error *ngIf="checkoutForm.get('cardNumber')?.hasError('required')">
              El número de tarjeta es requerido
            </mat-error>
            <mat-error *ngIf="checkoutForm.get('cardNumber')?.hasError('pattern')">
              Número de tarjeta inválido
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nombre del titular</mat-label>
            <input matInput
                   formControlName="fullName"
                   placeholder="Juan Pérez">
            <mat-error *ngIf="checkoutForm.get('fullName')?.hasError('required')">
              El nombre es requerido
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Fecha de expiración</mat-label>
            <input matInput
                   formControlName="expiryDate"
                   placeholder="MM/AA"
                   maxlength="5">
            <mat-error *ngIf="checkoutForm.get('expiryDate')?.hasError('required')">
              La fecha es requerida
            </mat-error>
            <mat-error *ngIf="checkoutForm.get('expiryDate')?.hasError('pattern')">
              Formato: MM/AA
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>CVV</mat-label>
            <input matInput
                   formControlName="cvv"
                   placeholder="123"
                   maxlength="4"
                   type="password">
            <mat-icon matSuffix>lock</mat-icon>
            <mat-error *ngIf="checkoutForm.get('cvv')?.hasError('required')">
              El CVV es requerido
            </mat-error>
            <mat-error *ngIf="checkoutForm.get('cvv')?.hasError('pattern')">
              CVV inválido
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <!-- Dirección de facturación -->
      <div class="section">
        <h3 class="section-title">Dirección de facturación</h3>

        <div class="form-row">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Dirección</mat-label>
            <input matInput formControlName="street" placeholder="Av. Principal 123">
            <mat-error *ngIf="checkoutForm.get('street')?.hasError('required')">
              La dirección es requerida
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Ciudad</mat-label>
            <input matInput formControlName="city" placeholder="Lima">
            <mat-error *ngIf="checkoutForm.get('city')?.hasError('required')">
              La ciudad es requerida
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter-width">
            <mat-label>Código Postal</mat-label>
            <input matInput formControlName="postalCode" placeholder="15001">
            <mat-error *ngIf="checkoutForm.get('postalCode')?.hasError('required')">
              El código postal es requerido
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="quarter-width">
            <mat-label>País</mat-label>
            <mat-select formControlName="country">
              <mat-option value="PE">Perú</mat-option>
              <mat-option value="CO">Colombia</mat-option>
              <mat-option value="MX">México</mat-option>
              <mat-option value="AR">Argentina</mat-option>
              <mat-option value="CL">Chile</mat-option>
            </mat-select>
            <mat-error *ngIf="checkoutForm.get('country')?.hasError('required')">
              El país es requerido
            </mat-error>
          </mat-form-field>
        </div>
      </div>

      <!-- Botón de submit -->
      <div class="form-actions">
        <p class="security-notice">
          <mat-icon>lock</mat-icon>
          Tu información de pago está segura y encriptada
        </p>

        <button type="submit"
                mat-raised-button
                color="primary"
                class="checkout-button"
                [disabled]="checkoutForm.invalid || isLoading">
          <mat-icon>{{ checkoutForm.get('paymentMethod')?.value === 'paypal' ? 'account_balance' : 'credit_card' }}</mat-icon>
          {{ isLoading ? 'Procesando...' : 'Procesar Pago' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .checkout-form {
      max-width: 600px;
      margin: 0 auto;
    }

    .section {
      margin-bottom: 32px;
      padding: 24px;
      background-color: #f8f9fa;
      border-radius: 12px;
      border: 1px solid #e9ecef;
    }

    .section-title {
      color: #296244;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 20px 0;
    }

    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .payment-option {
      border: 2px solid #e9ecef;
      border-radius: 8px;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .payment-option.selected {
      border-color: #2ecc71;
      background-color: #f0f9ff;
    }

    .payment-radio {
      width: 100%;
      padding: 16px;
      margin: 0;
    }

    .payment-info {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .payment-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #666;
    }

    .paypal-icon {
      width: 32px;
      height: 32px;
    }

    .payment-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .payment-title {
      font-weight: 600;
      color: #333;
    }

    .payment-description {
      font-size: 0.9rem;
      color: #666;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .full-width {
      flex: 1;
    }

    .half-width {
      flex: 1;
    }

    .quarter-width {
      flex: 0 0 30%;
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-top: 32px;
    }

    .security-notice {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }

    .security-notice mat-icon {
      color: #4caf50;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .checkout-button {
      width: 100%;
      height: 52px;
      font-size: 1.1rem;
      font-weight: 600;
      background-color: #2ecc71;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .checkout-form {
        max-width: 100%;
      }

      .section {
        padding: 16px;
        margin-bottom: 20px;
      }

      .form-row {
        flex-direction: column;
        gap: 16px;
      }

      .half-width,
      .quarter-width {
        flex: none;
      }

      .payment-info {
        gap: 12px;
      }
    }
  `]
})
export class CheckoutFormComponent {
  @Input() isLoading = false;
  @Output() checkoutSubmit = new EventEmitter<CheckoutData>();

  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      paymentMethod: ['card', Validators.required],
      cardNumber: [''],
      fullName: [''],
      expiryDate: [''],
      cvv: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['PE', Validators.required]
    });

    // Add conditional validators for card payment
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const cardFields = ['cardNumber', 'fullName', 'expiryDate', 'cvv'];

      if (method === 'card') {
        cardFields.forEach(field => {
          this.checkoutForm.get(field)?.setValidators([Validators.required]);
          if (field === 'cardNumber') {
            this.checkoutForm.get(field)?.setValidators([
              Validators.required,
              Validators.pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)
            ]);
          }
          if (field === 'expiryDate') {
            this.checkoutForm.get(field)?.setValidators([
              Validators.required,
              Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
            ]);
          }
          if (field === 'cvv') {
            this.checkoutForm.get(field)?.setValidators([
              Validators.required,
              Validators.pattern(/^\d{3,4}$/)
            ]);
          }
        });
      } else {
        cardFields.forEach(field => {
          this.checkoutForm.get(field)?.clearValidators();
        });
      }

      cardFields.forEach(field => {
        this.checkoutForm.get(field)?.updateValueAndValidity();
      });
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const formValue = this.checkoutForm.value;

      const checkoutData: CheckoutData = {
        paymentMethod: formValue.paymentMethod,
        billingAddress: {
          street: formValue.street,
          city: formValue.city,
          postalCode: formValue.postalCode,
          country: formValue.country
        }
      };

      if (formValue.paymentMethod === 'card') {
        checkoutData.cardNumber = formValue.cardNumber;
        checkoutData.fullName = formValue.fullName;
        checkoutData.expiryDate = formValue.expiryDate;
        checkoutData.cvv = formValue.cvv;
      }

      this.checkoutSubmit.emit(checkoutData);
    }
  }

  // Format card number as user types
  onCardNumberInput(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();

    if (formattedValue.length > 19) {
      formattedValue = formattedValue.substring(0, 19);
    }

    this.checkoutForm.get('cardNumber')?.setValue(formattedValue);
  }

  // Format expiry date as user types
  onExpiryDateInput(event: any): void {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    this.checkoutForm.get('expiryDate')?.setValue(value);
  }
}
