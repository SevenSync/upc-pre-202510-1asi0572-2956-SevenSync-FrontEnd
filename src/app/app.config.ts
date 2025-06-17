import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

let providers = [
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(HttpClientModule),
  provideRouter(routes),
];

// Solo en modo dev, intercepta las llamadas HTTP y las dirige al In-Memory API
if (isDevMode()) {
  importProvidersFrom(HttpClientModule); // asegurarnos de tener HttpClient
  providers = [
    ...providers,
    importProvidersFrom(
      // Configura el in-memory-web-api con nuestro servicio
      require('angular-in-memory-web-api').HttpClientInMemoryWebApiModule.forRoot(
        require('./subscriptions/infrastructure/in-memory-data.service').InMemoryDataService,
        { passThruUnknownUrl: true, delay: 500 }
      )
    )
  ];
}

export const appConfig = {
  providers
};