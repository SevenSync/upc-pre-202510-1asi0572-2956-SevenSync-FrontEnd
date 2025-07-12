import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../../profiles/services/profile.service';
import { SignInRequest } from '../../model/sign-in.request';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { tap, switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SignInComponent,
    MatButtonToggleModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = signal('');
  isLoading = signal(false);

  private authService = inject(AuthenticationService);
  private profileService = inject(ProfileService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  currentLang = this.translate.currentLang;

  constructor() {
    // ✅ CORRECCIÓN 2: Establecer el idioma por defecto al iniciar el componente
    const defaultLang = 'en';
    this.currentLang = defaultLang;
    this.translate.use(defaultLang);
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang = lang;
  }

  onSignIn(signInRequest: SignInRequest): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    // ✅ REFACTORIZACIÓN COMPLETA CON RxJS para evitar suscripciones anidadas
    this.authService.signIn(signInRequest).pipe(
      // 1. Primer paso exitoso: guarda el token y el email.
      tap(response => {
        this.authService.handleSuccessfulSignIn(response, signInRequest.email);
      }),
      // 2. Encadena la siguiente llamada asíncrona: verificar si el perfil existe.
      // `switchMap` es ideal aquí porque cancela la petición anterior si el usuario hace doble clic.
      switchMap(response => this.profileService.hasProfile(response.token)),
      // 3. Paso final exitoso: navega a la página correspondiente.
      tap(profileResponse => {
        if (profileResponse.hasProfile) {
          this.router.navigate(['/pots']);
        } else {
          this.router.navigate(['/create-profile']);
        }
      }),
      // 4. Manejo de errores centralizado para CUALQUIER fallo en la cadena (signIn o hasProfile).
      catchError(error => {
        console.error('Login process error:', error);
        this.errorMessage.set('Credenciales inválidas. Por favor intenta nuevamente.');
        return of(null); // Retorna un observable nulo para que la cadena no se rompa.
      }),
      // 5. Se ejecuta SIEMPRE, tanto en éxito como en error, para detener el estado de carga.
      finalize(() => {
        this.isLoading.set(false);
      })
    ).subscribe(); // La suscripción vacía inicia toda la cadena.
  }

  // El método checkUserProfile ya no es necesario, su lógica está integrada en la cadena de RxJS.
}
