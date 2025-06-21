// src/app/subscriptions/pages/cancel-subscription-page/cancel-subscription-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SubscriptionService } from '../../services/subscription.service';
import { SpinnerErrorComponent } from '../../components/spinner-error/spinner-error.component';

@Component({
  selector: 'app-cancel-subscription-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SpinnerErrorComponent
  ],
  templateUrl: './cancel-subscription-page.component.html',
  styleUrls: ['./cancel-subscription-page.component.css']
})
export class CancelSubscriptionPageComponent {
  isLoading = false;
  errorMsg = '';

  constructor(
    private subscriptionSvc: SubscriptionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onConfirmCancel(): void {
    this.isLoading = true;
    this.errorMsg = '';
    const userId = 'user123'; // placeholder
    this.subscriptionSvc.cancel(userId).subscribe({
      next: status => {
        this.isLoading = false;
        this.snackBar.open(
          `Tu suscripción se cancelará al finalizar el periodo: ${status.endDate}`,
          'Cerrar',
          { duration: 5000 }
        );
        this.router.navigate(['/account/subscription']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMsg = 'No pudimos cancelar tu suscripción. Intenta más tarde.';
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/account/subscription']);
  }
}
