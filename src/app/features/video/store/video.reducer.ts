import { VideoProfilePagination } from '../enums';
import { IVideoWithStatistic } from '../interfaces';
import {
  initUserVideos,
  initUserVideosFailed,
  initUserVideosSuccess,
  uploadNewVideo,
  uploadNewVideoFailed,
  uploadNewVideoSuccess,
  loadMoreUserVideos,
  loadMoreUserVideosFailed,
  loadMoreUserVideosSuccess,
  updatePageValue,
  setLoadingState,
} from './video.actions';
import { createReducer, on } from '@ngrx/store';

export interface IVideoState {
  videoData: {
    userVideos: Array<IVideoWithStatistic>;
  };
  pagination: {
    page: number;
    limit: number;
  };
  errorMessage: string;
  isLoading: boolean;
}

export const initialVideoState: IVideoState = {
  videoData: {
    userVideos: [],
  },
  pagination: {
    page: VideoProfilePagination.startPage,
    limit: VideoProfilePagination.limit,
  },
  errorMessage: '',
  isLoading: false,
};

export const videoReducer = createReducer(
  initialVideoState,

  on(initUserVideos, uploadNewVideo, loadMoreUserVideos, state => ({
    ...state,
    isLoading: true,
  })),

  on(uploadNewVideoSuccess, state => ({
    ...state,
    isLoading: false,
  })),

  on(loadMoreUserVideosSuccess, (state, videoData) => ({
    ...state,
    videoData: {
      userVideos: [...state.videoData.userVideos, ...videoData.videos],
    },
    isLoading: false,
  })),

  on(initUserVideosSuccess, (state, videoData) => ({
    ...state,
    videoData: {
      userVideos: videoData.videos,
    },
    isLoading: false,
  })),

  on(
    uploadNewVideoFailed,
    loadMoreUserVideosFailed,
    initUserVideosFailed,
    (state, { errorMessage }) => ({
      ...state,
      errorMessage,
      isLoading: false,
    }),
  ),

  on(updatePageValue, (state, { page }) => ({
    ...state,
    pagination: {
      page,
      limit: state.pagination.limit,
    },
  })),

  on(setLoadingState, (state, { value }) => ({
    ...state,
    isLoading: value,
  })),
);
