import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../../domain/plan.model';
import { SubscriptionApiService } from '../../infrastructure/subscription-api/subscription-api.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  constructor(private api: SubscriptionApiService) {}

  /**
   * Devuelve la lista de planes disponibles.
   */
  getOffers(): Observable<Plan[]> {
    return this.api.getOffers();
  }

  // Más adelante añadiremos aquí métodos como checkout(), getStatus(), cancel(), etc.
}