export class Pot {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public status: number,
    public deviceId?: string,
    public assignedUserId?: string,
    public plantId?: number,
    public metrics?: PotMetrics,
    public lastWatered?: Date
  ) {}

  get isAssigned(): boolean {
    return !!this.assignedUserId;
  }

  get hasPlant(): boolean {
    return !!this.plantId;
  }

  get healthStatus(): 'healthy' | 'warning' | 'critical' {
    if (!this.metrics) return 'warning';

    const { humidity, temperature, batteryLevel } = this.metrics;

    if (humidity < 20 || batteryLevel < 15) return 'critical';
    if (humidity < 40 || temperature > 30 || batteryLevel < 30) return 'warning';
    return 'healthy';
  }

  get needsWatering(): boolean {
    return this.metrics ? this.metrics.humidity < 30 : false;
  }

  updateMetrics(metrics: PotMetrics): void {
    this.metrics = metrics;
  }

  assignToUser(userId: string): void {
    this.assignedUserId = userId;
  }

  unassignFromUser(): void {
    this.assignedUserId = undefined;
  }

  linkPlant(plantId: number): void {
    this.plantId = plantId;
  }

  unlinkPlant(): void {
    this.plantId = undefined;
  }
}

export class PotMetrics {
  constructor(
    public batteryLevel: number,
    public waterLevel: number,
    public humidity: number,
    public luminance: number,
    public temperature: number,
    public ph: number,
    public salinity: number,
    public timestamp: Date = new Date()
  ) {}

  get batteryStatus(): 'good' | 'low' | 'critical' {
    if (this.batteryLevel >= 70) return 'good';
    if (this.batteryLevel >= 30) return 'low';
    return 'critical';
  }

  get humidityStatus(): 'optimal' | 'low' | 'critical' {
    if (this.humidity >= 60) return 'optimal';
    if (this.humidity >= 30) return 'low';
    return 'critical';
  }
}
