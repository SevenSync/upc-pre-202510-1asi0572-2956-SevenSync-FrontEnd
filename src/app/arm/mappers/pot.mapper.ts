// src/app/arm/mappers/pot.mapper.ts

import { Pot, PotStatus } from '../model/pot.entity';
import { PotResponse } from '../model/pot.response';

/**
 * Convierte el objeto de respuesta de la API (PotResponse) en el modelo de datos
 * plano y limpio que usa la aplicación internamente (Pot).
 * @param response El objeto de datos recibido de la API.
 * @returns Un objeto Pot con una estructura aplanada.
 */
export function mapPotResponseToPot(response: PotResponse): Pot {
  const pot: Pot = {
    // --- Propiedades de Nivel Superior ---
    id: response.id,
    name: response.name,
    location: response.location,
    status: response.status as PotStatus, // Convertimos el número al tipo enum
    userId: response.assignedUserId || '', // Usamos '' como valor por defecto si es undefined
    plantId: response.plantId || 0, // Usamos 0 como valor por defecto

    // --- Aplanamiento del Objeto 'metrics' ---
    // Usamos el operador "Nullish Coalescing" (??) para asignar 0 si `metrics` no existe o si una propiedad es null/undefined.
    batteryLevel: response.metrics?.batteryLevel ?? 0,
    waterLevel: response.metrics?.waterLevel ?? 0,
    humidity: response.metrics?.humidity ?? 0,
    luminance: response.metrics?.luminance ?? 0,
    temperature: response.metrics?.temperature ?? 0,
    ph: response.metrics?.ph ?? 0,
    salinity: response.metrics?.salinity ?? 0,

    // --- Propiedades que podrían venir de otro lado o ser añadidas después ---
    // lastWatered: response.lastWatered ? new Date(response.lastWatered) : undefined,
    // createdAt: response.createdAt ? new Date(response.createdAt) : undefined,
    // updatedAt: response.updatedAt ? new Date(response.updatedAt) : undefined,
  };
  return pot;
}
