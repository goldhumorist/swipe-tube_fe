import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.reducer';

export const USER_FEATURE_NAME = 'user';

const getFeature = createFeatureSelector<IUserState>(USER_FEATURE_NAME);

export const getIsLoading = createSelector(
  getFeature,
  state => state.isLoading,
);

export const getUserData = createSelector(getFeature, state => state.userData);

export const getUsername = createSelector(
  getUserData,
  state => state?.username,
);

export const getEmail = createSelector(getUserData, state => state?.email);

export const getAccessToken = createSelector(
  getUserData,
  state => state?.accessToken,
);
