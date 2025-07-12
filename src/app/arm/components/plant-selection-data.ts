import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

interface PlantSelectionData {
  currentPlantId?: number;
}

interface Plant {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
}

@Component({
  selector: 'app-plant-selection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>Seleccionar Planta</h2>
      <mat-dialog-content>
        <div class="loading" *ngIf="isLoading">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Cargando plantas...</p>
        </div>

        <div class="plants-list" *ngIf="!isLoading && plants.length > 0">
          <div *ngFor="let plant of plants"
               class="plant-item"
               [class.selected]="selectedPlantId === plant.id"
               (click)="selectPlant(plant.id)">
            <div class="plant-info">
              <h4>{{ plant.commonName }}</h4>
              <p class="scientific-name">{{ plant.scientificName }}</p>
              <p class="description">{{ plant.description }}</p>
            </div>
            <mat-icon *ngIf="selectedPlantId === plant.id">check_circle</mat-icon>
          </div>
        </div>

        <div class="no-plants" *ngIf="!isLoading && plants.length === 0">
          <mat-icon>eco</mat-icon>
          <p>No hay plantas disponibles</p>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button [mat-dialog-close]="false">Cancelar</button>
        <button mat-raised-button
                color="primary"
                [disabled]="!selectedPlantId"
                [mat-dialog-close]="{ plantId: selectedPlantId }">
          Vincular Planta
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 8px;
      min-width: 400px;
      max-width: 500px;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      gap: 16px;
    }
    .plants-list {
      max-height: 400px;
      overflow-y: auto;
    }
    .plant-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .plant-item:hover {
      background-color: #f5f5f5;
    }
    .plant-item.selected {
      border-color: #2ecc71;
      background-color: #f0fff4;
    }
    .plant-info {
      flex: 1;
    }
    .plant-info h4 {
      margin: 0 0 4px 0;
      color: #333;
    }
    .scientific-name {
      font-style: italic;
      color: #666;
      margin: 0 0 8px 0;
      font-size: 0.9rem;
    }
    .description {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.4;
    }
    .no-plants {
      text-align: center;
      padding: 40px;
      color: #999;
    }
    .no-plants mat-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `]
})
export class PlantSelectionDialogComponent implements OnInit {
  plants: Plant[] = [];
  selectedPlantId: number | null = null;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<PlantSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlantSelectionData
  ) {
    this.selectedPlantId = data.currentPlantId || null;
  }

  ngOnInit(): void {
    this.loadPlants();
  }

  loadPlants(): void {
    this.isLoading = true;

    // Mock data - replace with actual service call
    setTimeout(() => {
      this.plants = [
        {
          id: 1,
          commonName: 'Monstera Deliciosa',
          scientificName: 'Monstera deliciosa',
          description: 'Planta tropical de interior con hojas grandes y perforadas.'
        },
        {
          id: 2,
          commonName: 'Ficus Lyrata',
          scientificName: 'Ficus lyrata',
          description: 'Árbol de hoja perenne con hojas grandes en forma de violín.'
        },
        {
          id: 3,
          commonName: 'Suculenta Echeveria',
          scientificName: 'Echeveria elegans',
          description: 'Suculenta con rosetas de hojas carnosas y flores coloridas.'
        },
        {
          id: 4,
          commonName: 'Pothos Dorado',
          scientificName: 'Epipremnum aureum',
          description: 'Planta colgante de fácil cuidado con hojas variegadas.'
        }
      ];
      this.isLoading = false;
    }, 1000);

    // Real implementation would be:
    // this.plantService.getAllPlants(token).subscribe(...)
  }

  selectPlant(plantId: number): void {
    this.selectedPlantId = plantId;
  }
}
