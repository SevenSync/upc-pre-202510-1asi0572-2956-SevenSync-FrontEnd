import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Plan } from '../../model/plan.model';

@Component({
  selector: 'app-plans-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './plans-table.component.html',
  styleUrls: ['./plans-table.component.css']
})
export class PlansTableComponent {
  @Input() plans: Plan[] = [];
  displayedColumns = ['feature', 'free', 'premium'];
}
