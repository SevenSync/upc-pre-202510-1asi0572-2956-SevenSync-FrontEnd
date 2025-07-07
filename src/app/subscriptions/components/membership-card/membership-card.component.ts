import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Subscription } from '../../model/subscription.entity';

@Component({
  selector: 'app-membership-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  template: `
    <div class="membership_card">
      <div class="membership_info">
        <h3>Tu membresía actual</h3>
        <div class="current_membership">
          <mat-icon class="material-symbols-outlined icon"
                    [class.premium]="subscription?.isPremium"
                    [class.free]="!subscription?.isPremium">
            {{ subscription?.isPremium ? 'crown' : 'nest_eco_leaf' }}
          </mat-icon>
          <span>{{ getMembershipText() }}</span>
        </div>
        <div *ngIf="subscription?.isPremium && subscription?.daysRemaining" class="days-remaining">
          {{ subscription?.daysRemaining }} días restantes
        </div>
      </div>
      <button *ngIf="!subscription?.isPremium" class="upgrade_button">
        <mat-icon class="material-symbols-outlined crown-icon">crown</mat-icon>
        <a routerLink="/payment">Actualizar a Premium</a>
      </button>
      <button *ngIf="subscription?.isPremium" class="manage_button" (click)="onManageSubscription()">
        <mat-icon class="material-symbols-outlined">settings</mat-icon>
        Gestionar Plan
      </button>
    </div>
  `,
  styles: [`
    .membership_card {
      width: 90%;
      background-color: rgba(175, 232, 199, 0.75);
      border-radius: 10px;
      border: 1px solid #296244;
      padding: 10px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    .membership_info {
      display: flex;
      flex-direction: column;
    }
    .current_membership {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .icon {
      font-size: 30px;
      height: 30px;
      width: 30px;
    }
    .icon.free {
      color: #2ECC71;
    }
    .icon.premium {
      color: #FFD700;
      font-variation-settings: 'FILL' 1;
    }
    .days-remaining {
      font-size: 0.9rem;
      color: #666;
      margin-top: 5px;
    }
    .upgrade_button, .manage_button {
      padding: 10px 25px;
      font-size: 15px;
      background-color: #E67E22;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    .manage_button {
      background-color: #296244;
    }
    .upgrade_button a, .manage_button a {
      color: white;
      text-decoration: none;
    }
  `]
})
export class MembershipCardComponent {
  @Input() subscription: Subscription | null = null;

  getMembershipText(): string {
    if (!this.subscription || !this.subscription.isPremium) {
      return 'Plan Gratuito';
    }

    switch (this.subscription.planType) {
      case 'PREMIUM_MONTHLY':
        return 'Plan Premium (Mensual)';
      case 'PREMIUM_ANNUAL':
        return 'Plan Premium (Anual)';
      default:
        return 'Plan Premium';
    }
  }

  onManageSubscription(): void {
    // Navigate to subscription management or show cancel dialog
    console.log('Manage subscription');
  }
}
