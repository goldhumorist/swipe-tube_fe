import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { ISignupResponse } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class UserApi {
  constructor(private apiService: ApiService) {}

  public signup(data: FormData): Observable<ISignupResponse> {
    return this.apiService.post<ISignupResponse>('/signup', data);
  }
}
