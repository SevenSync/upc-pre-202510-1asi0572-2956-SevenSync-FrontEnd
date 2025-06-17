import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubscriptionService } from '../../application/subscription.service';
import { Plan } from '../../domain/plan.model';

@Component({
  selector: 'app-plans-comparison',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './plans-comparison.component.html',
  styleUrls: ['./plans-comparison.component.scss']
})
export class PlansComparisonComponent implements OnInit {
  plans: Plan[] = [];
  displayedColumns = ['feature', 'free', 'premium'];

  // Estados de UI
  isLoading = false;
  hasError = false;
  errorMsg = '';

  constructor(private subscriptionSvc: SubscriptionService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  private loadOffers(): void {
    this.isLoading = true;
    this.hasError = false;
    this.subscriptionSvc.getOffers().subscribe({
      next: offers => {
        this.plans = offers;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error al cargar planes', err);
        this.errorMsg = '¡Ups! No pudimos cargar las membresías disponibles. Por favor, revisa tu conexión o intenta recargar la página.';
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  onSubscribe(planId: string, periodicity: 'monthly' | 'annual'): void {
    // Mientras el checkout ocurre, puedes bloquear UI si quieres:
    this.isLoading = true;
    // Placeholder: simular userId actual
    const userId = 'user123';
    this.subscriptionSvc.checkout(userId, planId, periodicity).subscribe({
      next: session => {
        // Redirigir a Stripe Checkout real
        window.location.href = session.url;
      },
      error: err => {
        console.error('Error al iniciar checkout', err);
        this.errorMsg = 'No pudimos iniciar el pago. Por favor, intenta de nuevo más tarde.';
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}