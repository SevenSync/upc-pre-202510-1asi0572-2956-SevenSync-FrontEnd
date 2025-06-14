import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PlantService, PaginatedPlantsResponse } from '../../services/plant.service';
import { Plant } from '../../model/plant.entity';

import { finalize, catchError, of, tap } from 'rxjs';
import {RequirementLevelPipe} from '../../../shared/requirement-level.pipe';

@Component({
  selector: 'app-plant-catalog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RequirementLevelPipe ],
  templateUrl: './plant-catalog.component.html',
  styleUrl: './plant-catalog.component.css'
})
export class PlantCatalogComponent implements OnInit {
  private plantService = inject(PlantService);

  @Output() plantAssigned = new EventEmitter<Plant>();
  @Output() cancelled = new EventEmitter<void>();

  // Estado de la UI
  isLoading = true;
  error: string | null = null;
  selectedPlant: Plant | null = null;

  // Datos y Paginación
  plants: Plant[] = [];
  currentPage = 1;
  lastPage = 1;

  ngOnInit(): void {
    this.fetchPlants(this.currentPage);
  }

  fetchPlants(page: number): void {
    this.isLoading = true;
    this.error = null;
    this.selectedPlant = null; // Deseleccionar planta al cambiar de página

    this.plantService.getPlants(page)
      .pipe(
        tap((response: PaginatedPlantsResponse) => {
          this.plants = response.plants;
          this.currentPage = response.currentPage;
          this.lastPage = response.lastPage;
        }),
        catchError(err => {
          console.error('Failed to fetch plants:', err);
          this.error = 'Failed to fetch plants. Please check API key/network.';
          this.plants = [];
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.lastPage && page !== this.currentPage) {
      this.fetchPlants(page);
    }
  }

  selectPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }

  assignPlant(): void {
    if (this.selectedPlant) {
      this.plantAssigned.emit(this.selectedPlant);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
