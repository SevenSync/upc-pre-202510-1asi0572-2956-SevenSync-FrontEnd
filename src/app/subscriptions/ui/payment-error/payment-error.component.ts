import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.scss']
})
export class PaymentErrorComponent {
  errorMessage = 'Tu pago fue rechazado. Por favor, verifica los datos de tu tarjeta o intenta con otra forma de pago.';

  constructor(private router: Router) {}

  onRetry(): void {
    this.router.navigate(['/memberships']);
  }
}
