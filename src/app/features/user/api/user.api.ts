import { UserApiPath } from '../';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { ISignupResError, ISignupResponse } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class UserApi {
  constructor(private apiService: ApiService) {}
  private basePath = UserApiPath.basicUserPath;

  public signup(
    data: FormData,
  ): Observable<ISignupResponse | ISignupResError | any> {
    return this.apiService.post<ISignupResponse | ISignupResError | any>(
      `${this.basePath}/signup`,
      data,
    );
  }
}
