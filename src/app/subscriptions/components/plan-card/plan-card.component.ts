import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Plan } from '../../model/plan.model';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.css']
})
export class PlanCardComponent {
  @Input() plan!: Plan;
  @Input() isLoading = false;
  @Input() period: 'monthly' | 'annual' = 'monthly';

  @Output() subscribe = new EventEmitter<{ planId: string; periodicity: 'monthly'|'annual' }>();

  onSubscribe(): void {
    this.subscribe.emit({ planId: this.plan.id, periodicity: this.period });
  }
}
