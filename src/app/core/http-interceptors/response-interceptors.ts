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
import { Exeption } from '../exeptions/exeption';
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

          throw new Exeption(errorMessage);
        }

        return this.parseSuccessResponse(event);
      }),
      catchError(error => {
        console.log('Caught error:', error);
        if (error instanceof Exeption) return throwError(() => error);

        return throwError(() => new Error('Server Error'));
      }),
    );
  }

  private parseErrorResponse(
    response: HttpResponse<IServerErrorResponse>,
  ): string {
    const errorMessage = response.body?.error?.fields
      ? Object.entries(response.body?.error?.fields)[0][1]
      : response.body?.error?.message;

    return errorMessage as string;
  }

  private parseSuccessResponse(response: HttpResponse<IServerSuccessResponse>) {
    return response.clone({ body: response.body?.data });
  }
}