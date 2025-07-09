export interface PotResponse {
  id: number;
  name: string;
  location: string;
  status: number;
  deviceId?: string;
  assignedUserId?: string;
  plantId?: number;
  metrics?: {
    batteryLevel: number;
    waterLevel: number;
    humidity: number;
    luminance: number;
    temperature: number;
    ph: number;
    salinity: number;
    timestamp: string;
  };
}

export interface PotCreatedResponse {
  success: boolean;
}

export interface PotDeletedResponse {
  success: boolean;
}

export interface PotAssignedResponse {
  success: boolean;
}

export interface PotUnassignedResponse {
  success: boolean;
}

export interface PotMetricsUpdatedResponse {
  success: boolean;
}

export interface LinkPlantResponse {
  success: boolean;
}

export interface UnlinkPlantResponse {
  success: boolean;
}
