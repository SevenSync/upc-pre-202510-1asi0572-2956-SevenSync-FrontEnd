import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { PotCardComponent } from '../../components/pot-card/pot-card.component';
import { PotService } from '../../services/pot.service';
import { Pot, PotMetrics } from '../../model/pot.entity';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    PotCardComponent
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.css'
})
export class PotsComponent implements OnInit {
  pots: Pot[] = [];
  selectedTabIndex = 0;
  isLoading = false;
  errorMessage = '';

  constructor(private potService: PotService) {}

  ngOnInit(): void {
    this.loadPots();
  }

  loadPots(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.isLoading = true;
    this.potService.getAllPots(token).subscribe({
      next: (potsData) => {
        this.isLoading = false;
        this.pots = potsData.map(potData => new Pot(
          potData.id,
          potData.name,
          potData.location,
          potData.status,
          potData.deviceId,
          potData.assignedUserId,
          potData.plantId,
          potData.metrics ? new PotMetrics(
            potData.metrics.batteryLevel,
            potData.metrics.waterLevel,
            potData.metrics.humidity,
            potData.metrics.luminance,
            potData.metrics.temperature,
            potData.metrics.ph,
            potData.metrics.salinity,
            new Date(potData.metrics.timestamp)
          ) : undefined
        ));
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading pots:', error);
        this.errorMessage = 'Error al cargar las macetas';
      }
    });
  }

  get filteredPots(): Pot[] {
    switch (this.selectedTabIndex) {
      case 0: return this.pots; // Todas
      case 1: return this.pots.filter(p => p.healthStatus === 'healthy'); // Saludables
      case 2: return this.pots.filter(p => p.healthStatus === 'warning'); // Necesitan atención
      case 3: return this.pots.filter(p => p.healthStatus === 'critical'); // Críticas
      default: return this.pots;
    }
  }

  get healthyCount(): number {
    return this.pots.filter(p => p.healthStatus === 'healthy').length;
  }

  get warningCount(): number {
    return this.pots.filter(p => p.healthStatus === 'warning').length;
  }

  get criticalCount(): number {
    return this.pots.filter(p => p.healthStatus === 'critical').length;
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }

  onWaterPlant(potId: number): void {
    const pot = this.pots.find(p => p.id === potId);
    if (pot && pot.metrics) {
      // Simulate watering - increase humidity
      pot.metrics.humidity = Math.min(pot.metrics.humidity + 30, 100);
      pot.lastWatered = new Date();

      // Update metrics on server (if needed)
      // You could call potService.updateMetrics here
      console.log(`Pot ${potId} watered successfully`);
    }
  }

  onViewPotDetails(potId: number): void {
    console.log('Navigate to pot details:', potId);
    // Implement navigation to pot details page
  }

  onAddPot(): void {
    console.log('Navigate to add pot page');
    // Implement navigation to add pot page
  }
}
