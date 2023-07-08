import {
  login,
  loginFailed,
  loginSuccess,
  signup,
  signupSuccess,
} from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface IUserState {
  userData: {
    username: string;
    email: string;
    avatarUrlPath?: string;
    accessToken: string;
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

  // Login
  on(login, state => ({
    ...state,
    isLoading: true,
  })),
  on(loginSuccess, (state, userData) => ({
    ...state,
    userData,
    isLoading: false,
  })),
  on(loginFailed, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    isLoading: false,
  })),

  // Signup
  on(signup, state => ({
    ...state,
    isLoading: true,
  })),
  on(signupSuccess, (state, userData) => ({
    ...state,
    userData,
    isLoading: false,
  })),
  on(loginFailed, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    isLoading: false,
  })),
);
