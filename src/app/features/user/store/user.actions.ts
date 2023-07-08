import { FEATURE_NAME } from './../../../core';
import {
  ILoginData,
  ILoginResponseData,
  ISignupData,
  ISignupResponse,
} from './../interfaces/interfaces';
import { createAction, props } from '@ngrx/store';

// Login Actions
export const login = createAction(
  `${FEATURE_NAME.USER} login`,
  props<ILoginData>(),
);

export const loginSuccess = createAction(
  `${FEATURE_NAME.USER} login success`,
  props<ILoginResponseData>(),
);

export const loginFailed = createAction(
  `${FEATURE_NAME.USER} login failed`,
  props<{ errorMessage: string }>(),
);

// Signup Actions
export const signup = createAction(
  `${FEATURE_NAME.USER} signup`,
  props<ISignupData>(),
);

export const signupSuccess = createAction(
  `${FEATURE_NAME.USER} signup success`,
  props<ISignupResponse>(),
);

export const signupFailed = createAction(
  `${FEATURE_NAME.USER} signup failed`,
  props<{ errorMessage: string }>(),
);
