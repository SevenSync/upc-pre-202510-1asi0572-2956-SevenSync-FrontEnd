import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { SubscriptionService } from '../../services/subscription.service';
import { Plan } from '../../model/plan.model';
import { MembershipStatus } from '../../model/membership-status.model';

import { PlanCardComponent } from '../../components/plan-card/plan-card.component';
import { PlansTableComponent } from '../../components/plans-table/plans-table.component';
import { SpinnerErrorComponent } from '../../components/spinner-error/spinner-error.component';

@Component({
  selector: 'app-plans-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PlanCardComponent,
    PlansTableComponent,
    SpinnerErrorComponent
  ],
  templateUrl: './plans-page.component.html',
  styleUrls: ['./plans-page.component.css']
})
export class PlansPageComponent implements OnInit {
  plans: Plan[] = [];
  status?: MembershipStatus;
  isLoading = false;
  errorMsg = '';

  /** 'monthly' o 'annual' */
  selectedPeriod: 'monthly' | 'annual' = 'monthly';

  constructor(private subscriptionSvc: SubscriptionService) {}

  ngOnInit(): void {
    this.loadStatus();
    this.loadOffers();
  }

  private loadStatus(): void {
    const userId = 'user123'; // placeholder: reemplaza por el real cuando lo tengas
    this.subscriptionSvc.getStatus(userId).subscribe({
      next: st => this.status = st,
      error: () => {
        // Si falla, no bloqueamos todo, pero no mostramos banner
        console.error('Error al cargar estado de membresía');
      }
    });
  }

  private loadOffers(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.subscriptionSvc.getOffers().subscribe({
      next: offers => {
        this.plans = offers;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = '¡Ups! No pudimos cargar las membresías. Intenta recargar la página.';
        this.isLoading = false;
      }
    });
  }

  onSubscribe(event: { planId: string; periodicity: 'monthly'|'annual' }): void {
    const { planId, periodicity } = event;
    const userId = 'user123'; // placeholder
    this.isLoading = true;
    this.subscriptionSvc.checkout(userId, planId, periodicity).subscribe({
      next: session => window.location.href = session.url,
      error: () => {
        this.errorMsg = 'No pudimos iniciar el pago. Intenta más tarde.';
        this.isLoading = false;
      }
    });
  }
}
