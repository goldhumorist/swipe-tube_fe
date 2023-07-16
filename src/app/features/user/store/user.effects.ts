import {
  AppRouteEnum,
  UserRouteEnum,
} from './../../../core/enums/app-route.enum';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginFailed,
  loginSuccess,
  logout,
  logoutSuccess,
  signup,
  signupFailed,
  signupSuccess,
} from './user.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { UserApi } from '../api/user.api';
import { Router } from '@angular/router';
import { LocalStorageService, NotificationService } from './../../../core/';
import { ILoginResponse, ISignupResponse } from '../interfaces';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userApi: UserApi,
    private notifier: NotificationService,
    private localStorage: LocalStorageService,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(({ data }) =>
        this.userApi.login(data).pipe(
          map(responseData => loginSuccess(responseData)),
          tap(responseData => this.handleSuccess(responseData)),
          catchError(error => {
            const errorMessage = error.message;

            this.notifier.showFailedNotification(errorMessage);

            return of(loginFailed({ errorMessage }));
          }),
        ),
      ),
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signup),
      switchMap(({ data }) =>
        this.userApi.signup(data).pipe(
          map(responseData => signupSuccess(responseData)),
          tap(responseData => this.handleSuccess(responseData)),
          catchError(error => {
            const errorMessage = error.message;

            this.notifier.showFailedNotification(errorMessage);

            return of(signupFailed({ errorMessage }));
          }),
        ),
      ),
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        this.localStorage.removeAccessToken();

        this.router.navigate([`${AppRouteEnum.User}/${UserRouteEnum.Login}`]);

        this.notifier.showSuccessNotification(
          'You have successfully logged out',
        );

        return of(logoutSuccess());
      }),
    );
  });

  private handleSuccess(responseData: ILoginResponse | ISignupResponse): void {
    this.notifier.showSuccessNotification('Welcome ;3');

    this.localStorage.setAccessToken(responseData.accessToken);

    this.router.navigate([AppRouteEnum.Video]);
  }
}
