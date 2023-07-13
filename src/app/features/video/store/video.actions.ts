import { FEATURE_NAME } from '../../../core';
import { IUserVideosResponse } from '../interfaces/interfaces';
import { createAction, props } from '@ngrx/store';

//User Videos Actions
export const initUserVideos = createAction(
  `${FEATURE_NAME.VIDEO} init user videos`,
);

export const initUserVideosSuccess = createAction(
  `${FEATURE_NAME.VIDEO} init user videos success`,
  props<IUserVideosResponse>(),
);

export const initUserVideosFailed = createAction(
  `${FEATURE_NAME.VIDEO} init user videos failed`,
  props<{ errorMessage: string }>(),
);

// Upload Video Actions
export const uploadNewVideo = createAction(
  `${FEATURE_NAME.VIDEO} upload new video`,
  props<{ data: FormData }>(),
);

export const uploadNewVideoSuccess = createAction(
  `${FEATURE_NAME.VIDEO} upload new video success`,
);

export const uploadNewVideoFailed = createAction(
  `${FEATURE_NAME.VIDEO} upload new video failed`,
  props<{ errorMessage: string }>(),
);

// Load More User Videos Actions
export const loadMoreUserVideos = createAction(
  `${FEATURE_NAME.VIDEO} load more user videos`,
);

export const loadMoreUserVideosSuccess = createAction(
  `${FEATURE_NAME.VIDEO} load more user videos success`,
  props<IUserVideosResponse>(),
);

export const loadMoreUserVideosFailed = createAction(
  `${FEATURE_NAME.VIDEO} load more user videos failed`,
  props<{ errorMessage: string }>(),
);

// Pagination Actions
export const updatePageValue = createAction(
  `${FEATURE_NAME.VIDEO} update page`,
  props<{ page: number }>(),
);

// Loading Actions
export const setLoadingState = createAction(
  `${FEATURE_NAME.VIDEO} set loading state`,
  props<{ value: boolean }>(),
);
