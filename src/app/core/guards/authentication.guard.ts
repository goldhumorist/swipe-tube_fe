import { LocalStorageService } from './../services/local-storage.service';
import { SessionApi } from './../../features/user/api/session.api';
import {
  checkAccess,
  checkAccessFailed,
  checkAccessSuccess,
  getEmail,
} from './../../features/user/';
import { Store, select } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, catchError, of, map, switchMap } from 'rxjs';
import { PATH_TO_LOGIN } from '../enums/app-route.enum';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private router: Router,
    private store: Store,
    private sessionApi: SessionApi,
    private localStorageService: LocalStorageService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(getEmail),
      switchMap(email => {
        if (email) return of(true);

        this.store.dispatch(checkAccess());

        return this.sessionApi.checkAccess().pipe(
          map(userData => {
            this.store.dispatch(checkAccessSuccess(userData));

            return true;
          }),
          catchError(error => {
            const errorMessage = error.message;

            this.localStorageService.removeAccessToken();

            this.store.dispatch(checkAccessFailed({ errorMessage }));

            return this.router.navigate([PATH_TO_LOGIN]);
          }),
        );
      }),
    );
  }
}

export const AuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  return inject(PermissionsService).canActivate();
};
