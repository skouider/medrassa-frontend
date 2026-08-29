import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './auth/interceptor/jwt-interceptor/jwt-interceptor';
import { errorInterceptor } from './auth/interceptor/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor]))
    
  ]
};
