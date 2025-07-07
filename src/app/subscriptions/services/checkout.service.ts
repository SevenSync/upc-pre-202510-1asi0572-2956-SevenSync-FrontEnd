import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {CheckoutSubscriptionRequest} from '../model/checkout-session.request';
import {CheckoutSessionResponse} from '../model/subscription.response';

@Injectable({ providedIn: 'root' })
export class CheckoutService extends BaseService<any> {
  protected resourceEndpoint = '/checkout-sessions';

  createCheckoutSession(request: CheckoutSubscriptionRequest, token: string): Observable<CheckoutSessionResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.post<CheckoutSessionResponse>(this.resourcePath(), request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }
}
