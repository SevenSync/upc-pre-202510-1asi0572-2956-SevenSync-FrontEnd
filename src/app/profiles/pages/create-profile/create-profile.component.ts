import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { ProfileService } from '../../services/profile.service';
import {UpdateProfileRequest} from '../../model/update-profile.request';
import {CreateProfileRequest} from '../../model/create-profile.request';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ProfileFormComponent
  ],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent {
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  onProfileSubmit(profileRequest: UpdateProfileRequest): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Sesión no válida. Por favor inicia sesión.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const createRequest = new CreateProfileRequest(
      profileRequest.firstName,
      profileRequest.lastName,
      profileRequest.street,
      profileRequest.number,
      profileRequest.city,
      profileRequest.postalCode,
      profileRequest.country,
      profileRequest.countryCode,
      profileRequest.phoneNumber
    );

    this.profileService.createProfile(createRequest, token).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.created) {
          this.successMessage = 'Perfil creado correctamente, redirigiendo...';
          setTimeout(() => {
            this.router.navigate(['/pots']);
          }, 2000);
        } else {
          this.errorMessage = 'No se pudo crear el perfil.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating profile:', error);
        this.errorMessage = 'Error al crear el perfil. Intenta nuevamente.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }
}
