import { Component, OnInit } from "@angular/core"
import { FormBuilder,  FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatStepperModule } from "@angular/material/stepper"
import { CommonModule } from "@angular/common"
import { MatDialog } from "@angular/material/dialog"
import {PotLimitDialogComponent} from './pot-limit-dialog.component';
import {ToolbarComponent} from '../../shared/components/toolbar/toolbar.component';

@Component({
  selector: "app-add-pot",
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    ToolbarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./add-pot.component.html",
  styleUrl: "./add-pot.component.css",
})
export class AddPotComponent implements OnInit {
  plantInfoForm: FormGroup
  careSettingsForm: FormGroup
  selectedImage: File | null = null
  imagePreview: string | null = null
  currentUserPlan = "free" // Simular plan del usuario
  currentPotCount = 3 // Simular cantidad actual de macetas

  plantTypes = [
    { value: "interior", label: "Planta de interior" },
    { value: "exterior", label: "Planta de exterior" },
    { value: "tropical", label: "Planta tropical" },
    { value: "suculenta", label: "Suculenta" },
    { value: "colgante", label: "Planta colgante" },
    { value: "aromatica", label: "Planta aromática" },
  ]

  lightNeedsOptions = [
    { value: "baja", label: "Luz baja" },
    { value: "media", label: "Luz media" },
    { value: "alta", label: "Luz alta" },
    { value: "directa", label: "Luz solar directa" },
    { value: "indirecta", label: "Luz indirecta brillante" },
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.plantInfoForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      plantType: ["", Validators.required],
      description: ["", [Validators.required, Validators.minLength(10)]],
    })

    this.careSettingsForm = this.fb.group({
      lightNeeds: ["", Validators.required],
      optimalTemperature: ["", Validators.required],
      optimalHumidity: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.checkPotLimit()
  }

  checkPotLimit(): void {
    const maxPots = this.currentUserPlan === "free" ? 4 : Number.POSITIVE_INFINITY

    if (this.currentPotCount >= maxPots) {
      this.openPotLimitDialog()
    }
  }

  openPotLimitDialog(): void {
    const dialogRef = this.dialog.open(PotLimitDialogComponent, {
      width: "500px",
      disableClose: true,
      data: {
        currentPotCount: this.currentPotCount,
        maxPots: 4,
        userPlan: this.currentUserPlan,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "upgrade") {
        this.router.navigate(["/membership"])
      } else {
        this.router.navigate(["/pots"])
      }
    })
  }

  goBack(): void {
    this.router.navigate(["/pots"])
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]
      this.selectedImage = file

      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  triggerImageUpload(): void {
    const fileInput = document.getElementById("imageInput") as HTMLInputElement
    fileInput?.click()
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()
  }

  onDrop(event: DragEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const files = event.dataTransfer?.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        this.selectedImage = file

        const reader = new FileReader()
        reader.onload = (e) => {
          this.imagePreview = e.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    }
  }

  onCancel(): void {
    this.goBack()
  }

  onSubmit(): void {
    if (this.plantInfoForm.valid && this.careSettingsForm.valid) {
      const plantData = {
        ...this.plantInfoForm.value,
        ...this.careSettingsForm.value,
        image: this.selectedImage,
      }

      console.log("Datos de la nueva maceta:", plantData)

      // Aquí harías la llamada al servicio para crear la maceta
      // this.potService.createPot(plantData)

      // Simular creación exitosa
      this.router.navigate(["/pots"])
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.plantInfoForm.controls).forEach((key) => {
        this.plantInfoForm.get(key)?.markAsTouched()
      })
      Object.keys(this.careSettingsForm.controls).forEach((key) => {
        this.careSettingsForm.get(key)?.markAsTouched()
      })
    }
  }

  // Getters para el primer formulario
  get name() {
    return this.plantInfoForm.get("name")
  }
  get plantType() {
    return this.plantInfoForm.get("plantType")
  }
  get description() {
    return this.plantInfoForm.get("description")
  }

  // Getters para el segundo formulario
  get lightNeeds() {
    return this.careSettingsForm.get("lightNeeds")
  }
  get optimalTemperature() {
    return this.careSettingsForm.get("optimalTemperature")
  }
  get optimalHumidity() {
    return this.careSettingsForm.get("optimalHumidity")
  }
}
