import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { MembershipCardComponent } from '../../components/membership-card/membership-card.component';
import { PricingPlanComponent, PricingPlan } from '../../components/pricing-plan/pricing-plan.component';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription, SubscriptionPlanType, SubscriptionStatus } from '../../model/subscription.entity';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    RouterLink,
    ToolbarComponent,
    TranslateModule
  ],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {
  selectedPeriod: 'monthly' | 'annual' = 'monthly';
  currentSubscription: Subscription | null = null;
  isLoading = false;

  plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Plan Gratuito',
      price: 0,
      period: 'monthly',
      features: [
        'Hasta 4 macetas inteligentes',
        'Monitoreo básico de sensores',
        'Alertas de riego',
        'Historial de datos por 7 días'
      ],
      limitations: [
        'Sin reportes semanales',
        'Sin programación de riego automático',
        'Sin recomendaciones avanzadas'
      ]
    }
  ];

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadCurrentSubscription();
    this.updatePlans();
  }

  loadCurrentSubscription(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.isLoading = true;
    this.subscriptionService.getMySubscription(token).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.isPremium && response.subscription) {
          const subData = response.subscription;
          this.currentSubscription = new Subscription(
            subData.id,
            subData.uid,
            subData.subscriptionId,
            subData.planType as SubscriptionPlanType,
            subData.status as SubscriptionStatus,
            new Date(subData.startDate),
            subData.endDate ? new Date(subData.endDate) : undefined,
            subData.cancelledAt ? new Date(subData.cancelledAt) : undefined
          );
        }
        this.updatePlans();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading subscription:', error);
      }
    });
  }

  updatePlans(): void {
    const premiumPlan: PricingPlan = {
      id: 'premium',
      name: 'Plan Premium',
      price: this.selectedPeriod === 'annual' ? 99.50 : 9.99,
      period: this.selectedPeriod,
      features: [
        'Macetas inteligentes ilimitadas',
        'Monitoreo avanzado de sensores',
        'Alertas personalizables',
        'Historial de datos ilimitado',
        'Reportes semanales detallados',
        'Programación de riego automático',
        'Recomendaciones personalizadas',
        'Soporte personalizado',
        'Acceso anticipado a nuevas funciones'
      ],
      isPopular: true
    };

    // Mark current plan
    if (this.currentSubscription?.isPremium) {
      premiumPlan.isCurrent = true;
    } else {
      this.plans[0].isCurrent = true;
    }

    this.plans = [this.plans[0], premiumPlan];
  }

  selectPeriod(period: 'monthly' | 'annual'): void {
    this.selectedPeriod = period;
    this.updatePlans();
  }

  onSelectPlan(plan: PricingPlan): void {
    if (plan.id === 'premium') {
      // Navigate to payment with selected period
      // You can pass the period as query parameter
      console.log('Navigate to payment with period:', this.selectedPeriod);
    }
  }
}
