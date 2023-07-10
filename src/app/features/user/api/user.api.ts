import { UserApiPath } from '../';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import {
  ISignupResponse,
  ILoginResponse,
  ILoginRequestData,
  ISignupRequestData,
} from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  constructor(private apiService: ApiService) {}

  private basePath = UserApiPath.basicUserPath;

  public signup(data: ISignupRequestData): Observable<ISignupResponse> {
    return this.apiService.post<ISignupResponse>(
      `${this.basePath}/signup`,
      data,
    );
  }

  public login(data: ILoginRequestData): Observable<ILoginResponse> {
    return this.apiService.post<ILoginResponse>(`${this.basePath}/login`, data);
  }
}
