import { FEATURE_NAME } from '../../../core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IVideoState } from './video.reducer';

const selectFeature = createFeatureSelector<IVideoState>(FEATURE_NAME.VIDEO);

export const selectIsLoading = createSelector(
  selectFeature,
  state => state.isLoading,
);

export const selectVideoData = createSelector(
  selectFeature,
  state => state.videoData,
);

export const selectUserVideos = createSelector(
  selectVideoData,
  state => state?.userVideos,
);
