import { Injectable } from '@angular/core';
import { ISignupResponse } from '../interfaces';
import { UserApi } from '../api/user.api';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private userApi: UserApi) {}
  signup(data: FormData): Observable<ISignupResponse> {
    return this.userApi.signup(data);
  }
}
