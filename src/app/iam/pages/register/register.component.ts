import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router'; // El Router sí se usa en la lógica para navegar
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpRequest } from '../../model/sign-up.request';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatCardModule, MatIconModule,
    MatButtonToggleModule, TranslateModule,
    SignUpComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // ... el resto de tu código no necesita cambios ...
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  errorMessage = signal('');
  successMessage = signal('');
  isLoading = signal(false);

  currentLang: string;

  constructor() {
    const defaultLang = 'en';
    this.currentLang = defaultLang;
    this.translate.use(defaultLang);
  }

  setLanguage(event: { value: string }): void {
    const lang = event.value;
    this.translate.use(lang);
    this.currentLang = lang;
  }

  onSignUp(signUpRequest: SignUpRequest): void {
    if (!signUpRequest) return;

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.signUp(signUpRequest).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: () => {
        this.successMessage.set('Cuenta creada exitosamente. Revisa tu email para verificar tu cuenta.');
        setTimeout(() => this.router.navigate(['/login']), 4000);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage.set(
          error.status === 400 && error.error?.message?.includes('already exists')
            ? 'Ya existe una cuenta con este email.'
            : 'Error al crear la cuenta. Intenta nuevamente.'
        );
      }
    });
  }
}
