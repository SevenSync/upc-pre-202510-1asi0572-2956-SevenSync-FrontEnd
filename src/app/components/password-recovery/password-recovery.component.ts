import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardSubtitle} from "@angular/material/card";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-password-recovery',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        MatCardContent,
        MatCardSubtitle,
        MatError,
        MatFormField,
        MatInput,
        NgIf,
        ReactiveFormsModule,
    ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {
  recoverForm: FormGroup;
  private http = inject(HttpClient);

  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.recoverForm.get('email');
  }

  onSubmit() {
    if (this.recoverForm.invalid) return;

    const { email } = this.recoverForm.value;

    this.http.patch<{ sent: boolean }>(
      'https://macetech.azurewebsites.net/api/users/password-recovery',
      { email }
    ).subscribe({
      next: (res) => {
        if (res.sent) {
          this.successMessage = 'Revisa tu correo para restablecer tu contraseña.';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No se pudo enviar el enlace.';
          this.successMessage = '';
        }
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al procesar tu solicitud.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
