// presentation/profile/profile.component.ts
import { Component, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';

import {
  ChangePasswordUseCase, DeleteAccountUseCase,
  GetProfileUseCase,
  GetUserEmailUseCase,
  SignOutUseCase,
  UpdateProfileUseCase
} from '../../application/usecases/get-profile.usecase';
import {ToolbarComponent} from '../../../shared/toolbar/toolbar.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    MatTabsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  private getProfile = inject(GetProfileUseCase);
  private getUserEmail = inject(GetUserEmailUseCase);
  private signOutUseCase = inject(SignOutUseCase);
  private updateProfileUseCase = inject(UpdateProfileUseCase);
  private router = inject(Router);
  private dialog = inject(MatDialog);


  nombre = '';
  correo = '';
  telefono = '';
  direccion = '';
  isEditingProfile = false;

  ngOnInit() {
    this.loadProfileData();
    this.loadUserData();
  }

  loadProfileData() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.getProfile.execute(token).subscribe({
      next: (res) => {
        this.nombre = res.fullName;
        this.direccion = res.streetAddress;
        this.telefono = res.phoneNumber;
      },
      error: (err) => console.error('Error al obtener perfil:', err)
    });
  }

  loadUserData() {
    const token = localStorage.getItem('authToken');
    const uid = localStorage.getItem('userId');
    if (!uid || !token) return;

    this.getUserEmail.execute(uid, token).subscribe({
      next: (res) => this.correo = res.email,
      error: (err) => console.error('Error al obtener email:', err)
    });
  }

  updateProfileData() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const [firstName, ...lastParts] = this.nombre.split(' ');
    const lastName = lastParts.join(' ') || '';

    const profile = {
      firstName,
      lastName,
      street: this.direccion,
      number: 'string',
      city: 'string',
      postalCode: 'string',
      country: 'string',
      countryCode: '+51',
      phoneNumber: this.telefono
    };

    this.updateProfileUseCase.execute(profile, token).subscribe({
      next: () => {
        console.log('Perfil actualizado.');
        this.isEditingProfile = false;
      },
      error: (err) => console.error('Error al actualizar perfil:', err)
    });
  }

  signOut() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.signOutUseCase.execute(token).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  openResetPasswordDialog() {
    this.dialog.open(ChangePasswordDialog);
  }

  openDeleteAccountDialog() {
    this.dialog.open(DeleteAccountDialog);
  }


  enableProfileEditing() {
    this.isEditingProfile = true;
  }

  cancelEditing() {
    this.isEditingProfile = false;
  }

  saveChanges() {
    this.updateProfileData();
  }
}


// Diálogo para cambiar perfil
@Component({
  selector: 'change-profile-dialog',
  templateUrl: 'change-profile-dialog.html',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordDialog  {

  private changePasswordUseCase = inject(ChangePasswordUseCase);
  private dialogRef = inject(MatDialogRef<ChangePasswordDialog>);
  private router = inject(Router);

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  changePassword() {
    if (this.newPassword !== this.confirmPassword || this.newPassword.length < 8) {
      alert('Contraseña inválida o no coincide.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.changePasswordUseCase.execute(this.newPassword, token).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Contraseña cambiada con éxito.');
          localStorage.clear();
          this.dialogRef.close();
          this.router.navigate(['/login']);
        } else {
          alert('No se pudo cambiar la contraseña.');
        }
      },
      error: () => alert('Error al cambiar la contraseña.')
    });
  }

}

// Diálogo para eliminar cuenta
@Component({
  selector: 'delete-account-dialog',
  templateUrl: 'delete-account-dialog.html',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountDialog  {
  private deleteAccountUseCase = inject(DeleteAccountUseCase);
  private dialogRef = inject(MatDialogRef<DeleteAccountDialog>);
  private router = inject(Router);

  deleteAccount() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.deleteAccountUseCase.execute(token).subscribe({
      next: () => {
        alert('Cuenta eliminada.');
        localStorage.clear();
        this.dialogRef.close();
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Error al eliminar la cuenta.');
        this.dialogRef.close();
      }
    });
  }

}
