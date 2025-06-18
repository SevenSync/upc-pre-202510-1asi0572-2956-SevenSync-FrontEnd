import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {RegisterUserUseCase} from '../../application/use-cases/register-user.usecase';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerUserUseCase: RegisterUserUseCase
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.password?.valueChanges.subscribe(() => {
      this.confirmPassword?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(group: AbstractControl): null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (password !== confirm) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
    }
    return null;
  }

  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;

    this.registerUserUseCase.execute({ email, password }).subscribe({
      next: (res) => {
        if (res.created) {
          this.successMessage = 'Registro exitoso';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        } else {
          this.errorMessage = 'No se pudo registrar. Intenta de nuevo.';
        }
      },
      error: () => {
        this.errorMessage = 'Error durante el registro.';
      }
    });
  }
}
