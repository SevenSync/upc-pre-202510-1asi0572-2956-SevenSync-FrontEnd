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

interface ChartDataPoint {
  time: string
  humidity: number
  light: number
  temperature: number
  acidity: number
  salinity: number
}

interface TooltipData {
  time: string
  humidity: string
  light: string
  temperature: string
  acidity: string
  salinity: string
  visible: boolean
  x: number
  y: number
}

interface WateringRecord {
  id: number
  type: "manual" | "automatic"
  amount: number
  date: string
  time: string
}

interface Alert {
  id: number
  type: "critical" | "warning" | "info"
  title: string
  description: string
  icon: string
  timestamp: string
  daysAgo: number
}

interface Recommendation {
  id: number
  type: "light" | "humidity" | "fertilizer" | "temperature" | "general"
  title: string
  description: string
  icon: string
  backgroundColor: string
  borderColor: string
  iconColor: string
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
  selectedTabIndex = 0 // Gráfico por defecto para mostrar los datos
  potId = 0
  showNewScheduleForm = false
  newScheduleForm: FormGroup
  selectedPeriod = "day"
  hasChartData = true // Simular que hay datos disponibles

  // Datos simulados del gráfico
  chartData: ChartDataPoint[] = [
    { time: "01:00", humidity: 45, light: 0, temperature: 20, acidity: 6.5, salinity: 1.0 },
    { time: "03:00", humidity: 44, light: 0, temperature: 19, acidity: 6.6, salinity: 1.0 },
    { time: "05:00", humidity: 43, light: 5, temperature: 19, acidity: 6.6, salinity: 1.1 },
    { time: "07:00", humidity: 42, light: 15, temperature: 21, acidity: 6.7, salinity: 1.1 },
    { time: "09:00", humidity: 40, light: 25, temperature: 23, acidity: 6.7, salinity: 1.1 },
    { time: "11:00", humidity: 38, light: 30, temperature: 24, acidity: 6.8, salinity: 1.2 },
    { time: "13:00", humidity: 35, light: 35, temperature: 25, acidity: 6.8, salinity: 1.2 },
    { time: "15:00", humidity: 49, light: 10.25, temperature: 22, acidity: 6.7, salinity: 1.1 },
    { time: "17:00", humidity: 47, light: 20, temperature: 23, acidity: 6.7, salinity: 1.1 },
    { time: "19:00", humidity: 46, light: 10, temperature: 22, acidity: 6.6, salinity: 1.0 },
    { time: "21:00", humidity: 45, light: 2, temperature: 21, acidity: 6.6, salinity: 1.0 },
    { time: "23:00", humidity: 45, light: 0, temperature: 20, acidity: 6.5, salinity: 1.0 },
  ]

