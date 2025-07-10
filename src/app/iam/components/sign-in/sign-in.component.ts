import {Component, Output, EventEmitter, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {SignInRequest} from '../../model/sign-in.request';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    TranslateModule
  ],
  template: `
    <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="sign-in-form">
      <div class="form-field">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ 'LOGIN.SIGN_IN.EMAIL_LABEL' | translate }}</mat-label>
          <input matInput type="email" formControlName="email" [placeholder]="'LOGIN.SIGN_IN.EMAIL_PLACEHOLDER' | translate">
          <mat-icon matSuffix>email</mat-icon>
          <mat-error *ngIf="signInForm.get('email')?.hasError('required')">
            {{ 'LOGIN.SIGN_IN.EMAIL_REQUIRED' | translate }}
          </mat-error>
          <mat-error *ngIf="signInForm.get('email')?.hasError('email')">
            {{ 'LOGIN.SIGN_IN.EMAIL_INVALID' | translate }}
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-field">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>{{ 'LOGIN.SIGN_IN.PASSWORD_LABEL' | translate }}</mat-label>
          <input matInput
                 [type]="hidePassword ? 'password' : 'text'"
                 formControlName="password"
                 [placeholder]="'LOGIN.SIGN_IN.PASSWORD_PLACEHOLDER' | translate">
          <button mat-icon-button matSuffix (click)="togglePasswordVisibility()" type="button">
            <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <mat-error *ngIf="signInForm.get('password')?.hasError('required')">
            {{ 'LOGIN.SIGN_IN.PASSWORD_REQUIRED' | translate }}
          </mat-error>
          <mat-error *ngIf="signInForm.get('password')?.hasError('minlength')">
            {{ 'LOGIN.SIGN_IN.PASSWORD_MINLENGTH' | translate }}
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-actions">
        <div class="forgot-password">
          <a routerLink="/password-recovery">{{ 'LOGIN.SIGN_IN.FORGOT_PASSWORD' | translate }}</a>
        </div>

        <button mat-raised-button
                color="primary"
                type="submit"
                class="sign-in-button"
                [disabled]="signInForm.invalid || isLoading">
          {{ isLoading ? ('LOGIN.SIGN_IN.LOADING' | translate) : ('LOGIN.SIGN_IN.SUBMIT' | translate) }}
        </button>
      </div>

      <div class="register-link">
        <p>{{ 'LOGIN.SIGN_IN.NO_ACCOUNT' | translate }} <a routerLink="/register">{{ 'LOGIN.SIGN_IN.REGISTER' | translate }}</a></p>
      </div>
    </form>

  `,
  styles: [`
    .sign-in-form {
      width: 100%;
      max-width: 400px;
    }

    .form-field {
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 20px 0;
    }

    .forgot-password {
      text-align: right;
    }

    .forgot-password a {
      color: #296244;
      text-decoration: none;
      font-size: 0.9rem;
    }

    .forgot-password a:hover {
      text-decoration: underline;
    }

    .sign-in-button {
      width: 100%;
      height: 48px;
      background-color: #2ecc71;
      color: white;
      font-weight: 600;
    }

    .register-link {
      text-align: center;
      margin-top: 20px;
    }

    .register-link p {
      margin: 0;
      color: #666;
    }

    .register-link a {
      color: #296244;
      text-decoration: none;
      font-weight: 600;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class SignInComponent {
  @Output() signIn = new EventEmitter<SignInRequest>();

  signInForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
    if (this.signInForm.valid) {
      this.isLoading = true;
      const formValue = this.signInForm.value;
      const signInRequest = new SignInRequest(formValue.email, formValue.password);
      this.signIn.emit(signInRequest);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }
}
