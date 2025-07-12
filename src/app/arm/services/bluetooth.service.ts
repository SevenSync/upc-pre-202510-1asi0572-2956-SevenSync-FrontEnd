import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {
  private device: BluetoothDevice | undefined;
  public connectionStatus$ = new Subject<boolean>();

  constructor() { }

  async connectToDevice(): Promise<void> { // O Promise<string | null> si devuelve un ID
    try {
      console.log('Solicitando dispositivo Bluetooth...');

      // ✅ --- LA CORRECCIÓN ESTÁ AQUÍ ---
      // En lugar de filtrar por un servicio que no conocemos,
      // usaremos `acceptAllDevices: true` para que el navegador nos muestre una lista de todo lo disponible.
      // Esto es IDEAL para desarrollo y pruebas.
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        // Opcional: Cuando conozcas el UUID de servicio de tus macetas, úsalo así para producción:
        filters: [{ services: ['19B10000-E8F2-537E-4F6C-D104768A1214'] }]
      });

      console.log('Dispositivo seleccionado:', device.name);

      if (!device.gatt) {
        console.error('GATT Server no disponible.');
        this.connectionStatus$.next(false);
        return;
      }

      // Conecta al servidor GATT del dispositivo.
      const server = await device.gatt.connect();
      console.log('Conectado al servidor GATT');
      this.connectionStatus$.next(true);

      // Aquí podrías obtener servicios y características para leer/escribir datos.
      // const service = await server.getPrimaryService('UUID_DEL_SERVICIO_DE_TU_MACETA');
      // const characteristic = await service.getCharacteristic('UUID_DE_LA_CARACTERISTICA');
      // const value = await characteristic.readValue();
      // console.log('Valor leído:', value);

    } catch (error) {
      console.error('Error al conectar por Bluetooth:', error);
      this.connectionStatus$.next(false);
    }
  }

  disconnectDevice() {
    if (this.device && this.device.gatt) {
      this.device.gatt.disconnect();
      this.connectionStatus$.next(false);
      console.log('Dispositivo desconectado.');
    }
  }
}
