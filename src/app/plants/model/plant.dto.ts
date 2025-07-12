export interface PlantDto {
  id: number;
  common_name: string;
  scientific_name: string;
  watering: string;
  sunlight: string;
  soil: string;
  temperature: string;
  humidity: string;
  ph: string;
  default_image?: {
    original_url: string;
  };
}
