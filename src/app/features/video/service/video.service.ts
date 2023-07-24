import { Injectable } from '@angular/core';
import { VideoApi } from '../api/video.api';
import {
  ILoadLikedVideosParams,
  ILoadUserVideosParams,
  ISwipeFormatedVideosResponse,
  ISwipeVideosParams,
  IUpdateVideoReactionData,
  IUploadVideo,
} from '../interfaces';
import { Store, select } from '@ngrx/store';
import {
  initUserVideos,
  getUserVideosState,
  uploadNewVideo,
  loadMoreUserVideos,
  getIsLoadingState,
  updatePageValue,
  setLoadingState,
} from '../store';
import { VideoProfilePagination } from '../enums';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private videoApiService: VideoApi, private store: Store) {}

  isLoadingSelector$ = this.store.pipe(select(getIsLoadingState));
  userVideosSelector$ = this.store.pipe(select(getUserVideosState));

  loadUserVideosAPI(params: ILoadUserVideosParams) {
    return this.videoApiService.loadUserVideos(params);
  }

  uploadVideoAPI(data: IUploadVideo) {
    return this.videoApiService.uploadVideo(data);
  }

  initUserVideos() {
    this.store.dispatch(
      updatePageValue({ page: VideoProfilePagination.startPage }),
    );
    this.store.dispatch(initUserVideos());
  }

  uploadVideo(data: IUploadVideo) {
    this.store.dispatch(uploadNewVideo({ data }));
  }

  loadMoreUserVideos() {
    return this.store.dispatch(loadMoreUserVideos());
  }

  setLoadingState(value: boolean) {
    return this.store.dispatch(setLoadingState({ value }));
  }

  loadSwipeVideos(
    params: ISwipeVideosParams,
  ): Observable<ISwipeFormatedVideosResponse> {
    return this.videoApiService
      .loadSwipeVideos(params)
      .pipe(map(response => response.videos));
  }

  addVideoView(videoId: number) {
    return this.videoApiService.addVideoView(videoId);
  }

  updateVideoReaction(data: IUpdateVideoReactionData) {
    return this.videoApiService.updateVideoReaction(data);
  }

  loadLikedVideos(params: ILoadLikedVideosParams) {
    return this.videoApiService
      .loadLikedVideos(params)
      .pipe(map(response => response.videos));
  }
}
