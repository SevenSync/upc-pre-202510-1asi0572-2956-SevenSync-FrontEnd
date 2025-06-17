import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../application/subscription/subscription.service';

@Component({
  selector: 'app-cancel-subscription',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.scss']
})
export class CancelSubscriptionComponent {
  isLoading = false;

  constructor(
    private subscriptionSvc: SubscriptionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onConfirmCancel(): void {
    this.isLoading = true;
    const userId = 'user123'; // placeholder, reemplaza luego
    this.subscriptionSvc.cancel(userId).subscribe({
      next: status => {
        this.isLoading = false;
        this.snackBar.open(
          `Se ha programado la cancelación. Tu cuenta permanecerá Premium hasta ${status.endDate}.`,
          'Cerrar',
          { duration: 5000 }
        );
        this.router.navigate(['/account/subscription']);
      },
      error: err => {
        console.error('Error al cancelar suscripción', err);
        this.isLoading = false;
        this.snackBar.open(
          'No pudimos cancelar tu suscripción. Por favor, inténtalo más tarde.',
          'Cerrar',
          { duration: 5000 }
        );
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/account/subscription']);
  }
}