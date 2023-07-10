import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ResponseInterceptor } from './response-interceptors';
import { AuthRequestInterseptor } from './auth-request.interseptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthRequestInterseptor, multi: true },
];
