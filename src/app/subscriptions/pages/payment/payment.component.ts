import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { CheckoutService } from '../../services/checkout.service';
import {CheckoutSubscriptionRequest} from '../../model/checkout-session.request';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    RouterLink,
    ToolbarComponent
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  selectedPeriod: 'monthly' | 'annual' = 'monthly';
  selectedPaymentMethod = 'card';
  isLoading = false;
  errorMessage = '';

  // Form fields
  cardNumber = '';
  fullName = '';
  expiryDate = '';
  cvv = '';

  constructor(
    private checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get period from query params if available
    this.route.queryParams.subscribe(params => {
      if (params['period']) {
        this.selectedPeriod = params['period'];
      }
    });
  }

  selectPeriod(period: 'monthly' | 'annual'): void {
    this.selectedPeriod = period;
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  getPrice(): string {
    return this.selectedPeriod === 'annual' ? '$99.50' : '$9.99';
  }

  getSku(): string {
    return this.selectedPeriod === 'annual' ? 'PREMIUM_ANNUAL' : 'PREMIUM_MONTHLY';
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');

    if (!token || !email) {
      this.router.navigate(['/login']);
      return;
    }

    const request = new CheckoutSubscriptionRequest(email, this.getSku());

    this.checkoutService.createCheckoutSession(request, token).subscribe({
      next: (response) => {
        this.isLoading = false;
        // In a real app, you would redirect to Stripe checkout
        // For demo purposes, we'll simulate success
        console.log('Checkout URL:', response.checkoutUrl);
        this.router.navigate(['/payment-done']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Payment error:', error);
        this.errorMessage = 'Error al procesar el pago. Intenta nuevamente.';
      }
    });
  }

  private validateForm(): boolean {
    if (this.selectedPaymentMethod === 'card') {
      return !!(this.cardNumber && this.fullName && this.expiryDate && this.cvv);
    }
    return true; // For PayPal, no form validation needed
  }
}
