// src/app/subscriptions/pages/payment-success-page/payment-success-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payment-success-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './payment-success-page.component.html',
  styleUrls: ['./payment-success-page.component.css']
})
export class PaymentSuccessPageComponent implements OnInit {
  nextPaymentDate!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const now = new Date();
    now.setMonth(now.getMonth() + 1);
    this.nextPaymentDate = now.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onGoToAccount(): void {
    this.router.navigate(['/account/subscription']);
  }
}
