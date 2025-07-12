import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { CreatePotRequest } from '../../model/create-pot.request';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-create-pot-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    TranslateModule
  ],
  templateUrl: "./create-pot-dialog.component.html",
  styleUrl: './create-pot-dialog.component.css'
})
export class CreatePotDialogComponent implements OnInit {
  basicInfoForm!: FormGroup;
  technicalForm!: FormGroup;
  isCreating = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePotDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.basicInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      location: ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.technicalForm = this.fb.group({
      deviceId: ['', [Validators.maxLength(20)]],
      status: [1, [Validators.required]]
    });
  }

  getStatusName(status: number): string {
    switch (status) {
      case 0: return 'Inactiva';
      case 1: return 'Activa';
      case 2: return 'Mantenimiento';
      default: return 'Desconocido';
    }
  }

  onCreatePot(): void {
    if (this.basicInfoForm.valid && this.technicalForm.valid) {
      this.isCreating = true;

      const potRequest = new CreatePotRequest(
        this.basicInfoForm.get('name')?.value,
        this.basicInfoForm.get('location')?.value,
        this.technicalForm.get('status')?.value
      );

      // Simular delay de creación
      setTimeout(() => {
        this.dialogRef.close({
          success: true,
          potRequest: potRequest,
          deviceId: this.technicalForm.get('deviceId')?.value
        });
      }, 1500);
    }
  }
}
