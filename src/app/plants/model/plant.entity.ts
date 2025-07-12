export type RequirementLevel = 'Bajo' | 'Media' | 'Alta';

export class Plant {
  constructor(
    public readonly id: number,
    public commonName: string,
    public scientificName: string,
    public watering: string,
    public sunlight: string,
    public soil: string,
    public temperature: string,
    public humidity: string,
    public ph: string,
    public imageUrl: string
  ) {}

  /**
   * Traduce el valor de la API (ej: "Average", "Frequent") a un nivel simple.
   */
  getWateringLevel(): RequirementLevel {
    const wateringLower = this.watering.toLowerCase();
    if (wateringLower.includes('frequent')) {
      return 'Alta';
    }
    if (wateringLower.includes('average')) {
      return 'Media';
    }
    return 'Bajo'; // Para "Minimum" o "None"
  }

  /**
   * Traduce el valor de la API (ej: "full sun", "part shade") a un nivel simple.
   */
  getSunlightLevel(): RequirementLevel {
    const sunlightLower = this.sunlight.toLowerCase();
    if (sunlightLower.includes('full sun')) {
      return 'Alta';
    }
    if (sunlightLower.includes('part shade')) {
      return 'Media';
    }
    return 'Bajo'; // Para "indirect", "filtered shade", etc.
  }
}
