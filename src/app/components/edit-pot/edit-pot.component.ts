import { Component, OnInit, ViewEncapsulation } from "@angular/core"
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { ToolbarComponent } from "../public/toolbar/toolbar.component"
import { CommonModule } from "@angular/common"

interface PotEditData {
  id: number
  name: string
  plantType: string
  description: string
  image: string
  wateringSchedule: string
  lightNeeds: string
  optimalTemperature: string
  optimalHumidity: string
}

@Component({
  selector: "app-edit-pot",
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ToolbarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./edit-pot.component.html",
  styleUrl: "./edit-pot.component.css",
  encapsulation: ViewEncapsulation.None
})
export class EditPotComponent implements OnInit {
  editForm: FormGroup
  potId = 0
  selectedImage: File | null = null
  imagePreview: string | null = null

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

  // Datos simulados de la maceta
  potData: PotEditData = {
    id: 1,
    name: "Monstera Deliciosa",
    plantType: "interior",
    description:
      "La Monstera Deliciosa es una planta tropical con hojas grandes y perforadas. Es fácil de cuidar y prefiere luz indirecta brillante.",
    image: "demoplant.png",
    wateringSchedule: "Cada 5-7 días",
    lightNeeds: "indirecta",
    optimalTemperature: "18-27°C",
    optimalHumidity: "40-60%",
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      plantType: ["", Validators.required],
      description: ["", [Validators.required, Validators.minLength(10)]],
      wateringSchedule: ["", Validators.required],
      lightNeeds: ["", Validators.required],
      optimalTemperature: ["", Validators.required],
      optimalHumidity: [""],
    })
  }

  ngOnInit(): void {
    this.potId = Number(this.route.snapshot.paramMap.get("id")) || 1
    this.loadPotData()
    this.populateForm()
  }

  loadPotData(): void {
    // aquí se cargarían los datos desde el servicio
    console.log("Cargando datos de maceta ID:", this.potId)
    // Simular carga de datos específicos según el ID
  }

  populateForm(): void {
    this.editForm.patchValue({
      name: this.potData.name,
      plantType: this.potData.plantType,
      description: this.potData.description,
      wateringSchedule: this.potData.wateringSchedule,
      lightNeeds: this.potData.lightNeeds,
      optimalTemperature: this.potData.optimalTemperature,
      optimalHumidity: this.potData.optimalHumidity,
    })
    this.imagePreview = this.potData.image
  }

  goBack(): void {
    this.router.navigate(["/pot-details", this.potId])
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      const file = input.files[0]
      this.selectedImage = file

      // Crear preview de la imagen
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
    if (this.editForm.valid) {
      const formData = this.editForm.value
      console.log("Datos del formulario:", formData)
      console.log("Imagen seleccionada:", this.selectedImage)

      // Aquí harías la llamada al servicio para actualizar la maceta
      // this.potService.updatePot(this.potId, formData, this.selectedImage)

      // Simular guardado exitoso
      this.router.navigate(["/pot-details", this.potId])
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.editForm.controls).forEach((key) => {
        this.editForm.get(key)?.markAsTouched()
      })
    }
  }

  // Getters para acceder a los controles del formulario
  get name() {
    return this.editForm.get("name")
  }
  get plantType() {
    return this.editForm.get("plantType")
  }
  get description() {
    return this.editForm.get("description")
  }
  get wateringSchedule() {
    return this.editForm.get("wateringSchedule")
  }
  get lightNeeds() {
    return this.editForm.get("lightNeeds")
  }
  get optimalTemperature() {
    return this.editForm.get("optimalTemperature")
  }
  get optimalHumidity() {
    return this.editForm.get("optimalHumidity")
  }
}

