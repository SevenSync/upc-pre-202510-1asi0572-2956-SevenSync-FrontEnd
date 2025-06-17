// src/app/subscriptions/ui/payment-success/payment-success.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  nextPaymentDate?: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí podríamos leer query params o llamar al API para refrescar estado
    // Por ahora, placeholder:
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    this.nextPaymentDate = now.toLocaleDateString();
  }

  onGoToAccount(): void {
    this.router.navigate(['/account/subscription']);
  }
}