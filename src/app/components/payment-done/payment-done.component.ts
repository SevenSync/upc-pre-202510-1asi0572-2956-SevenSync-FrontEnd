import { Component } from '@angular/core';
import {ToolbarComponent} from "../../shared/toolbar/toolbar.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-payment-done',
    imports: [
      ToolbarComponent,
      MatIconModule,
      MatButtonModule,
      RouterLink
    ],
  templateUrl: './payment-done.component.html',
  styleUrl: './payment-done.component.css'
})
export class PaymentDoneComponent {

}
