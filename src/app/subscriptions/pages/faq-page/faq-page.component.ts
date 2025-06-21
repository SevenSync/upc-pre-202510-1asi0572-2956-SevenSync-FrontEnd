import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FaqItemComponent } from '../../components/faq-item/faq-item.component';
import { SpinnerErrorComponent } from '../../components/spinner-error/spinner-error.component';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FaqItemComponent,
    SpinnerErrorComponent
  ],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {
  faqs: FaqItem[] = [];
  isLoading = false;
  errorMsg = '';

  ngOnInit(): void {
    this.loadFaqs();
  }

  /** Simula carga de FAQs (aquí podrías llamar a un servicio si son dinámicas) */
  private loadFaqs(): void {
    this.isLoading = true;
    this.errorMsg = '';
    try {
      // Aquí static data:
      this.faqs = [
        {
          question: '¿Puedo cambiar entre plan mensual y anual?',
          answer:
            'Sí, puedes cambiar tu método de pago en cualquier momento. ' +
            'Si ya pagaste el plan mensual, el cambio a anual se hará ' +
            'al finalizar tu periodo actual.'
        },
        {
          question: '¿Se renueva automáticamente mi suscripción?',
          answer:
            'Sí, nuestras suscripciones se renuevan automáticamente al ' +
            'final del periodo vigente. Puedes cancelar en cualquier momento para evitar la siguiente renovación.'
        },
        {
          question: '¿Qué sucede si cancelo mi suscripción?',
          answer:
            'Si cancelas, mantendrás acceso a las funciones Premium hasta ' +
            'el fin del periodo vigente. Luego tu cuenta pasará al plan Free.'
        }
      ];
      // Simular fin de carga
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    } catch {
      this.errorMsg = 'No pudimos cargar las preguntas frecuentes. Intenta más tarde.';
      this.isLoading = false;
    }
  }

  onBack(): void {
    // Volver a la página de membresías
    window.history.back();
  }
}
