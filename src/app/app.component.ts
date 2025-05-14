import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', //esto es el nombre de etiqueta que se va a usar en el html
  imports: [RouterOutlet], // esto es para que funcione el router outlet,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebApp-Frontend';
}
