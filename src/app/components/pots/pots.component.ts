import { Component } from "@angular/core"
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { CommonModule } from "@angular/common"
import {TranslateModule} from '@ngx-translate/core';
import {ToolbarComponent} from '../../shared/components/toolbar/toolbar.component';

interface Pot {
  id: number
  name: string
  plantType: string
  status: "healthy" | "warning" | "critical"
  humidity: number
  temperature: number
  lightLevel: number
  lastWatered: string
  nextWatering: string
  image: string
  batteryLevel: number
}

@Component({
  selector: "app-pots",
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    ToolbarComponent,
    CommonModule,
  ],
  templateUrl: "./pots.component.html",
  styleUrl: "./pots.component.css",
})
export class PotsComponent {
  selectedTabIndex = 0

  pots: Pot[] = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      plantType: "Tropical",
      status: "warning",
      humidity: 25,
      temperature: 24,
      lightLevel: 75,
      lastWatered: "Hace 3 días",
      nextWatering: "Hoy",
      image: "demoplant.png",
      batteryLevel: 85,
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      plantType: "Interior",
      status: "healthy",
      humidity: 65,
      temperature: 22,
      lightLevel: 80,
      lastWatered: "Ayer",
      nextWatering: "En 2 días",
      image: "demoplant.png",
      batteryLevel: 92,
    },
    {
      id: 3,
      name: "Suculenta Echeveria",
      plantType: "Suculenta",
      status: "critical",
      humidity: 15,
      temperature: 28,
      lightLevel: 90,
      lastWatered: "Hace 1 semana",
      nextWatering: "Urgente",
      image: "demoplant.png",
      batteryLevel: 45,
    },
    {
      id: 4,
      name: "Pothos Dorado",
      plantType: "Colgante",
      status: "healthy",
      humidity: 70,
      temperature: 23,
      lightLevel: 60,
      lastWatered: "Hace 2 días",
      nextWatering: "Mañana",
      image: "demoplant.png",
      batteryLevel: 78,
    },
  ]

  get filteredPots(): Pot[] {
    switch (this.selectedTabIndex) {
      case 0:
        return this.pots // Todas
      case 1:
        return this.pots.filter((p) => p.status === "healthy") // Saludables
      case 2:
        return this.pots.filter((p) => p.status === "warning") // Necesitan atención
      case 3:
        return this.pots.filter((p) => p.status === "critical") // Críticas
      default:
        return this.pots
    }
  }

  get healthyCount(): number {
    return this.pots.filter((p) => p.status === "healthy").length
  }
  get warningCount(): number {
    return this.pots.filter((p) => p.status === "warning").length
  }
  get criticalCount(): number {
    return this.pots.filter((p) => p.status === "critical").length
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "healthy":
        return "#2ecc71"
      case "warning":
        return "#f39c12"
      case "critical":
        return "#e74c3c"
      default:
        return "#95a5a6"
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case "healthy":
        return "Saludable"
      case "warning":
        return "Necesita atención"
      case "critical":
        return "Crítico"
      default:
        return "Desconocido"
    }
  }

  getHumidityColor(humidity: number): string {
    if (humidity >= 60) return "#2ecc71"
    if (humidity >= 30) return "#f39c12"
    return "#e74c3c"
  }

  getBatteryColor(battery: number): string {
    if (battery >= 70) return "#2ecc71"
    if (battery >= 30) return "#f39c12"
    return "#e74c3c"
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index
  }

  waterPlant(potId: number): void {
    const pot = this.pots.find((p) => p.id === potId)
    if (pot) {
      pot.lastWatered = "Ahora"
      pot.nextWatering = "En 3 días"
      pot.humidity = Math.min(pot.humidity + 30, 100)
      if (pot.status === "critical" || pot.status === "warning") {
        pot.status = "healthy"
      }
    }
  }

  viewDetails(potId: number): void {
    console.log("Ver detalles de maceta:", potId)
    // Aquí iría la navegación a la página de detalles
  }
}
