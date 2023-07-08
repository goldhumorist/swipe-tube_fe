import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Exception } from '../exceptions/exception';
import {
  IServerErrorResponse,
  IServerSuccessResponse,
  ServerResponse,
} from '../interfaces';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      filter((event: any): boolean => {
        return !!(
          event instanceof HttpResponse &&
          event.url?.includes(environment.backendHost)
        );
      }),
      map((event: HttpResponse<ServerResponse>) => {
        if (event.body?.status === 0) {
          const errorMessage = this.parseErrorResponse(event);

          throw new Exception(errorMessage);
        }

        return this.parseSuccessResponse(event);
      }),
      catchError(error => {
        console.log('Caught error:', error);
        if (error instanceof Exception) return throwError(() => error);

        return throwError(() => new Error('Server Error'));
      }),
    );
  }

  private parseErrorResponse(
    response: HttpResponse<IServerErrorResponse>,
  ): string {
    if (response.body?.error?.fields) {
      const fieldName = Object.entries(response.body?.error?.fields)[0][0];
      const status = Object.entries(response.body?.error?.fields)[0][1];

      const errorMessage = `${fieldName} - ${status}`;

      return errorMessage;
    }

    return response.body?.error?.message || 'Server Error';
  }

  private parseSuccessResponse(response: HttpResponse<IServerSuccessResponse>) {
    return response.clone({ body: response.body?.data });
  }
}
