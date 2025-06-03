import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

import { HttpClient } from '@angular/common/http';
import { inject } from "@angular/core";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  private http = inject(HttpClient);
  private router = inject(Router);
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });

  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirm = group.get('confirmPassword');

    if (!password || !confirm) return null;

    const passwordValue = password.value;
    const confirmValue = confirm.value;

    if (passwordValue !== confirmValue) {
      confirm.setErrors({ mismatch: true });
    } else if (confirm.hasError('mismatch')) {
      const errors = { ...confirm.errors };
      delete errors['mismatch'];
      confirm.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  }



  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;

    this.http.post<{ created: boolean }>(
      'https://macetech.azurewebsites.net/api/users/sign-up',
      { email, password }
    ).subscribe({
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
        // console.error(err);
      }
    });
  }
}
