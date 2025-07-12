import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa FormControl
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthenticationService } from '../../services/authentication.service';
import { PasswordResetRequest } from '../../model/password-reset.request';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonToggleModule,
    RouterLink, TranslateModule
  ],
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  errorMessage = signal('');
  successMessage = signal('');
  isLoading = signal(false);

  recoveryForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  currentLang: string;

  constructor() {
    const defaultLang = 'en';
    this.currentLang = defaultLang;
    this.translate.use(defaultLang);
  }

  // ✅ CORRECCIÓN: Añade un getter para acceder al control 'email' de forma segura
  get email(): FormControl {
    return this.recoveryForm.get('email') as FormControl;
  }

  setLanguage(event: { value: string }): void {
    const lang = event.value;
    this.translate.use(lang);
    this.currentLang = lang;
  }

  onSubmit(): void {
    if (this.recoveryForm.invalid) {
      // Marca el campo como "tocado" para que los errores se muestren inmediatamente
      this.recoveryForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const request = new PasswordResetRequest(this.recoveryForm.value.email);

    this.authService.requestPasswordReset(request).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: () => {
        this.successMessage.set('Se ha enviado un enlace de recuperación a tu email.');
        this.recoveryForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 4000);
      },
      error: (error) => {
        console.error('Password recovery error:', error);
        this.errorMessage.set(
          error.status === 404
            ? 'No se encontró una cuenta con ese email.'
            : 'Error al enviar el email de recuperación.'
        );
      }
    });
  }
}
