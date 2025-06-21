import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } 
  from '@angular/common/http/testing';

import { SubscriptionService } from './subscription.service';
import { Plan } from '../model/plan.model';
import { MembershipStatus } from '../model/membership-status.model';
import { CheckoutSession } from '../model/checkout-session.model';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let httpMock: HttpTestingController;
  const base = '/api/subscriptions';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubscriptionService]
    });
    service = TestBed.inject(SubscriptionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch offers (GET /offers)', () => {
    const dummy: Plan[] = [
      { sku: 'free', name: 'Free', tag: '', subtitle: '', includes: [], restrictions: [] }
    ] as any;

    service.getOffers().subscribe(plans => {
      expect(plans).toEqual(dummy);
    });

    const req = httpMock.expectOne(`${base}/offers`);
    expect(req.request.method).toBe('GET');
    req.flush(dummy);
  });

  it('should start checkout (POST /checkout)', () => {
    const session: CheckoutSession = { sessionId: 's123', url: 'http://pay' };
    service.checkout('u@x.com', 'premium').subscribe(res => {
      expect(res).toEqual(session);
    });

    const req = httpMock.expectOne(`${base}/checkout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'u@x.com', sku: 'premium' });
    req.flush(session);
  });

  it('should get status (GET /status)', () => {
    const status: MembershipStatus = {
      planId: 'premium',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-02-01',
      daysRemaining: 30
    };

    service.getStatus().subscribe(res => {
      expect(res).toEqual(status);
    });

    const req = httpMock.expectOne(`${base}/status`);
    expect(req.request.method).toBe('GET');
    req.flush(status);
  });

  it('should cancel subscription (POST /cancel)', () => {
    const status: MembershipStatus = {
      planId: 'premium',
      status: 'canceled',
      startDate: '2025-01-01',
      endDate: '2025-02-01',
      daysRemaining: 0
    };

    service.cancel('user123').subscribe(res => {
      expect(res).toEqual(status);
    });

    const req = httpMock.expectOne(`${base}/cancel`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ uid: 'user123' });
    req.flush(status);
  });
});
