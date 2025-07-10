import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../services/authentication.service';
import { SignUpRequest } from '../../model/sign-up.request';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    TranslateModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public router: Router  // ✅ CAMBIAR A PUBLIC para usarlo en template
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  translate : TranslateService= inject(TranslateService);
  setLanguage(lang: string): void {
    this.translate.use(lang);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValues = this.registerForm.value;
    const signUpRequest = new SignUpRequest(formValues.email, formValues.password);

    this.authService.signUp(signUpRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.created) {
          this.successMessage = 'Cuenta creada exitosamente. Revisa tu email para verificar tu cuenta.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = 'No se pudo crear la cuenta. Intenta nuevamente.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);

        if (error.status === 400 && error.error?.message?.includes('already exists')) {
          this.errorMessage = 'Ya existe una cuenta con este email.';
        } else {
          this.errorMessage = 'Error al crear la cuenta. Intenta nuevamente.';
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  // ✅ MÉTODO PARA NAVEGAR (alternativa)
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
