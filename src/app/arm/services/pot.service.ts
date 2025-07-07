import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {Pot} from '../model/pot.entity';
import {CreatePotRequest} from '../model/create-pot.request';
import {
  LinkPlantResponse,
  PotAssignedResponse,
  PotCreatedResponse,
  PotDeletedResponse, PotMetricsUpdatedResponse,
  PotResponse,
  PotUnassignedResponse, UnlinkPlantResponse
} from '../model/pot.response';
import {AssignPotToUserRequest} from '../model/assign-pot.request';
import {UpdatePotMetricsRequest} from '../model/pot-metrics.request';
import {LinkPlantToPotRequest} from '../model/link-plant.request';

@Injectable({ providedIn: 'root' })
export class PotService extends BaseService<Pot> {
  protected resourceEndpoint = '/pots';

  createPot(request: CreatePotRequest, token: string): Observable<PotCreatedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.post<PotCreatedResponse>(this.resourcePath(), request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  getPot(potId: number, token: string): Observable<PotResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<PotResponse>(`${this.resourcePath()}/${potId}`, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllPots(token: string): Observable<PotResponse[]> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<PotResponse[]>(this.resourcePath(), { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePot(potId: number, token: string): Observable<PotDeletedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.delete<PotDeletedResponse>(`${this.resourcePath()}/${potId}`, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  assignPot(potId: number, request: AssignPotToUserRequest, token: string): Observable<PotAssignedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.put<PotAssignedResponse>(`${this.resourcePath()}/${potId}/assignee`, request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  unassignPot(potId: number, token: string): Observable<PotUnassignedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.delete<PotUnassignedResponse>(`${this.resourcePath()}/${potId}/assignee`, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  updateMetrics(potId: number, metrics: UpdatePotMetricsRequest): Observable<PotMetricsUpdatedResponse> {
    return this.http.patch<PotMetricsUpdatedResponse>(`${this.resourcePath()}/${potId}/metrics`, metrics, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  linkPlant(potId: number, request: LinkPlantToPotRequest, token: string): Observable<LinkPlantResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.put<LinkPlantResponse>(`${this.resourcePath()}/${potId}/plant`, request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  unlinkPlant(potId: number, token: string): Observable<UnlinkPlantResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.delete<UnlinkPlantResponse>(`${this.resourcePath()}/${potId}/plant`, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }
}
