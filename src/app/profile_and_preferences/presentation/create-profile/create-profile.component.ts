import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreateProfileUseCase } from '../../application/usecases/create-profile.usecase';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ]
})
export class CreateProfileComponent {
  profileForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private createProfile: CreateProfileUseCase
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      adress: ['', Validators.required],
      countryCode: ['', [Validators.required, Validators.pattern(/^\+\d{1,4}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Por favor completa correctamente todos los campos.';
      this.successMessage = '';
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = 'Sesión no válida. Por favor inicia sesión.';
      return;
    }

    const values = this.profileForm.value;
    const profile = {
      firstName: values.name,
      lastName: values.lastName,
      street: values.adress,
      number: 'string',
      city: 'string',
      postalCode: 'string',
      country: 'string',
      countryCode: values.countryCode,
      phoneNumber: values.phoneNumber
    };

    this.createProfile.execute(profile, token).subscribe({
      next: (res) => {
        if (res.created) {
          this.successMessage = 'Perfil creado correctamente, redirigiendo...';
          setTimeout(() => this.router.navigate(['/profile']), 2000);
          this.profileForm.reset();
        } else {
          this.errorMessage = 'No se pudo crear el perfil.';
        }
      },
      error: () => {
        this.errorMessage = 'Error al crear el perfil.';
        this.successMessage = '';
      }
    });
  }
}
