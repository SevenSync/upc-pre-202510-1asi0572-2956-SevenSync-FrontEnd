import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {SendPasswordRecoveryUseCase} from '../../application/use-cases/send-password-recovery.usecase';


@Component({
  selector: 'app-password-recovery',
  standalone: true,
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PasswordRecoveryComponent {
  recoverForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private sendRecovery: SendPasswordRecoveryUseCase
  ) {
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

    this.sendRecovery.execute({ email }).subscribe({
      next: (res) => {
        if (res.sent) {
          this.successMessage = 'Revisa tu correo para restablecer tu contraseña.';
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No se pudo enviar el enlace.';
          this.successMessage = '';
        }
      },
      error: () => {
        this.errorMessage = 'Hubo un error al procesar tu solicitud.';
        this.successMessage = '';
      }
    });
  }
}
