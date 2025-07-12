import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../shared/services/base.service';
import {Pot, PotStatus} from '../model/pot.entity';
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
import { mapPotResponseToPot } from '../mappers/pot.mapper';

const MOCK_POTS: Pot[] = [
  {
    id: 1,
    name: 'Monstera de la Sala',
    location: 'Sala de estar',
    status: PotStatus.Healthy, // Usamos el enum: 0
    userId: 'user123',
    plantId: 101,
    batteryLevel: 95, humidity: 75, luminance: 60, ph: 6.5, salinity: 1.2, temperature: 22, waterLevel: 80,
    assignedAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Helecho del Baño',
    location: 'Baño Principal',
    status: PotStatus.Warning, // Usamos el enum: 1
    userId: 'user123',
    plantId: 102,
    batteryLevel: 45, humidity: 35, luminance: 30, ph: 6.8, salinity: 1.4, temperature: 24, waterLevel: 40,
    assignedAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    //lastWatered: new Date(Date.now() - 86400000 * 3) // Hace 3 días
  },
  {
    id: 3,
    name: 'Suculenta de la Oficina',
    location: 'Escritorio',
    status: PotStatus.Critical, // Usamos el enum: 2
    userId: 'user123',
    plantId: 103,
    batteryLevel: 10, humidity: 15, luminance: 90, ph: 6.0, salinity: 1.0, temperature: 28, waterLevel: 10,
    assignedAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    //lastWatered: new Date(Date.now() - 86400000 * 7) // Hace 1 semana
  }
];

@Injectable({ providedIn: 'root' })
export class PotService extends BaseService<Pot> {
  protected resourceEndpoint = '/pots';

  createPot(request: CreatePotRequest, token: string): Observable<PotCreatedResponse> {
    const headers = this.getAuthHeaders(token);
    return this.http.post<PotCreatedResponse>(this.resourcePath(), request, { headers })
      .pipe(retry(2), catchError(this.handleError));
  }

  getPot(potId: number, token: string): Observable<Pot> { // ✅ Devuelve Pot, no PotResponse
    const headers = this.getAuthHeaders(token);
    return this.http.get<PotResponse>(`${this.resourcePath()}/${potId}`, { headers }).pipe(
      map(response => mapPotResponseToPot(response)), // ✅ ¡Aplica el mapper aquí!
      retry(2),
      catchError(this.handleError)
    );
  }

  getAllPots(token: string): Observable<Pot[]> {
    const headers = this.getAuthHeaders(token);
    return this.http.get<PotResponse[]>(this.resourcePath(), {headers}).pipe(
      // Aquí ocurre la magia:
      map(apiResponses => apiResponses.map(res => mapPotResponseToPot(res))),
      retry(2),
      catchError(this.handleError)
    );
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
