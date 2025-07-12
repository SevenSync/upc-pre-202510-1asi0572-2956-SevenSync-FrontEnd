import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {SubscriptionCancelledResponse, SubscriptionStatusResponse} from '../model/subscription.response';
import {CancelSubscriptionRequest} from '../model/cancel-subscription.request';

@Injectable({ providedIn: 'root' })
export class SubscriptionService extends BaseService<Subscription> {
  protected resourceEndpoint = '/subscriptions';

  getMySubscription(token: string): Observable<SubscriptionStatusResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<SubscriptionStatusResponse>(`${this.resourcePath()}/me`, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  cancelSubscription(request: CancelSubscriptionRequest, token: string): Observable<SubscriptionCancelledResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.delete<SubscriptionCancelledResponse>(`${this.resourcePath()}/me`, {
      headers,
      body: request
    }).pipe(retry(2), catchError(this.handleError));
  }
}
