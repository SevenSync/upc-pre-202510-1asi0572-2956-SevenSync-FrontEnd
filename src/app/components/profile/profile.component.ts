import {MatIconModule} from '@angular/material/icon';

import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import {ToolbarComponent} from '../public/toolbar/toolbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Router} from '@angular/router';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule, MatDialogRef
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
     MatDialogModule,
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
  private router = inject(Router);

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
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.http.get<{ id: number; fullName: string; streetAddress: string,phoneNumber:string }>(
      'https://macetech.azurewebsites.net/api/profiles/get',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: (res) => {
        this.nombre = res.fullName;
        this.direccion = res.streetAddress;
        this.telefono=res.phoneNumber ;
      },
      error: (err) => {
        console.error('Error al obtener perfil:', err);
      }
    });
  }


  // 🔹 Llama al endpoint /api/user/{uid}
  loadUserData() {
    const uid = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    if (!uid || !token) return;


    this.http.get<{ uid: string; email: string }>(
      `https://macetech.azurewebsites.net/api/users/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: (res) => {
        this.correo = res.email;
      },
      error: (err) => {
        console.error('Error al obtener email:', err);
      }
    });
  }

  // 🔹 Llama al endpoint /api/profiles/update
  updateProfileData() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    // Separar los valores necesarios
    const [firstName, ...lastParts] = this.nombre.split(' ');
    const lastName = lastParts.join(' ') || '';

    const body = {
      firstName: firstName,
      lastName: lastName,
      street: this.direccion, // Puedes separar más si quieres exactitud
      number: "string",
      city: "string",
      postalCode: "string",
      country: "string",
      countryCode: "+51",
      phoneNumber: this.telefono
    };

    this.http.put('https://macetech.azurewebsites.net/api/profiles/update', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        console.log('Perfil actualizado correctamente.');
        this.isEditingProfile = false;
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
      }
    });
  }


  signOut() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.http.post('https://macetech.azurewebsites.net/api/users/sign-out', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        localStorage.clear(); // Elimina token y uid
        this.router.navigate(['/login']); // Redirige al login
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        // Aun si hay error, limpiamos y redirigimos
        localStorage.clear();
        this.router.navigate(['/login']);
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
export class ChangeProfileDialog  {

  private http = inject(HttpClient);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<ChangeProfileDialog>);

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  changePassword() {
    // Validación básica
    if (!this.newPassword || this.newPassword.length < 8 || this.newPassword !== this.confirmPassword) {
      alert('La nueva contraseña no es válida o no coincide con la confirmación.');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) return;

    const body = { newPassword: this.newPassword };

    this.http.post('https://macetech.azurewebsites.net/api/users/change-password', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          alert('Contraseña cambiada con éxito.');
          localStorage.clear(); // Limpiamos el token
          this.dialogRef.close();
          this.router.navigate(['/login']);
        } else {
          alert('Error al cambiar la contraseña.');
        }
      },
      error: () => {
        alert('Error al cambiar la contraseña.');
      }
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
  private http = inject(HttpClient);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<DeleteAccountDialog>);

  deleteAccount() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    this.http.post('https://macetech.azurewebsites.net/api/users/delete-account', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res: any) => {
        if (res.deleted) {
          alert('Cuenta eliminada con éxito.');
          localStorage.clear();
          this.dialogRef.close();
          this.router.navigate(['/login']);
        } else {
          alert('No se pudo eliminar la cuenta.');
        }
      },
      error: (err) => {
        console.error('Error al eliminar cuenta:', err);
        alert('Hubo un error al intentar eliminar la cuenta.');
      }
    });
  }

}
