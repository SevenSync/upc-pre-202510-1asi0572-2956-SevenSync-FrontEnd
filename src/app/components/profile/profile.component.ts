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
  isEditingProfile = false;

  nombre = 'John Doe';
  correo = 'johndoe@gmail.com';
  telefono = '';
  direccion = '';

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
