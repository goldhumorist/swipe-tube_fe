import { Injectable } from '@angular/core';
import { ISignupResError, ISignupResponse } from '../interfaces';
import { UserApi } from '../api/user.api';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class UserService {
  private readonly notifier: NotifierService;

  constructor(private userApi: UserApi, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  signup(data: FormData): Observable<ISignupResponse | ISignupResError | any> {
    return this.userApi.signup(data).pipe(
      map(res => {
        if (res.status === 0) {
          const errorMessage = Object.entries(res.error.fields)[0][1];
          throw new Error(errorMessage as string);
        }
        this.notifier.notify('success', 'Welcome ;3');
        return res;
      }),
      catchError(error => {
        console.log('Caught error:', error);
        this.notifier.notify('error', error);

        return EMPTY;
      }),
    );
  }
}
