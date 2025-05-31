import { Component } from "@angular/core"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { MatExpansionModule } from "@angular/material/expansion"
import { ToolbarComponent } from "../public/toolbar/toolbar.component"
import { CommonModule } from "@angular/common"

interface FAQ {
  question: string
  answer: string
  expanded?: boolean
}

@Component({
  selector: "app-memberships",
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatButtonToggleModule,
    MatExpansionModule,
    ToolbarComponent,
    CommonModule,
  ],
  templateUrl: "./memberships.component.html",
  styleUrl: "./memberships.component.css",
})
export class MembershipsComponent {
  billingPeriod: "monthly" | "yearly" = "monthly"
  currentPlan = "gratuito"

  freeFeatures = [
    "Hasta 4 macetas inteligentes",
    "Monitoreo básico de sensores",
    "Alertas de riego",
    "Historial de datos por 7 días",
  ]

  freeLimitations = ["Sin reportes semanales", "Sin promoción de riego automático", "Sin recomendaciones avanzadas"]

  premiumFeatures = [
    "Macetas inteligentes ilimitadas",
    "Monitoreo avanzado de sensores",
    "Alertas personalizables",
    "Historial de datos ilimitado",
    "Reportes semanales detallados",
    "Programación de riego automático",
    "Recomendaciones personalizadas",
    "Soporte personalizado",
    "Acceso anticipado a nuevas funciones",
  ]

  faqs: FAQ[] = [
    {
      question: "¿Puedo cambiar de plan en cualquier momento?",
      answer:
        "Sí, puedes actualizar a Premium en cualquier momento. Si decides volver al plan gratuito, el cambio se hará efectivo al final de tu período de facturación.",
      expanded: true,
    },
    {
      question: "¿Cómo funciona la facturación anual?",
      answer:
        "Con la facturación anual, pagas por 12 meses por adelantado y obtienes un descuento del 17% comparado con el pago mensual.",
      expanded: false,
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express), así como PayPal.",
      expanded: false,
    },
    {
      question: "¿Puedo cancelar mi suscripción Premium?",
      answer:
        "Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Seguirás teniendo acceso a las funciones Premium hasta el final de tu período de facturación.",
      expanded: false,
    },
  ]

  get premiumPrice(): number {
    return this.billingPeriod === "monthly" ? 9.99 : 99.99
  }

  get premiumPeriod(): string {
    return this.billingPeriod === "monthly" ? "mes" : "año"
  }

  setBillingPeriod(period: "monthly" | "yearly"): void {
    this.billingPeriod = period
  }

  upgradeToPremium(): void {
    console.log("Actualizando a Premium...")
    // Aquí iría la lógica para actualizar el plan
  }

  toggleFAQ(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded
  }
}
