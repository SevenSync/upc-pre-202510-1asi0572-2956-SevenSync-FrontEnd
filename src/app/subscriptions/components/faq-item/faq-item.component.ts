import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.css']
})
export class FaqItemComponent {
  /** Texto de la pregunta */
  @Input() question = '';

  /** Texto de la respuesta */
  @Input() answer = '';
}
