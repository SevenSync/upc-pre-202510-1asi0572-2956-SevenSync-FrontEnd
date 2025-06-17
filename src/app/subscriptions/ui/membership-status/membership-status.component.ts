import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionService } from '../../application/subscription.service';
import { MembershipStatus } from '../../domain/membership-status.model';

@Component({
  selector: 'app-membership-status',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './membership-status.component.html',
  styleUrls: ['./membership-status.component.scss']
})
export class MembershipStatusComponent implements OnInit {
  status?: MembershipStatus;
  isLoading = false;
  hasError = false;
  errorMsg = '';

  constructor(private subscriptionSvc: SubscriptionService) {}

  ngOnInit(): void {
    this.loadStatus();
  }

  private loadStatus(): void {
    this.isLoading = true;
    this.hasError = false;
    const userId = 'user123'; // placeholder ¡luego reemplaza con el real!
    this.subscriptionSvc.getStatus(userId).subscribe({
      next: st => {
        this.status = st;
        this.isLoading = false;
      },
      error: err => {
        console.error('Error al cargar estado de membresía', err);
        this.errorMsg = 'No pudimos cargar el estado de tu membresía. Por favor, inténtalo más tarde.';
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    // Navegar a la ruta de cancelación o abrir un diálogo
    window.location.href = '/account/cancel';
  }
}
