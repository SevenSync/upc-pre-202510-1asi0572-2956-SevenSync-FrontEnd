import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SubscriptionService } from '../../services/subscription.service';
import { MembershipStatus } from '../../model/membership-status.model';
import { SpinnerErrorComponent } from '../../components/spinner-error/spinner-error.component';

@Component({
  selector: 'app-membership-status-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    SpinnerErrorComponent
  ],
  templateUrl: './membership-status-page.component.html',
  styleUrls: ['./membership-status-page.component.css']
})
export class MembershipStatusPageComponent implements OnInit {
  status?: MembershipStatus;
  isLoading = false;
  errorMsg = '';

  constructor(
    private subscriptionSvc: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus(): void {
    this.isLoading = true;
    this.errorMsg = '';
    const userId = 'user123'; // placeholder, luego reemplaza con real
    this.subscriptionSvc.getStatus(userId).subscribe({
      next: st => {
        this.status = st;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'No pudimos cargar el estado de tu membresía. Por favor, intenta más tarde.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/account/cancel']);
  }

  onBack(): void {
    this.router.navigate(['/memberships']);
  }
}
