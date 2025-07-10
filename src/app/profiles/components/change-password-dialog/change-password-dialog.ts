import {Component, inject} from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../iam/services/user.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,TranslateModule],
  template: `
    <div class="container">
      <mat-dialog-content class="mat-typography">
        <h2>{{ 'PROFILE.CHANGE_PASSWORD.TITLE' | translate }}</h2>
        <p class="subtitle">{{ 'CHANGE_PASSWORD.SUBTITLE' | translate }}</p>

        <form (ngSubmit)="changePassword()" #passwordForm="ngForm">
          <div class="field">
            <h3>{{ 'PROFILE.CHANGE_PASSWORD.NEW_PASSWORD' | translate }}</h3>
            <input type="password"
                   required
                   [(ngModel)]="newPassword"
                   name="newPassword"
                   minlength="6">
          </div>

          <div class="field">
            <h3>{{ 'PROFILE.CHANGE_PASSWORD.CONFIRM_PASSWORD' | translate }}</h3>
            <input type="password"
                   required
                   [(ngModel)]="confirmPassword"
                   name="confirmPassword"
                   minlength="6">
          </div>

          <mat-dialog-actions class="button-row">
            <button class="save"
                    type="submit"
                    [disabled]="!passwordForm.valid || newPassword !== confirmPassword">
              {{ 'PROFILE.CHANGE_PASSWORD.SAVE' | translate }}
            </button>

            <button class="cancel"
                    mat-dialog-close
                    type="button">
              {{ 'PROFILE.CHANGE_PASSWORD.CANCEL' | translate }}
            </button>
          </mat-dialog-actions>
        </form>
      </mat-dialog-content>
    </div>

  `,
  styles: [`
    .container { padding: .5rem; background-color: #f9f9f9; border-radius: 15px; }
    .field { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
    .field input { outline: none; border: 1px solid #B9B9B9; padding: 5px; border-radius: 5px; }
    .subtitle { color: #888; font-size: 0.9rem; margin-bottom: 1rem; }
    .button-row { display: flex; justify-content: space-between; margin-top: 1rem; }
    .save { background-color: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
    .cancel { background-color: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
    .save:disabled { background-color: #ccc; cursor: not-allowed; }
  `]
})
export class ChangePasswordDialogComponent {
  newPassword = '';
  confirmPassword = '';

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private router: Router
  ) {}



  changePassword(): void {
    if (this.newPassword !== this.confirmPassword || this.newPassword.length < 6) {
      alert('Contraseña inválida o no coincide.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) return;

    this.userService.changePassword(this.newPassword, token).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Contraseña cambiada con éxito. Por favor, inicia sesión nuevamente.');
          localStorage.clear();
          this.dialogRef.close();
          this.router.navigate(['/login']);
        } else {
          alert('No se pudo cambiar la contraseña.');
        }
      },
      error: () => {
        alert('Error al cambiar la contraseña.');
      }
    });
  }
}
