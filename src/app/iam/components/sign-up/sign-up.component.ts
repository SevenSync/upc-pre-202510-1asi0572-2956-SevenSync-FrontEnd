import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterLink} from '@angular/router';
import {SignUpRequest} from '../../model/sign-up.request';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatIconButton
  ],
  template: `
    <form [formGroup]="signUpForm" (ngSubmit)="onSubmit()" class="sign-up-form">
      <div class="form-field">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Correo electrónico</mat-label>
          <input matInput type="email" formControlName="email" placeholder="tu@email.com">
          <mat-icon matSuffix>email</mat-icon>
          <mat-error *ngIf="signUpForm.get('email')?.hasError('required')">
            El correo es requerido
          </mat-error>
          <mat-error *ngIf="signUpForm.get('email')?.hasError('email')">
            Ingresa un correo válido
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-field">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Contraseña</mat-label>
          <input matInput
                 [type]="hidePassword ? 'password' : 'text'"
                 formControlName="password"
                 placeholder="Mínimo 6 caracteres">
          <button mat-icon-button matSuffix (click)="togglePasswordVisibility()" type="button">
            <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <mat-error *ngIf="signUpForm.get('password')?.hasError('required')">
            La contraseña es requerida
          </mat-error>
          <mat-error *ngIf="signUpForm.get('password')?.hasError('minlength')">
            La contraseña debe tener al menos 6 caracteres
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-field">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Confirmar contraseña</mat-label>
          <input matInput
                 [type]="hideConfirmPassword ? 'password' : 'text'"
                 formControlName="confirmPassword"
                 placeholder="Repite tu contraseña">
          <button mat-icon-button matSuffix (click)="toggleConfirmPasswordVisibility()" type="button">
            <mat-icon>{{ hideConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <mat-error *ngIf="signUpForm.get('confirmPassword')?.hasError('required')">
            Confirma tu contraseña
          </mat-error>
          <mat-error *ngIf="signUpForm.get('confirmPassword')?.hasError('passwordMismatch')">
            Las contraseñas no coinciden
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-field">
        <mat-checkbox formControlName="acceptTerms" color="primary">
          Acepto los <a href="#" target="_blank">términos y condiciones</a> y la
          <a href="#" target="_blank">política de privacidad</a>
        </mat-checkbox>
        <mat-error *ngIf="signUpForm.get('acceptTerms')?.hasError('required') && signUpForm.get('acceptTerms')?.touched">
          Debes aceptar los términos y condiciones
        </mat-error>
      </div>

      <div class="form-actions">
        <button mat-raised-button
                color="primary"
                type="submit"
                class="sign-up-button"
                [disabled]="signUpForm.invalid || isLoading">
          {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
        </button>
      </div>

      <div class="login-link">
        <p>¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión aquí</a></p>
      </div>
    </form>
  `,
  styles: [`
    .sign-up-form {
      width: 100%;
      max-width: 400px;
    }

    .form-field {
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
    }

    .form-field mat-checkbox {
      font-size: 0.9rem;
    }

    .form-field mat-checkbox a {
      color: #296244;
      text-decoration: none;
    }

    .form-field mat-checkbox a:hover {
      text-decoration: underline;
    }

    .form-field mat-error {
      margin-top: 8px;
      font-size: 0.8rem;
    }

    .form-actions {
      margin: 20px 0;
    }

    .sign-up-button {
      width: 100%;
      height: 48px;
      background-color: #2ecc71;
      color: white;
      font-weight: 600;
    }

    .login-link {
      text-align: center;
      margin-top: 20px;
    }

    .login-link p {
      margin: 0;
      color: #666;
    }

    .login-link a {
      color: #296244;
      text-decoration: none;
      font-weight: 600;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class SignUpComponent {
  @Output() signUp = new EventEmitter<SignUpRequest>();

  signUpForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
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
    if (this.signUpForm.valid) {
      this.isLoading = true;
      const formValue = this.signUpForm.value;
      const signUpRequest = new SignUpRequest(formValue.email, formValue.password);
      this.signUp.emit(signUpRequest);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
