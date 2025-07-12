import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CheckoutFormComponent, CheckoutData } from '../checkout-form/checkout-form.component';

export interface PaymentSummary {
  planName: string;
  period: 'monthly' | 'annual';
  price: number;
  discount?: number;
  tax?: number;
  total: number;
  features: string[];
}

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CheckoutFormComponent
  ],
  template: `
    <div class="payment-container">
      <!-- Payment Form -->
      <div class="payment-section">
        <mat-card class="payment-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>payment</mat-icon>
              Información de Pago
            </mat-card-title>
            <mat-card-subtitle>
              Completa los detalles para procesar tu suscripción
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <app-checkout-form
              [isLoading]="isLoading"
              (checkoutSubmit)="onCheckoutSubmit($event)">
            </app-checkout-form>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Payment Summary -->
      <div class="summary-section">
        <mat-card class="summary-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>receipt</mat-icon>
              Resumen del Pedido
            </mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <div class="plan-info">
              <div class="plan-header">
                <mat-icon class="plan-icon">crown</mat-icon>
                <div class="plan-details">
                  <h3>{{ summary.planName }}</h3>
                  <p>{{ summary.period === 'annual' ? 'Facturación anual' : 'Facturación mensual' }}</p>
                </div>
              </div>

              <div *ngIf="summary.period === 'annual'" class="discount-badge">
                <mat-icon>local_offer</mat-icon>
                <span>¡Ahorra 17%!</span>
              </div>
            </div>

            <mat-divider></mat-divider>

            <div class="pricing-breakdown">
              <div class="pricing-item">
                <span>Subtotal</span>
                <span>${{ summary.price.toFixed(2) }}</span>
              </div>

              <div *ngIf="summary.discount" class="pricing-item discount">
                <span>Descuento</span>
                <span>-${{ summary.discount.toFixed(2) }}</span>
              </div>

              <div class="pricing-item">
                <span>Impuestos</span>
                <span>${{ (summary.tax || 0).toFixed(2) }}</span>
              </div>

              <mat-divider></mat-divider>

              <div class="pricing-item total">
                <span>Total</span>
                <span>${{ summary.total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="features-summary">
              <h4>Incluye:</h4>
              <ul class="features-list">
                <li *ngFor="let feature of summary.features" class="feature-item">
                  <mat-icon class="feature-icon">check</mat-icon>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="billing-info">
              <div class="billing-item">
                <mat-icon>schedule</mat-icon>
                <div class="billing-text">
                  <span class="billing-title">Próxima facturación</span>
                  <span class="billing-description">{{ getNextBillingDate() }}</span>
                </div>
              </div>

              <div class="billing-item">
                <mat-icon>autorenew</mat-icon>
                <div class="billing-text">
                  <span class="billing-title">Renovación automática</span>
                  <span class="billing-description">Puedes cancelar en cualquier momento</span>
                </div>
              </div>
            </div>

            <div class="guarantee">
              <mat-icon>verified_user</mat-icon>
              <div class="guarantee-text">
                <strong>Garantía de satisfacción</strong>
                <p>Si no estás satisfecho, cancela dentro de los primeros 30 días para un reembolso completo.</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .payment-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .payment-card,
    .summary-card {
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .payment-card mat-card-header,
    .summary-card mat-card-header {
      background-color: #f8f9fa;
      margin: -24px -24px 24px -24px;
      padding: 24px;
      border-radius: 16px 16px 0 0;
    }

    .payment-card mat-card-title,
    .summary-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #296244;
      font-size: 1.3rem;
      margin-bottom: 8px;
    }

    .payment-card mat-card-subtitle,
    .summary-card mat-card-subtitle {
      color: #666;
      margin: 0;
    }

    .plan-info {
      margin-bottom: 20px;
    }

    .plan-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
    }

    .plan-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #ffd700;
      font-variation-settings: 'FILL' 1;
    }

    .plan-details h3 {
      color: #333;
      margin: 0 0 4px 0;
      font-size: 1.2rem;
    }

    .plan-details p {
      color: #666;
      margin: 0;
      font-size: 0.9rem;
    }

    .discount-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: #e8f5e8;
      color: #2ecc71;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      width: fit-content;
    }

    .discount-badge mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .pricing-breakdown {
      margin: 20px 0;
    }

    .pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      font-size: 0.95rem;
    }

    .pricing-item.discount {
      color: #2ecc71;
      font-weight: 500;
    }

    .pricing-item.total {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      padding: 12px 0;
    }

    .features-summary {
      margin: 24px 0;
    }

    .features-summary h4 {
      color: #333;
      margin: 0 0 12px 0;
      font-size: 1rem;
    }

    .features-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 0;
      font-size: 0.9rem;
      color: #666;
    }

    .feature-icon {
      color: #2ecc71;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .billing-info {
      margin: 24px 0;
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .billing-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }

    .billing-item:last-child {
      margin-bottom: 0;
    }

    .billing-item mat-icon {
      color: #296244;
      font-size: 20px;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .billing-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .billing-title {
      font-weight: 500;
      color: #333;
      font-size: 0.9rem;
    }

    .billing-description {
      color: #666;
      font-size: 0.8rem;
    }

    .guarantee {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background-color: #e3f2fd;
      border-radius: 8px;
      margin-top: 20px;
    }

    .guarantee mat-icon {
      color: #1976d2;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .guarantee-text strong {
      color: #1976d2;
      font-size: 0.9rem;
      display: block;
      margin-bottom: 4px;
    }

    .guarantee-text p {
      color: #666;
      font-size: 0.8rem;
      margin: 0;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .payment-container {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 16px;
      }

      .plan-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .billing-info,
      .guarantee {
        padding: 12px;
      }
    }
  `]
})
export class PaymentFormComponent {
  @Input() summary!: PaymentSummary;
  @Input() isLoading = false;
  @Output() paymentSubmit = new EventEmitter<CheckoutData>();

  onCheckoutSubmit(checkoutData: CheckoutData): void {
    this.paymentSubmit.emit(checkoutData);
  }

  getNextBillingDate(): string {
    const today = new Date();
    const nextBilling = new Date(today);

    if (this.summary.period === 'annual') {
      nextBilling.setFullYear(today.getFullYear() + 1);
    } else {
      nextBilling.setMonth(today.getMonth() + 1);
    }

    return nextBilling.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
