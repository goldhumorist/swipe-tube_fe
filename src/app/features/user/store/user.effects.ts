import { AppRouteEnum } from './../../../core/enums/app-route.enum';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginFailed,
  loginSuccess,
  signup,
  signupSuccess,
} from './user.actions';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { UserApi } from '../api/user.api';
import { Router } from '@angular/router';
import { LocalStorageService, NotificationService } from './../../../core/';
import { Action } from '@ngrx/store';
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
          catchError(error => this.handleError(error)),
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
          catchError(error => this.handleError(error)),
        ),
      ),
    );
  });

  private handleSuccess(responseData: ILoginResponse | ISignupResponse): void {
    this.notifier.showSuccessNotification('Welcome ;3');

    this.localStorage.setAccessToken(responseData.accessToken);

    this.router.navigate([AppRouteEnum.Video]);
  }

  private handleError(error: Error): Observable<Action> {
    const errorMessage = error.message;

    this.notifier.showFailedNotification(errorMessage);

    return of(loginFailed({ errorMessage }));
  }
}
