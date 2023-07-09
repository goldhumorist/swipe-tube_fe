import {
  checkAccess,
  checkAccessFailed,
  checkAccessSuccess,
  login,
  loginFailed,
  loginSuccess,
  signup,
  signupFailed,
  signupSuccess,
} from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface IUserState {
  userData: {
    username: string;
    email: string;
    avatarUrlPath?: string;
    accessToken?: string;
  };
  isLoading: boolean;
  errorMessage: string;
}

export const initialUserState: IUserState = {
  isLoading: false,
  userData: {
    username: '',
    email: '',
    avatarUrlPath: '',
    accessToken: '',
  },
  errorMessage: '',
};

export const userReducer = createReducer(
  initialUserState,

  on(login, signup, checkAccess, state => ({
    ...state,
    isLoading: true,
  })),

  on(loginSuccess, signupSuccess, checkAccessSuccess, (state, userData) => ({
    ...state,
    userData,
    isLoading: false,
  })),

  on(
    loginFailed,
    signupFailed,
    checkAccessFailed,
    (state, { errorMessage }) => ({
      ...state,
      errorMessage,
      isLoading: false,
    }),
  ),
);
