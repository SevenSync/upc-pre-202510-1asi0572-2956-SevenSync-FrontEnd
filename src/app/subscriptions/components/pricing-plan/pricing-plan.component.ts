import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  limitations?: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

@Component({
  selector: 'app-pricing-plan',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="plan_card"
         [class.plan_card_free]="plan.id === 'free'"
         [class.plan_card_premium]="plan.id !== 'free'">

      <div class="plan_head"
           [class.plan_head_premium]="plan.id !== 'free'">
        <div class="plan_title">
          <div class="crown" *ngIf="plan.id !== 'free'">
            <mat-icon class="material-symbols-outlined icon">crown</mat-icon>
            <h2>{{ plan.name }}</h2>
          </div>
          <h2 *ngIf="plan.id === 'free'">{{ plan.name }}</h2>
          <span>{{ getSubtitle() }}</span>
        </div>
        <h2>{{ getFormattedPrice() }}</h2>
      </div>

      <div class="plan_body">
        <h3>{{ getIncludesText() }}</h3>

        <div *ngFor="let feature of plan.features" class="feature">
          <mat-icon class="material-symbols-outlined"
                    [class.free_icon]="plan.id === 'free'"
                    [class.premium_icon]="plan.id !== 'free'">
            check
          </mat-icon>
          {{ feature }}
        </div>

        <div *ngIf="plan.limitations && plan.limitations.length > 0">
          <h3>Limitaciones:</h3>
          <ul>
            <li *ngFor="let limitation of plan.limitations">{{ limitation }}</li>
          </ul>
        </div>

        <button *ngIf="plan.isCurrent" class="current_membership">
          Plan Actual
        </button>

        <button *ngIf="!plan.isCurrent && plan.id !== 'free'"
                class="upgrade_button"
                (click)="onSelectPlan()">
          <mat-icon class="material-symbols-outlined crown-icon">crown</mat-icon>
          Actualizar a Premium
        </button>
      </div>
    </div>
  `,
  styles: [`
    .plan_card_free, .plan_card_premium {
    display: flex;
    flex-direction: column;
    width: 30%;
    background-color: white;
    border-radius: 10px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
  }

  .plan_card_free {
    border: 1px solid #2ECC71;
  }

  .plan_card_premium {
    border: 1px solid #E67E22;
    position: relative;
  }

  .plan_card_free:hover,
  .plan_card_premium:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .plan_head, .plan_head_premium {
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .plan_head_premium {
    background: linear-gradient(90deg, #FFF8DD 36.54%, #FFEFB0 65.38%);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .plan_title {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .crown {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .crown .icon {
    font-size: 30px;
    height: 30px;
    width: 30px;
    color: #FFD700;
    font-variation-settings: 'FILL' 1;
  }

  .plan_title h2 {
    margin: 0;
    font-size: 1.3rem;
    color: #333;
  }

  .plan_title span {
    font-size: 0.9rem;
    color: #666;
  }

  .plan_head h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #296244;
    margin: 0;
  }

  .plan_body {
    padding: 20px 25px 30px 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;
  }

  .plan_body h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1rem;
    font-weight: 600;
  }

  .feature {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    padding: 8px 0;
    color: #555;
  }

  .feature mat-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
  }

  .free_icon {
    color: #2ECC71;
  }

  .premium_icon {
    color: #E67E22;
  }

  .plan_body ul {
    padding-left: 20px;
    margin: 10px 0;
    color: #666;
  }

  .plan_body ul li {
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  .current_membership {
    font-weight: bold;
    padding: 12px 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
    border: 2px dashed #296244;
    color: #296244;
    text-align: center;
    margin-top: auto;
    cursor: default;
  }

  .upgrade_button {
    padding: 12px 20px;
    font-size: 0.95rem;
    background-color: #E67E22;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    font-weight: 600;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .upgrade_button:hover {
    background-color: #d35400;
    transform: translateY(-1px);
  }

  .upgrade_button:active {
    transform: translateY(0);
  }

  .upgrade_button mat-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
  }

  /* Popular badge para plan premium */
  .plan_card_premium::before {
    content: "Más Popular";
    position: absolute;
    top: 15px;
    right: -25px;
    background-color: #E67E22;
    color: white;
    padding: 4px 30px;
    font-size: 0.8rem;
    font-weight: 600;
    transform: rotate(45deg);
    z-index: 1;
  }

  @media (max-width: 768px) {
    .plan_card_free, .plan_card_premium {
      width: 100%;
      margin-bottom: 20px;
    }

    .plan_head, .plan_head_premium {
      padding: 16px 20px;
    }

    .plan_body {
      padding: 16px 20px 24px 20px;
    }

    .crown {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }

    .plan_title h2 {
      font-size: 1.2rem;
    }

    .plan_head h2 {
      font-size: 1.8rem;
    }
  }

  `]
})
export class PricingPlanComponent {
  @Input() plan!: PricingPlan;
  @Output() selectPlan = new EventEmitter<PricingPlan>();

  getSubtitle(): string {
    if (this.plan.id === 'free') {
      return 'Funcionalidades Básicas';
    }
    return 'Funcionalidades Avanzadas';
  }

  getFormattedPrice(): string {
    if (this.plan.price === 0) {
      return '$0';
    }
    return `$${this.plan.price.toFixed(2)}`;
  }

  getIncludesText(): string {
    if (this.plan.id === 'free') {
      return 'Incluye:';
    }
    return 'Todo lo del plan gratuito, más:';
  }

  onSelectPlan(): void {
    this.selectPlan.emit(this.plan);
  }
}
