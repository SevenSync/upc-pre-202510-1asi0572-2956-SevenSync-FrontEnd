import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from '../public/toolbar/toolbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule,
    ToolbarComponent,MatTabsModule,MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
