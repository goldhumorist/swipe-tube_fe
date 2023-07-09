import { FEATURE_NAME } from './../../../core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.reducer';

const getFeature = createFeatureSelector<IUserState>(FEATURE_NAME.USER);

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
