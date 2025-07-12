export class UpdatePotMetricsRequest {
  constructor(
    public potId: number,
    public batteryLevel: number,
    public waterLevel: number,
    public humidity: number,
    public luminance: number,
    public temperature: number,
    public ph: number,
    public salinity: number
  ) {}
}
