// src/app/subscriptions/pages/payment-error-page/payment-error-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment-error-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './payment-error-page.component.html',
  styleUrls: ['./payment-error-page.component.css']
})
export class PaymentErrorPageComponent {
  errorMessage = 'Tu pago fue rechazado. Verifica los datos de tu tarjeta o intenta con otra forma de pago.';

  constructor(private router: Router) {}

  onRetry(): void {
    this.router.navigate(['/memberships']);
  }
}
