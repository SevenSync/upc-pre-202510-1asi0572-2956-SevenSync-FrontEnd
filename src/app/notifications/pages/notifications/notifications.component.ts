import { Component } from "@angular/core"
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatChipsModule } from "@angular/material/chips"
import { ToolbarComponent } from "../../../shared/components/toolbar/toolbar.component"
import { CommonModule } from "@angular/common"
import {MatTooltip} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';

interface Notification {
  id: number
  type: "riego" | "ambiente" | "sistema" | "bateria"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  linkText?: string
}

@Component({
  selector: "app-notifications",
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    ToolbarComponent,
    CommonModule,
    MatTooltip,
    TranslateModule
  ],
  templateUrl: "./notifications.component.html",
  styleUrl: "./notifications.component.css",
})
export class NotificationsComponent {
  selectedTabIndex = 0

  notifications: Notification[] = [
    {
      id: 1,
      type: "ambiente",
      title: "Nivel de humedad bajo",
      description: "Tu Monstera Deliciosa necesita agua. La humedad del suelo está por debajo del 30%.",
      timestamp: "Hace 50 minutos",
      isRead: false,
      linkText: "Ver monstera religiosa",
    },
    {
      id: 2,
      type: "riego",
      title: "Riego completado",
      description: "Riego automático completado para Ficus Lyrata. Se aplicaron 200ml de agua.",
      timestamp: "Hace 50 minutos",
      isRead: true,
      linkText: "Ver monstera religiosa",
    },
    {
      id: 3,
      type: "ambiente",
      title: "Temperatura elevada",
      description:
        "La temperatura ambiente ha superado los 28°C. Considera mover tu Suculenta Echeveria a un lugar más fresco.",
      timestamp: "Hace 50 minutos",
      isRead: false,
      linkText: "Ver monstera religiosa",
    },
    {
      id: 4,
      type: "sistema",
      title: "Batería baja",
      description: "El sensor de tu Pothos Dorado tiene la batería por debajo del 15%. Por favor, recárgalo pronto.",
      timestamp: "Hace 50 minutos",
      isRead: false,
      linkText: "Ver monstera religiosa",
    },
    {
      id: 5,
      type: "sistema",
      title: "Reporte semanal disponible",
      description:
        "El reporte semanal de salud de tus plantas está disponible. Revísalo para obtener recomendaciones personalizadas.",
      timestamp: "Hace 50 minutos",
      isRead: true,
      linkText: "Ver monstera religiosa",
    },
  ]

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length
  }

  get filteredNotifications(): Notification[] {
    switch (this.selectedTabIndex) {
      case 0:
        return this.notifications // Todas
      case 1:
        return this.notifications.filter((n) => n.type === "riego") // Riego
      case 2:
        return this.notifications.filter((n) => n.type === "ambiente") // Ambiente
      case 3:
        return this.notifications.filter((n) => n.type === "sistema") // Sistema
      case 4:
        return this.notifications.filter((n) => !n.isRead) // No leídas
      default:
        return this.notifications
    }
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case "riego":
        return "water_drop"
      case "ambiente":
        return "thermostat"
      case "sistema":
        return "battery_alert"
      case "bateria":
        return "battery_low"
      default:
        return "notifications"
    }
  }

  getNotificationClass(type: string): string {
    switch (type) {
      case "riego":
        return "notification-riego"
      case "ambiente":
        return "notification-ambiente"
      case "sistema":
        return "notification-sistema"
      case "bateria":
        return "notification-bateria"
      default:
        return "notification-default"
    }
  }

  markAsRead(notificationId: number): void {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.isRead = true
    }
  }

  deleteNotification(notificationId: number): void {
    this.notifications = this.notifications.filter((n) => n.id !== notificationId)
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.isRead = true))
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index
  }
}


