import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../../domain/plan.model';
import { MembershipStatus } from '../../domain/membership-status.model';
import { CheckoutSession } from '../../domain/checkout-session.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApiService {
  private baseUrl = '/api/subscriptions';

  constructor(private http: HttpClient) {}

  /** Obtiene la lista de planes (Free y Premium) */
  getOffers(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/offers`);
  }

  /** Inicia sesión de Stripe Checkout */
  checkout(userId: string, planId: string, periodicity: 'monthly' | 'annual'): Observable<CheckoutSession> {
    return this.http.post<CheckoutSession>(
      `${this.baseUrl}/checkout`,
      { userId, planId, periodicity }
    );
  }

  /** Consulta el estado actual de la suscripción */
  getStatus(userId: string): Observable<MembershipStatus> {
    return this.http.get<MembershipStatus>(`${this.baseUrl}/status/${userId}`);
  }

  /** Cancela la suscripción al final del periodo */
  cancel(userId: string): Observable<MembershipStatus> {
    return this.http.post<MembershipStatus>(
      `${this.baseUrl}/cancel`,
      { userId }
    );
  }
}