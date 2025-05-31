import { Component } from "@angular/core";
import { NgIf } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router, ActivatedRoute, RouterLink} from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { HttpClient } from '@angular/common/http';
import { inject } from "@angular/core";

import {MatSelectModule} from '@angular/material/select';
import {
  MatSnackBar, MatSnackBarAction, MatSnackBarActions,
  MatSnackBarHorizontalPosition,
  MatSnackBarLabel, MatSnackBarRef,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

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
  private http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }



  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = this.loginForm.value;

    this.http.post<{ uid: string; token: string }>(
      'https://macetech.azurewebsites.net/api/users/sign-in',
      loginData,
    ).subscribe({
      next: (res) => {
        // console.log('Login exitoso:', res);
        this.openSnackBar();

        // Guardar token (ejemplo en localStorage)
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userId', res.uid);

        // Redireccionar
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Correo o contraseña incorrectos.';
        // console.error('Error de login:', err);
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
