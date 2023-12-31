import { FEATURE_NAME } from './../../../core';
import {
  ICheckAccessResponse,
  ILoginData,
  ILoginResponse,
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
  props<ILoginResponse>(),
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

// logout
export const logout = createAction(`${FEATURE_NAME.USER} logout`);

export const logoutSuccess = createAction(
  `${FEATURE_NAME.USER} logout success`,
);

// Checking user access status
export const checkAccess = createAction(`${FEATURE_NAME.USER} check access`);

export const checkAccessSuccess = createAction(
  `${FEATURE_NAME.USER} check access success`,
  props<ICheckAccessResponse>(),
);

export const checkAccessFailed = createAction(
  `${FEATURE_NAME.USER} check access failed`,
  props<{ errorMessage: string }>(),
);
