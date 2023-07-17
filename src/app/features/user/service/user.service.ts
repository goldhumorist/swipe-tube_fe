import { Injectable } from '@angular/core';
import { ILoginData, ISignupData } from '../interfaces';
import { Store, select } from '@ngrx/store';
import { getIsLoading, getUserData } from '../store/user.selector';
import { login, logout, signup } from '../store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store) {}

  isLoadingSelector$ = this.store.pipe(select(getIsLoading));
  userDataSelector$ = this.store.pipe(select(getUserData));

  signup(data: ISignupData): void {
    this.store.dispatch(signup(data));
  }

  login(data: ILoginData): void {
    this.store.dispatch(login(data));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
