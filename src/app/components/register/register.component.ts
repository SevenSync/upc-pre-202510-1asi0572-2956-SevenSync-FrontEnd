import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {MatFormField, MatInput} from "@angular/material/input";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatFormField,
    MatInput,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
