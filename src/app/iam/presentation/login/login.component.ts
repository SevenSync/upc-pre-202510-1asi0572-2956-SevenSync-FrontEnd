import { Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router, ActivatedRoute, RouterLink} from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { inject } from "@angular/core";

import {MatSelectModule} from '@angular/material/select';
import {
  MatSnackBar, MatSnackBarActions,
  MatSnackBarLabel, MatSnackBarRef,
} from '@angular/material/snack-bar';
import {SignInUserUseCase} from '../../application/use-cases/sign-in-user.usecase';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  returnUrl: string;
  isLoading = false;
  errorMessage = '';
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private signInUser: SignInUserUseCase
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.signInUser.execute({ email, password }).subscribe({
      next: ({ token, uid }) => {
        this.openSnackBar();
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', uid);

        this.signInUser.checkProfile(token).subscribe({
          next: (result) => {
            const route = result.hasProfile ? '/profile' : '/create-profile';
            this.router.navigate([route]);
          },
          error: () => this.router.navigate(['/profile'])
        });
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}
@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: 'snack-bar.component.html',
  styleUrls: ["./login.component.css"],
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions],
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
