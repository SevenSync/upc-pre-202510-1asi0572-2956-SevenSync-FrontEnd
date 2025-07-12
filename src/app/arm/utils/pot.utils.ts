import { Pot } from '../model/pot.entity';

export class PotUtils {
  static getHealthStatusColor(status: 'healthy' | 'warning' | 'critical'): string {
    switch (status) {
      case 'healthy': return '#2ecc71';
      case 'warning': return '#f39c12';
      case 'critical': return '#e74c3c';
      default: return '#95a5a6';
    }
  }

  static getHealthStatusText(status: 'healthy' | 'warning' | 'critical'): string {
    switch (status) {
      case 'healthy': return 'Saludable';
      case 'warning': return 'Necesita Atención';
      case 'critical': return 'Estado Crítico';
      default: return 'Desconocido';
    }
  }

  static calculateWateringPriority(pots: Pot[]): Pot[] {
    return pots
      .filter(pot => pot.needsWatering)
      .sort((a, b) => {
        if (!a.metrics || !b.metrics) return 0;
        return a.metrics.humidity - b.metrics.humidity; // Menor humedad = mayor prioridad
      });
  }

  static getPotsByHealthStatus(pots: Pot[], status: 'healthy' | 'warning' | 'critical'): Pot[] {
    return pots.filter(pot => pot.healthStatus === status);
  }

  static getAverageMetrics(pots: Pot[]) {
    const potsWithMetrics = pots.filter(pot => pot.metrics);

    if (potsWithMetrics.length === 0) {
      return null;
    }

    const totals = potsWithMetrics.reduce((acc, pot) => {
      if (pot.metrics) {
        acc.humidity += pot.metrics.humidity;
        acc.temperature += pot.metrics.temperature;
        acc.batteryLevel += pot.metrics.batteryLevel;
        acc.luminance += pot.metrics.luminance;
      }
      return acc;
    }, { humidity: 0, temperature: 0, batteryLevel: 0, luminance: 0 });

    const count = potsWithMetrics.length;

    return {
      averageHumidity: Math.round(totals.humidity / count),
      averageTemperature: Math.round(totals.temperature / count),
      averageBatteryLevel: Math.round(totals.batteryLevel / count),
      averageLuminance: Math.round(totals.luminance / count)
    };
  }

  static formatLastWatered(date: Date | undefined): string {
    if (!date) return 'Sin datos';

    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  }

  static getNextWateringRecommendation(pot: Pot): string {
    if (!pot.metrics) return 'Sin datos suficientes';

    const humidity = pot.metrics.humidity;

    if (humidity < 15) return 'Urgente - Regar inmediatamente';
    if (humidity < 25) return 'Regar hoy';
    if (humidity < 40) return 'Regar en 1-2 días';
    if (humidity < 60) return 'Regar en 3-4 días';
    return 'No necesita riego por ahora';
  }
}
