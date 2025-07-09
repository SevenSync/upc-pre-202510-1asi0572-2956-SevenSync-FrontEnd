import {PotMetrics} from '../model/pot-metrics.entity';
import {Pot} from '../model/pot.entity';


export const MOCK_POTS: Pot[] = [
  new Pot(
    1,
    'Monstera Deliciosa',
    'Sala de estar',
    1,
    'device_001',
    'user_123',
    1,
    new PotMetrics(85, 75, 45, 70, 24, 6.5, 0.3),
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    '/assets/monstera.jpg'
  ),
  new Pot(
    2,
    'Ficus Lyrata',
    'Oficina',
    1,
    'device_002',
    'user_123',
    2,
    new PotMetrics(92, 80, 65, 80, 22, 6.2, 0.2),
    new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
    '/assets/ficus.jpg'
  ),
  new Pot(
    3,
    'Suculenta Echeveria',
    'Cocina',
    1,
    'device_003',
    'user_123',
    3,
    new PotMetrics(45, 20, 15, 90, 28, 7.0, 0.1),
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 semana atrás
    '/assets/echeveria.jpg'
  ),
  new Pot(
    4,
    'Pothos Dorado',
    'Dormitorio',
    1,
    'device_004',
    'user_123',
    4,
    new PotMetrics(78, 85, 70, 60, 23, 6.8, 0.25),
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    '/assets/pothos.jpg'
  ),
  new Pot(
    5,
    'Sansevieria',
    'Baño',
    2, // En mantenimiento
    'device_005',
    'user_123',
    5,
    new PotMetrics(25, 30, 35, 40, 21, 6.0, 0.4),
    new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
    '/assets/sansevieria.jpg'
  )
];
