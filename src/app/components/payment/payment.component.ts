import { Component } from '@angular/core';
import {ToolbarComponent} from "../public/toolbar/toolbar.component";
import {MatIconModule} from '@angular/material/icon';
import {NgClass} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [
    ToolbarComponent,
    MatIconModule,
    NgClass,
    MatCardModule,
    MatRadioModule,
    RouterLink
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  selectedPeriod: 'monthly' | 'annual' = 'monthly';

  selectPeriod(period: 'monthly' | 'annual') {
    this.selectedPeriod = period;
  }
}
