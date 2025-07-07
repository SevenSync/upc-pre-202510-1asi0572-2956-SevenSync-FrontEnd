import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../services/authentication.service';
import { PasswordResetRequest } from '../../model/password-reset.request';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  recoveryForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.invalid) {
      this.errorMessage = 'Por favor ingresa un email válido.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValues = this.recoveryForm.value;
    const request = new PasswordResetRequest(formValues.email);

    this.authService.requestPasswordReset(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.sent) {
          this.successMessage = 'Se ha enviado un enlace de recuperación a tu email.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = 'No se pudo enviar el email de recuperación.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Password recovery error:', error);

        if (error.status === 404) {
          this.errorMessage = 'No se encontró una cuenta con ese email.';
        } else {
          this.errorMessage = 'Error al enviar el email de recuperación.';
        }
      }
    });
  }
}
