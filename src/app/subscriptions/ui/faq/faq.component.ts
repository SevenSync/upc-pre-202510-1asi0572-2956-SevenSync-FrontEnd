import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs: FaqItem[] = [
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
        'final del periodo vigente (mensual o anual). Puedes cancelar ' +
        'en cualquier momento para evitar la siguiente renovación.'
    },
    {
      question: '¿Qué sucede si cancelo mi suscripción?',
      answer:
        'Si cancelas, mantendrás acceso a las funciones Premium hasta ' +
        'el fin del periodo vigente. Luego tu cuenta pasará al plan Free.'
    }
  ];
}