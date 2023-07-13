import { FEATURE_NAME } from '../../../core';
import {
  IGetUserVideosData,
  IMyVideosResponse,
  IUpdateUserVideos,
} from '../interfaces/interfaces';
import { createAction, props } from '@ngrx/store';

//User Videos Actions
export const getUserVideos = createAction(
  `${FEATURE_NAME.VIDEO} getUserVideos`,
  props<IGetUserVideosData>(),
);

export const getUserVideosSuccess = createAction(
  `${FEATURE_NAME.VIDEO} getUserVideosSuccess success`,
  props<IMyVideosResponse>(),
);

export const getUserVideosFailed = createAction(
  `${FEATURE_NAME.VIDEO} getUserVideosSuccess failed`,
  props<{ errorMessage: string }>(),
);

// Upload Video Actions
export const uploadUserVideo = createAction(
  `${FEATURE_NAME.VIDEO} uploadVideo`,
  props<{ data: FormData }>(),
);

export const uploadUserVideoSuccess = createAction(
  `${FEATURE_NAME.VIDEO} uploadVideo success`,
);

export const uploadUserVideoFailed = createAction(
  `${FEATURE_NAME.VIDEO} uploadVideo failed`,
  props<{ errorMessage: string }>(),
);

// Update User Videos Actions
export const updateUserVideos = createAction(
  `${FEATURE_NAME.VIDEO} updateUserVideos`,
  props<IUpdateUserVideos>(),
);

export const updateUserVideosSuccess = createAction(
  `${FEATURE_NAME.VIDEO} updateUserVideos success`,
  props<IMyVideosResponse>(),
);

export const updateUserVideosFailed = createAction(
  `${FEATURE_NAME.VIDEO} updateUserVideos failed`,
  props<{ errorMessage: string }>(),
);
