import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  accessTokenKey = 'access_token';

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(authToken: string) {
    localStorage.setItem(this.accessTokenKey, authToken);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }
}
