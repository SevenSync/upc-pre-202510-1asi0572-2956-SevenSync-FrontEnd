import {Component, inject} from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../../iam/services/user.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-delete-account-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,TranslateModule],
  template: `
    <div class="container">
      <mat-dialog-content class="mat-typography">
        <h2>{{ 'PROFILE.DELETE_ACCOUNT.TITLE' | translate }}</h2>
        <p class="subtitle">{{ 'PROFILE.DELETE_ACCOUNT.CONFIRMATION' | translate }}</p>
        <mat-dialog-actions class="button-row">
          <button class="save" mat-button (click)="deleteAccount()">
            {{ 'PROFILE.DELETE_ACCOUNT.DELETE_BUTTON' | translate }}
          </button>
          <button class="cancel" mat-button [mat-dialog-close]="true">
            {{ 'PROFILE.DELETE_ACCOUNT.CANCEL_BUTTON' | translate }}
          </button>
        </mat-dialog-actions>
      </mat-dialog-content>
    </div>

  `,
  styles: [`
    .container { padding: .5rem; background-color: #f9f9f9; border-radius: 15px; }
    .subtitle { margin-top: 5px; }
    .button-row { width: 100%; display: flex; justify-content: space-between; padding: 0.5rem; }
    .save { background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
    .cancel { background-color: #f44336; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
  `]
})
export class DeleteAccountDialogComponent {
  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private router: Router
  ) {}


  deleteAccount(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.userService.deleteAccount(token).subscribe({
      next: (response) => {
        if (response.deleted) {
          alert('Cuenta eliminada exitosamente.');
          localStorage.clear();
          this.dialogRef.close();
          this.router.navigate(['/login']);
        }
      },
      error: () => {
        alert('Error al eliminar la cuenta.');
        this.dialogRef.close();
      }
    });
  }
}
