import { UserApiPath } from '..';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { ICheckAccessResponse } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionApi {
  constructor(private apiService: ApiService) {}

  private basePath = UserApiPath.basicSessionPath;

  checkAccess(): Observable<ICheckAccessResponse> {
    return this.apiService.get<ICheckAccessResponse>(`${this.basePath}/check`);
  }
}
