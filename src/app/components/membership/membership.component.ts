import { Component } from '@angular/core';
import {ToolbarComponent} from "../../shared/toolbar/toolbar.component";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-membership',
  imports: [
    ToolbarComponent, MatIconModule, MatCardModule, MatTabsModule, NgClass,RouterLink
  ],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {
  selectedPeriod: 'monthly' | 'annual' = 'monthly';

  selectPeriod(period: 'monthly' | 'annual') {
    this.selectedPeriod = period;
  }
}
