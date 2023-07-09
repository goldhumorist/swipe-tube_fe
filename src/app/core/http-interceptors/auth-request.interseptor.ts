import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { LocalStorageService } from './../services/';

@Injectable({
  providedIn: 'root',
})
export class AuthRequestInterseptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let newRequest = req;

    if (req.url.startsWith(environment.backendHost)) {
      newRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.localStorageService.getAccessToken()}`,
        ),
      });
    }

    return next.handle(newRequest);
  }
}
