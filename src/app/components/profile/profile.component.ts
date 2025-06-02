import {MatIconModule} from '@angular/material/icon';

import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from '../public/toolbar/toolbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterLink} from '@angular/router';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule,
    ToolbarComponent, MatTabsModule, MatCheckboxModule,
    RouterLink, MatDialogModule,
    MatFormFieldModule,
    MatInputModule, FormsModule, NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly dialog = inject(MatDialog);
  private http = inject(HttpClient);

  isEditingProfile = false;

  nombre = '';
  correo = '';
  telefono = '';
  direccion = '';

  ngOnInit() {
    this.loadProfileData();
    this.loadUserData();
  }

  // 🔹 Llama al endpoint /api/profiles/get
  loadProfileData() {
    this.http.get<{ id: number; fullName: string; streetAddress: string }>(
      'https://macetech.azurewebsites.net/api/profiles/get'
    ).subscribe({
      next: (res) => {
        this.nombre = res.fullName;
        this.direccion = res.streetAddress;
      },
      error: (err) => {
        console.error('Error al obtener perfil:', err);
      }
    });
  }

  // 🔹 Llama al endpoint /api/user/{uid}
  loadUserData() {
    const uid = localStorage.getItem('userId'); // asumimos que lo guardaste al iniciar sesión
    if (!uid) return;

    this.http.get<{ uid: string; email: string }>(
      `https://macetech.azurewebsites.net/api/user/${uid}`
    ).subscribe({
      next: (res) => {
        this.correo = res.email;
      },
      error: (err) => {
        console.error('Error al obtener email:', err);
      }
    });
  }

  openReset_Password_Dialog() {
    this.dialog.open(ChangeProfileDialog);
  }

  openDeleteAccount_Dialog() {
    this.dialog.open(DeleteAccountDialog);
  }

  enableProfileEditing() {
    this.isEditingProfile = true;
  }

  cancelEditing() {
    this.isEditingProfile = false;
  }

  saveChanges() {
    // lógica de guardado
    this.isEditingProfile = false;
  }


}
@Component({
  selector: 'change-profile-dialog',
  templateUrl: 'change-profile-dialog.html',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeProfileDialog  {
}

@Component({
  selector: 'delete-account-dialog',
  templateUrl: 'delete-account-dialog.html',
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountDialog  {

}
