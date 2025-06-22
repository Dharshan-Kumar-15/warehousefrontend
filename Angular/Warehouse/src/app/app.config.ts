import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { appInterceptor } from './Interceptor/app.interceptor';
import { errorInterceptor } from './Interceptor/ErrorInterceptor/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    //authentication using interceptor
    provideHttpClient(withInterceptors([appInterceptor,errorInterceptor]),withFetch()),
    //notification using toastr
    provideAnimations(),
    provideToastr({
       timeOut: 3000,
       positionClass: 'toast-top-right',
       preventDuplicates:true
         }),
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes,withComponentInputBinding()),
      provideClientHydration(withEventReplay())
    
    
    ]
};
