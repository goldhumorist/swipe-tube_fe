import { Injectable } from '@angular/core';
import { ILoginData, ISignupData } from '../interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getIsLoading } from '../store/user.selector';
import { login, signup } from '../store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store) {}

  isLoading$: Observable<boolean> = this.store.select(getIsLoading);

  signup(data: ISignupData): void {
    this.store.dispatch(signup(data));
  }

  login(data: ILoginData): void {
    this.store.dispatch(login(data));
  }
}