  tooltipData: TooltipData = {
    time: "",
    humidity: "",
    light: "",
    temperature: "",
    acidity: "",
    salinity: "",
    visible: false,
    x: 0,
    y: 0,
  }

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
    sunExposure: "Sombra parcial / Luz indirecta",
    optimalHumidity: "40-60%",
    lastWatered: "Hace 3 días",
    nextWatering: "En 2 días",
  }

  // Historial de riegos
  wateringHistory: WateringRecord[] = [
    {
      id: 1,
      type: "manual",
      amount: 250,
      date: "15/05/2025",
      time: "14:30",
    },
    {
      id: 2,
      type: "automatic",
      amount: 300,
      date: "13/05/2025",
      time: "09:00",
    },
    {
      id: 3,
      type: "automatic",
      amount: 300,
      date: "09/05/2025",
      time: "16:00",
    },
    {
      id: 4,
      type: "manual",
      amount: 175,
      date: "05/05/2025",
      time: "10:30",
    },
  ]

  // Alertas de la planta
  alerts: Alert[] = [
    {
      id: 1,
      type: "critical",
      title: "Nivel de humedad del suelo bajo",
      description:
        "La humedad del sustrato de tu Monstera Deliciosa ha estado por debajo del 30% durante más de 2 días. Tu planta necesita agua urgentemente. Aumenta la frecuencia de regado automático o trata de regarla manualmente.",
      icon: "water_drop",
      timestamp: "Hace 4 días",
      daysAgo: 4,
    },
    {
      id: 2,
      type: "warning",
      title: "Temperatura elevada",
      description:
        "La temperatura del sustrato de tu Monstera Deliciosa ha superado los 29°C durante varias horas. Considera mover la planta a un lugar más fresco y bajo sombra.",
      icon: "thermostat",
      timestamp: "Hace 4 días",
      daysAgo: 4,
    },
    {
      id: 3,
      type: "info",
      title: "Batería baja",
      description:
        "El nivel de batería de los sensores de tu Monstera Deliciosa están por debajo del 15%. Recarga pronto para evitar perder datos y seguir monitoreando a tu planta en todo momento.",
      icon: "battery_alert",
      timestamp: "Hace 7 días",
      daysAgo: 7,
    },
  ]

  // Recomendaciones para la planta
  recommendations: Recommendation[] = [
    {
      id: 1,
      type: "light",
      title: "Ajusta la exposición a la luz",
      description:
        "Tu Monstera Deliciosa está recibiendo demasiada luz directa, mayor a los valores óptimos. Considera moverla a un lugar con luz indirecta brillante para evitar que las hojas se quemen.",
      icon: "wb_sunny",
      backgroundColor: "#fce4ec",
      borderColor: "#f8bbd9",
      iconColor: "#e91e63",
    },
    {
      id: 2,
      type: "humidity",
      title: "Aumenta la humedad",
      description:
        "Si bien la humedad actual es adecuada para una Monstera Deliciosa, aún puede aumentarse más para mejorar el crecimiento. Puedes rociar agua alrededor de la planta de forma más seguida, hacer más frecuente el riego automático, o usar un humidificador.",
      icon: "water_drop",
      backgroundColor: "#fff8e1",
      borderColor: "#ffecb3",
      iconColor: "#ff9800",
    },
    {
      id: 3,
      type: "fertilizer",
      title: "Tiempo para fertilizar",
      description:
        "Es un buen momento para aplicar fertilizante a tu Monstera Deliciosa. Usa un fertilizante equilibrado diluido a la mitad de la concentración recomendada. Asimismo, no sobrepases los niveles de salinidad recomendados.",
      icon: "location_on",
      backgroundColor: "#e8f5e8",
      borderColor: "#c8e6c9",
      iconColor: "#4caf50",
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

    // Agregar nuevo registro al historial
    const now = new Date()
    const newRecord: WateringRecord = {
      id: this.wateringHistory.length + 1,
      type: "manual",
      amount: 200,
      date: now.toLocaleDateString("es-ES"),
      time: now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    }
    this.wateringHistory.unshift(newRecord)
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period
    // Aquí se cargarían los datos según el período seleccionado
    console.log("Período seleccionado:", period)
  }

  // Métodos para el gráfico
  getChartPoints(metric: string): string {
    const maxValue = 80
    const chartWidth = 800 // Ancho aproximado del área del gráfico
    const chartHeight = 400// Alto aproximado del área del gráfico
    const padding = 60

    return this.chartData
      .map((point, index) => {
        const x = padding + (index * (chartWidth - padding * 2)) / (this.chartData.length - 1)
        let value = 0

        switch (metric) {
          case "humidity":
            value = point.humidity
            break
          case "light":
            value = point.light
            break
          case "temperature":
            value = point.temperature
            break
          case "acidity":
            value = point.acidity * 10
            break // Escalar pH para visualización
          case "salinity":
            value = point.salinity * 20
            break // Escalar salinidad para visualización
        }

        const y = chartHeight - padding - (value / maxValue) * (chartHeight - padding * 2)
        return `${x},${y}`
      })
      .join(" ")
  }

  onChartMouseMove(event: MouseEvent): void {
    if (!this.hasChartData) return

    const rect = (event.target as Element).getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Calcular el punto más cercano
    const chartWidth = rect.width
    const padding = 60
    const pointIndex = Math.round(((x - padding) / (chartWidth - padding * 2)) * (this.chartData.length - 1))

    if (pointIndex >= 0 && pointIndex < this.chartData.length) {
      const dataPoint = this.chartData[pointIndex]
      this.tooltipData = {
        time: dataPoint.time,
        humidity: `${dataPoint.humidity}% (vol%)`,
        light: `${dataPoint.light} kLux`,
        temperature: `${dataPoint.temperature}°C`,
        acidity: `${dataPoint.acidity} pH`,
        salinity: `${dataPoint.salinity} dS/m`,
        visible: true,
        x: Math.min(x + 10, chartWidth - 200), // Ajustar posición para que no se salga
        y: Math.max(y - 10, 10),
      }
    }
  }

  onChartMouseLeave(): void {
    this.tooltipData.visible = false
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

  getDayLabel(day: string): string {
    const dayOption = this.daysOfWeek.find((d) => d.value === day)
    return dayOption ? dayOption.label : day
  }


  get hasWateringHistory(): boolean {
    return this.wateringHistory.length > 0
  }

  getWateringTypeLabel(type: string): string {
    return type === "manual" ? "Riego manual" : "Riego automático"
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

  get hasAlerts(): boolean {
    return this.alerts.length > 0
  }

  getAlertBackgroundColor(type: string): string {
    switch (type) {
      case "critical":
        return "#ffebee"
      case "warning":
        return "#fff8e1"
      case "info":
        return "#e3f2fd"
      default:
        return "#f5f5f5"
    }
  }

  getAlertBorderColor(type: string): string {
    switch (type) {
      case "critical":
        return "#ffcdd2"
      case "warning":
        return "#ffecb3"
      case "info":
        return "#bbdefb"
      default:
        return "#e0e0e0"
    }
  }

  getAlertIconColor(type: string): string {
    switch (type) {
      case "critical":
        return "#f44336"
      case "warning":
        return "#ff9800"
      case "info":
        return "#2196f3"
      default:
        return "#666"
    }
  }

  get hasRecommendations(): boolean {
    return this.recommendations.length > 0
  }

  // Propiedades para reportes
  selectedReportPeriod = {
    start: new Date(2025, 4, 5), // 05/05/2025
    end: new Date(2025, 4, 11), // 11/05/2025
  }
  hasReportsData = false // Simular que no hay datos suficientes aún

  // Métodos para reportes
  navigateReportPeriod(direction: "prev" | "next"): void {
    const days = 7
    const multiplier = direction === "next" ? 1 : -1

    this.selectedReportPeriod.start = new Date(
      this.selectedReportPeriod.start.getTime() + days * 24 * 60 * 60 * 1000 * multiplier,
    )
    this.selectedReportPeriod.end = new Date(
      this.selectedReportPeriod.end.getTime() + days * 24 * 60 * 60 * 1000 * multiplier,
    )
  }

  formatReportDate(date: Date): string {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  getReportPeriodText(): string {
    return `${this.formatReportDate(this.selectedReportPeriod.start)} - ${this.formatReportDate(this.selectedReportPeriod.end)}`
  }
}
