import { Injectable } from '@angular/core';
import { VideoApi } from '../api/video.api';
import { Observable } from 'rxjs';
import {
  ILoadUserVideosParams,
  IUploadVideo,
  IUploadVideoResponse,
  IUserVideosResponse,
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

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private videoApiService: VideoApi, private store: Store) {}

  isLoadingSelector$ = this.store.pipe(select(getIsLoadingState));
  userVideosSelector$ = this.store.pipe(select(getUserVideosState));

  loadUserVideosAPI(
    params: ILoadUserVideosParams,
  ): Observable<IUserVideosResponse> {
    return this.videoApiService.loadUserVideos(params);
  }

  uploadVideoAPI(data: IUploadVideo): Observable<IUploadVideoResponse> {
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
}
