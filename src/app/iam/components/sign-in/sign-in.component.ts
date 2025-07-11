import { Component, Output, EventEmitter, inject, Input, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SignInRequest } from '../../model/sign-in.request';
import { TranslateModule } from '@ngx-translate/core';

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
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // ✅ El estado de carga ahora se recibe del componente padre. Es la única fuente de verdad.
  @Input({ required: true }) isLoading: Signal<boolean> = signal(false);
  @Output() signIn = new EventEmitter<SignInRequest>();

  // ✅ Inyección de dependencias moderna
  private fb = inject(FormBuilder);

  // ✅ El estado interno también usa `signal` para ser consistente
  hidePassword = signal(true);

  // Definición del formulario
  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // ✅ Getters para un acceso más limpio a los controles del formulario desde la plantilla
  get email() {
    return this.signInForm.controls['email'];
  }

  get password() {
    return this.signInForm.controls['password'];
  }

  /**
   * Se ejecuta cuando el formulario es enviado.
   * Ya no necesita gestionar el estado `isLoading`.
   */
  onSubmit(): void {
    if (this.signInForm.valid) {
      const formValue = this.signInForm.value;
      const signInRequest = new SignInRequest(formValue.email, formValue.password);
      this.signIn.emit(signInRequest);
    }
  }

  /**
   * Cambia la visibilidad de la contraseña.
   */
  togglePasswordVisibility(): void {
    this.hidePassword.update(currentValue => !currentValue);
  }
}
