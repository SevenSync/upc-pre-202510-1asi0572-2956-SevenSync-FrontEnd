import {Component, inject, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Subscription} from '../../../subscriptions/model/subscription.entity';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {SubscriptionService} from '../../../subscriptions/services/subscription.service';
import {SubscriptionPlanType, SubscriptionStatus} from '../../../subscriptions/model/subscription.entity';
import {TranslateModule, TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  currentSubscription: Subscription | null = null;
  isSignedIn = false;

  constructor(
    private authService: AuthenticationService,
    private subscriptionService: SubscriptionService,
    private router: Router,

  ) {}

  translate : TranslateService= inject(TranslateService);
  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.authService.isSignedIn.subscribe(signedIn => {
      this.isSignedIn = signedIn;
      if (signedIn) {
        this.loadSubscriptionStatus();
      }
    });
  }

  loadSubscriptionStatus(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.subscriptionService.getMySubscription(token).subscribe({
      next: (response) => {
        if (response.isPremium && response.subscription) {
          const subData = response.subscription;
          // ✅ CORREGIR: Usar constructor con parámetros opcionales
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
      },
      error: (error) => {
        console.error('Error loading subscription status:', error);
      }
    });
  }

  get isPremiumUser(): boolean {
    return this.currentSubscription?.isPremium ?? false;
  }

  navigateToHome(): void {
    this.router.navigate(['/pots']);
  }
}
