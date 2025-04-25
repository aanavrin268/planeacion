import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GraphQLModule } from './core/graphql/graphql.module';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(), 
    importProvidersFrom(GraphQLModule),  ]
};
