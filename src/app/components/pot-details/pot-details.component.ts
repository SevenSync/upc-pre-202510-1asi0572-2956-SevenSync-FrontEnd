import { Component, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { ToolbarComponent } from "../public/toolbar/toolbar.component"
import { CommonModule } from "@angular/common"
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

interface PotDetails {
  id: number
  name: string
  plantType: string
  description: string
  image: string
  humidity: number
  light: number
  temperature: number
  acidity: number
  salinity: number
  batteryLevel: number
  wateringSchedule: string
  sunExposure: string
  optimalHumidity: string
  lastWatered: string
  nextWatering: string
}

interface Metric {
  name: string
  value: string
  unit: string
  percentage: number
  optimal: string
  color: string
  icon: string
}

interface WateringSchedule {
  id: number
  day: string
  time: string
  amount: number
  isActive: boolean
}

@Component({
  selector: "app-pot-details",
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    ToolbarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./pot-details.component.html",
  styleUrl: "./pot-details.component.css",
})
export class PotDetailsComponent implements OnInit {
  selectedTabIndex = 5 // Programación por defecto
  potId = 0
  showNewScheduleForm = false
  newScheduleForm: FormGroup

  daysOfWeek = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
  ]

  // Datos simulados de la maceta
  potDetails: PotDetails = {
    id: 1,
    name: "Monstera Deliciosa",
    plantType: "Planta de interior",
    description:
      "La Monstera deliciosa, también conocida como costilla de Adán, es una planta trepadora perenne originaria de Centroamérica. Se caracteriza por sus grandes hojas partidas, tallos gruesos y raíces aéreas en forma de cordón. Estas hojas, que pueden alcanzar hasta 90cm de largo y 80cm de ancho, presentan agujeros o perforaciones naturales.",
    image: "demoplant.png",
    humidity: 49,
    light: 10.25,
    temperature: 22,
    acidity: 6.7,
    salinity: 1.1,
    batteryLevel: 72,
    wateringSchedule: "Cada 5-7 días",
    sunExposure: "Sombra parcial / Luz indirecta",
    optimalHumidity: "40-60%",
    lastWatered: "Hace 3 días",
    nextWatering: "En 2 días",
  }

  wateringSchedules: WateringSchedule[] = [
    {
      id: 1,
      day: "martes",
      time: "16:00",
      amount: 300,
      isActive: true,
    },
    {
      id: 2,
      day: "viernes",
      time: "09:00",
      amount: 300,
      isActive: true,
    },
  ]

  metrics: Metric[] = [
    {
      name: "Humedad",
      value: "49",
      unit: "% (vol%)",
      percentage: 49,
      optimal: "Óptimo: 40-60 % (vol%)",
      color: "primary",
      icon: "water_drop",
    },
    {
      name: "Luz",
      value: "10.25",
      unit: "kLux",
      percentage: 65,
      optimal: "Óptimo: 7 - 10 kLux",
      color: "accent",
      icon: "wb_sunny",
    },
    {
      name: "Temperatura",
      value: "22",
      unit: "°C",
      percentage: 80,
      optimal: "Óptimo: 18 - 27°C",
      color: "warn",
      icon: "thermostat",
    },
    {
      name: "Acidez",
      value: "6.7",
      unit: "pH",
      percentage: 75,
      optimal: "Óptimo: 5.5 - 7.0 pH",
      color: "primary",
      icon: "science",
    },
    {
      name: "Salinidad",
      value: "1.1",
      unit: "dS/m",
      percentage: 60,
      optimal: "Óptimo: ≤1.2 dS/m",
      color: "primary",
      icon: "grain",
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.newScheduleForm = this.fb.group({
      day: ["", Validators.required],
      time: ["", Validators.required],
      amount: [200, [Validators.required, Validators.min(50), Validators.max(1000)]],
    })
  }

  ngOnInit(): void {
    this.potId = Number(this.route.snapshot.paramMap.get("id")) || 1
    this.loadPotDetails()
  }

  loadPotDetails(): void {
    console.log("Cargando detalles de maceta ID:", this.potId)
  }

  goBack(): void {
    this.router.navigate(["/pots"])
  }

  editPot(): void {
    this.router.navigate(["/edit-pot", this.potId])
  }

  waterPlant(): void {
    this.potDetails.lastWatered = "Ahora"
    this.potDetails.nextWatering = "En 3 días"
    this.potDetails.humidity = Math.min(this.potDetails.humidity + 20, 100)

    const humidityMetric = this.metrics.find((m) => m.name === "Humedad")
    if (humidityMetric) {
      humidityMetric.value = this.potDetails.humidity.toString()
      humidityMetric.percentage = this.potDetails.humidity
    }
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index
  }

  getMetricColor(metric: Metric): string {
    switch (metric.name) {
      case "Humedad":
        return "#2196F3"
      case "Luz":
        return "#FF9800"
      case "Temperatura":
        return "#F44336"
      case "Acidez":
        return "#4CAF50"
      case "Salinidad":
        return "#009688"
      default:
        return "#9E9E9E"
    }
  }

  getBatteryColor(): string {
    if (this.potDetails.batteryLevel >= 70) return "#4CAF50"
    if (this.potDetails.batteryLevel >= 30) return "#FF9800"
    return "#F44336"
  }

  // Métodos para programación de riego
  showAddScheduleForm(): void {
    this.showNewScheduleForm = true
  }

  cancelNewSchedule(): void {
    this.showNewScheduleForm = false
    this.newScheduleForm.reset()
    this.newScheduleForm.patchValue({ amount: 200 })
  }

  saveNewSchedule(): void {
    if (this.newScheduleForm.valid) {
      const formValue = this.newScheduleForm.value
      const newSchedule: WateringSchedule = {
        id: this.wateringSchedules.length + 1,
        day: formValue.day,
        time: formValue.time,
        amount: formValue.amount,
        isActive: true,
      }

      this.wateringSchedules.push(newSchedule)
      this.cancelNewSchedule()
    }
  }

  toggleSchedule(scheduleId: number): void {
    const schedule = this.wateringSchedules.find((s) => s.id === scheduleId)
    if (schedule) {
      schedule.isActive = !schedule.isActive
    }
  }

  deleteSchedule(scheduleId: number): void {
    this.wateringSchedules = this.wateringSchedules.filter((s) => s.id !== scheduleId)
  }

  getDayLabel(day: string): string {
    const dayOption = this.daysOfWeek.find((d) => d.value === day)
    return dayOption ? dayOption.label : day
  }

  get hasSchedules(): boolean {
    return this.wateringSchedules.length > 0
  }

  // Getters para el formulario
  get day() {
    return this.newScheduleForm.get("day")
  }
  get time() {
    return this.newScheduleForm.get("time")
  }
  get amount() {
    return this.newScheduleForm.get("amount")
  }
}
