import { Injectable } from '@angular/core';
import { ILoginData, ILoginResponse, ISignupResponse } from '../interfaces';
import { UserApi } from '../api/user.api';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private userApi: UserApi, private notifier: NotifierService) {}

  constructor(private userApi: UserApi, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  login(data: ILoginData): Observable<ILoginResponse> {
    return this.userApi.login(data).pipe(
      tap(() => {
        this.notifier.notify('success', 'Welcome ;3');
      }),
      catchError(error => {
        this.notifier.notify('error', error.message);
        return EMPTY;
      }),
    );
  }
}
