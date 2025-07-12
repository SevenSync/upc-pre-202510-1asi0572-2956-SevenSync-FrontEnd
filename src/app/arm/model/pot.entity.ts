// src/app/arm/model/pot.entity.ts

export enum PotStatus {
  Healthy = 0,
  Warning = 1,
  Critical = 2,
  Deleted = 3
}

export interface Pot {
  id: number;
  userId: string;
  plantId: number;
  name: string;
  location: string;

  // Métricas
  batteryLevel: number;
  waterLevel: number;
  humidity: number;
  luminance: number;
  temperature: number;
  ph: number;
  salinity: number;

  // LA PROPIEDAD 'status' AHORA ES DE TIPO PotStatus (un número)
  status: PotStatus;

  // Fechas
  assignedAt?: string; // o Date
  createdAt?: string; // o Date
  updatedAt?: string; // o Date
  lastWatered?: Date;
  imageUrl?: string;
}
