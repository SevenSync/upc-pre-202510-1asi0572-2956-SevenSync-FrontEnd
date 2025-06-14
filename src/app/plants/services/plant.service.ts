import { environment } from "../../../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Plant } from '../model/plant.entity';
import { PlantMapper } from '../model/plant.mapper';
import { PlantDto } from "../model/plant.dto";

// Interfaz para la respuesta completa de la API
interface ApiResponse {
  data: PlantDto[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Interfaz para lo que nuestro servicio devolverá al componente
export interface PaginatedPlantsResponse {
  plants: Plant[];
  currentPage: number;
  lastPage: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private readonly BASE_URL = environment.perenualBaseUrl;
  private readonly API_KEY = environment.perenualApiKey;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene una página de plantas junto con los metadatos de paginación.
   * Pide 10 plantas por página para llenar la cuadrícula.
   */
  getPlants(page: number = 1): Observable<PaginatedPlantsResponse> {
    const plantsPerPage = 10;
    const url = `${this.BASE_URL}/species-list?key=${this.API_KEY}&page=${page}&per_page=${plantsPerPage}`;

    return this.http.get<ApiResponse>(url).pipe(
      map(response => ({
        plants: response.data.map(PlantMapper.fromDto),
        currentPage: response.current_page,
        lastPage: response.last_page,
        total: response.total
      }))
    );
  }
}
