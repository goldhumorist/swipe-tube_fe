import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';

@Injectable()
export class DumpUserService {
  dumbSignupUser(user: IUser) {
    return {
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }
}
