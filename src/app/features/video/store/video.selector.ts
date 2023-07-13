import { FEATURE_NAME } from '../../../core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IVideoState } from './video.reducer';

const selectFeature = createFeatureSelector<IVideoState>(FEATURE_NAME.VIDEO);

export const getIsLoadingState = createSelector(
  selectFeature,
  state => state.isLoading,
);

export const getVideoDataState = createSelector(
  selectFeature,
  state => state.videoData,
);

export const getUserVideosState = createSelector(
  getVideoDataState,
  state => state?.userVideos,
);

export const getPaginationState = createSelector(
  selectFeature,
  state => state.pagination,
);

export const getPageState = createSelector(
  getPaginationState,
  state => state.page,
);
