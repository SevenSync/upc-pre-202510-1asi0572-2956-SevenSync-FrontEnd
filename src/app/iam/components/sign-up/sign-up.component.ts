import { Component, Output, EventEmitter, inject, Input, Signal, signal } from '@angular/core'; // ✅ ASEGÚRATE DE IMPORTAR 'Input' y 'Signal'
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { SignUpRequest } from '../../model/sign-up.request';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatCheckboxModule, RouterLink, TranslateModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  // ✅ CORRECCIÓN: Esta línea es la que soluciona el error.
  // Define 'isLoading' como una propiedad de entrada (Input) que recibe un Signal.
  @Input({ required: true }) isLoading: Signal<boolean> = signal(false);

  @Output() signUp = new EventEmitter<SignUpRequest>();

  private fb = inject(FormBuilder);

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  }, { validators: this.passwordMatchValidator });

  get email(): FormControl { return this.signUpForm.get('email') as FormControl; }
  get password(): FormControl { return this.signUpForm.get('password') as FormControl; }
  get confirmPassword(): FormControl { return this.signUpForm.get('confirmPassword') as FormControl; }
  get acceptTerms(): FormControl { return this.signUpForm.get('acceptTerms') as FormControl; }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.signUpForm.value;
    this.signUp.emit(new SignUpRequest(email, password));
  }

  togglePasswordVisibility(): void { this.hidePassword.update(v => !v); }
  toggleConfirmPasswordVisibility(): void { this.hideConfirmPassword.update(v => !v); }
}
