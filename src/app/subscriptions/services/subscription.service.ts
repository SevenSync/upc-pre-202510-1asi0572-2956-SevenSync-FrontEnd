import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Plan } from '../model/plan.model';
import { MembershipStatus } from '../model/membership-status.model';
import { CheckoutSession } from '../model/checkout-session.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = '/api/subscriptions';

  constructor(private http: HttpClient) {}

  /** Obtiene la lista de planes (Free y Premium) */
  getOffers(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/offers`);
  }

  /** Inicia sesión de Checkout */
  checkout(email: string, sku: string): Observable<CheckoutSession> {
    return this.http.post<CheckoutSession>(
      `${this.baseUrl}/checkout`,
      { email, sku }
    );
  }

  /** Consulta el estado actual de la suscripción */
  getStatus(): Observable<MembershipStatus> {
    return this.http.get<MembershipStatus>(`${this.baseUrl}/status`);
  }

  /** Cancela la suscripción al final del periodo */
  cancel(uid: string): Observable<MembershipStatus> {
    return this.http.post<MembershipStatus>(
      `${this.baseUrl}/cancel`,
      { uid }
    );
  }
}
