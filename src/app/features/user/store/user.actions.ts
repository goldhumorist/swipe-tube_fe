import {
  ILoginData,
  ILoginResponseData,
  ISignupData,
  ISignupResponse,
} from './../interfaces/interfaces';
import { createAction, props } from '@ngrx/store';
import { USER_FEATURE_NAME } from './user.selector';

// Login Actions
export const login = createAction(
  `${USER_FEATURE_NAME} login`,
  props<ILoginData>(),
);

export const loginSuccess = createAction(
  `${USER_FEATURE_NAME} login success`,
  props<ILoginResponseData>(),
);

export const loginFailed = createAction(
  `${USER_FEATURE_NAME} login failed`,
  props<{ errorMessage: string }>(),
);

// Signup Actions
export const signup = createAction(
  `${USER_FEATURE_NAME} signup`,
  props<ISignupData>(),
);

export const signupSuccess = createAction(
  `${USER_FEATURE_NAME} signup success`,
  props<ISignupResponse>(),
);

export const signupFailed = createAction(
  `${USER_FEATURE_NAME} signup failed`,
  props<{ errorMessage: string }>(),
);
