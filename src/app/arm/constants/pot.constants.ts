export const POT_STATUS = {
  INACTIVE: 0,
  ACTIVE: 1,
  MAINTENANCE: 2
} as const;

export const POT_STATUS_LABELS = {
  [POT_STATUS.INACTIVE]: 'Inactiva',
  [POT_STATUS.ACTIVE]: 'Activa',
  [POT_STATUS.MAINTENANCE]: 'Mantenimiento'
} as const;

export const HEALTH_STATUS_COLORS = {
  healthy: '#2ecc71',
  warning: '#f39c12',
  critical: '#e74c3c'
} as const;

export const METRIC_THRESHOLDS = {
  HUMIDITY: {
    CRITICAL: 20,
    WARNING: 40,
    OPTIMAL: 60
  },
  TEMPERATURE: {
    MIN_OPTIMAL: 18,
    MAX_OPTIMAL: 26,
    CRITICAL_HIGH: 30,
    CRITICAL_LOW: 10
  },
  BATTERY: {
    CRITICAL: 15,
    WARNING: 30,
    GOOD: 70
  },
  PH: {
    MIN_OPTIMAL: 6.0,
    MAX_OPTIMAL: 7.5,
    CRITICAL_LOW: 5.5,
    CRITICAL_HIGH: 8.0
  }
} as const;
