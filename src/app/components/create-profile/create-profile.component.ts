import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-profile',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardSubtitle,
        MatError,
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {
  profileForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  private router = inject(Router);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/)]],
      adress: ['', Validators.required],
      countryCode: ['', [Validators.required, Validators.pattern(/^\+\d{1,4}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{3}-\d{3}$/)]],
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

    const formValues = this.profileForm.value;

    const body = {
      firstName: formValues.name,
      lastName: formValues.lastName,
      street: formValues.adress,
      number: "string", // Puedes adaptarlo si hay un campo para número
      city: "string",
      postalCode: "string",
      country: "string",
      countryCode: formValues.countryCode,
      phoneNumber: formValues.phoneNumber
    };

    this.http.post('https://macetech.azurewebsites.net/api/profiles/create', body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    }).subscribe({
      next: (res: any) => {
        if (res.created) {
          this.successMessage = 'Perfil creado correctamente, redirigiendo...';
          setTimeout(() => this.router.navigate(['/profile']), 2000);
          this.errorMessage = '';
          this.profileForm.reset();
        } else {
          this.errorMessage = 'No se pudo crear el perfil.';
          this.successMessage = '';
        }
      },
      error: () => {
        this.errorMessage = 'Error al crear el perfil.';
        this.successMessage = '';
      }
    });
  }




}
