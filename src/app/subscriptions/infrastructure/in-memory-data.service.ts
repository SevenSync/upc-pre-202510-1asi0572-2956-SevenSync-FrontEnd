import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Plan } from '../domain/plan.model';
import { CheckoutSession } from '../domain/checkout-session.model';
import { MembershipStatus } from '../domain/membership-status.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const offers: Plan[] = [
      {
        id: 'free',
        name: 'Free',
        priceMonthly: 0,
        priceYearly: 0,
        maxPots: 3,
        features: [
          'Monitoreo básico',
          'Acceso a comunidad',
          'Notificaciones por email'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        priceMonthly: 9.99,
        priceYearly: 99.99,
        maxPots: 10,
        features: [
          'Monitoreo avanzado',
          'Control de riego automático',
          'Integración con asistentes de voz',
          'Soporte prioritario'
        ]
      }
    ];

    // Estado simulado de un usuario premium (solo para demo)
    const statuses: MembershipStatus[] = [
      {
        planId: 'premium',
        status: 'active',
        startDate: '2025-05-01',
        endDate: '2025-06-01',
        daysRemaining: 18
      }
    ];

    // CheckoutSession de prueba
    const checkoutSessions: CheckoutSession[] = [
      {
        sessionId: 'sess_123',
        url: 'https://checkout.stripe.com/pay/sess_123'
      }
    ];

    return { 
      'subscriptions/offers': offers, 
      'subscriptions/status/user123': statuses[0], 
      'subscriptions/checkout': checkoutSessions,
      'subscriptions/cancel': statuses[0]
    };
  }
}