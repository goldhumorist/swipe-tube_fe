import { IVideo } from '../interfaces';
import {
  getUserVideos,
  getUserVideosFailed,
  getUserVideosSuccess,
  uploadUserVideo,
  uploadUserVideoFailed,
  uploadUserVideoSuccess,
  updateUserVideos,
  updateUserVideosFailed,
  updateUserVideosSuccess,
} from './video.actions';
import { createReducer, on } from '@ngrx/store';

export interface IVideoState {
  videoData: {
    userVideos: IVideo[];
  };
  isLoading: boolean;
}

export const initialVideoState: IVideoState = {
  videoData: {
    userVideos: [],
  },
  isLoading: false,
};

export const videoReducer = createReducer(
  initialVideoState,

  on(getUserVideos, uploadUserVideo, updateUserVideos, state => ({
    ...state,
    isLoading: true,
  })),

  on(uploadUserVideoSuccess, state => ({
    ...state,
    isLoading: false,
  })),

  on(updateUserVideosSuccess, (state, videoData) => ({
    ...state,
    videoData: {
      userVideos: [...state.videoData.userVideos, ...videoData.videos],
    },
    isLoading: false,
  })),

  on(getUserVideosSuccess, (state, videoData) => ({
    ...state,
    videoData: {
      userVideos: videoData.videos,
    },
    isLoading: false,
  })),

  on(
    uploadUserVideoFailed,
    updateUserVideosFailed,
    getUserVideosFailed,
    (state, { errorMessage }) => ({
      ...state,
      errorMessage,
      isLoading: false,
    }),
  ),
);
