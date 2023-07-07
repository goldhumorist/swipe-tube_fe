import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setAuthToken(authToken: string) {
    localStorage.setItem('auth_token', authToken);
  }

  removeAuthToken(): void {
    localStorage.removeItem('auth_token');
  }
}
