import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { providePrimeNG } from "primeng/config";
import Aura from "@primeuix/themes/aura";
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    providePrimeNG({
      license: "eyJpZCI6IjEwNmY1MjRiLTkzNzctNGFjNi1hY2Y4LWIzM2EwOGM1ODUzYyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODI4MjUwMzksImV4cCI6MTgxNDM2MTAzOX0.lE6LItwiJvgCLZRLr-goKIi5lcHrTWIoifnw08R1vjjLc3iQdPCYMqXHcS-_90kbcAoKiJm1zUHoTIT9_BnBDw",
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      },
      ripple: true,
      overlayAppendTo: "body"
    }),
    MessageService
  ]
};
