import { Injectable } from '@angular/core';
import { VideoApi } from '../api/video.api';
import { Observable } from 'rxjs';
import { IMyVideosParams, IMyVideosResponse } from '../interfaces';
import { Store, select } from '@ngrx/store';
import {
  getUserVideos,
  selectUserVideos,
  uploadUserVideo,
  updateUserVideos,
  selectIsLoading,
} from '../store';
import { VideoProfilePagination } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private videoApiService: VideoApi, private store: Store) {}

  initStoreUserVideos() {
    this.store.dispatch(
      getUserVideos({
        page: VideoProfilePagination.startPage,
        limit: VideoProfilePagination.limit,
      }),
    );
  }

  getUserVideosFromStore() {
    return this.store.pipe(select(selectUserVideos));
  }
  getStoreVideosLoading() {
    return this.store.pipe(select(selectIsLoading));
  }

  uploadStoreVideo(data: FormData) {
    this.store.dispatch(uploadUserVideo({ data }));
  }

  updateStoreVideos(videoParams: IMyVideosParams) {
    return this.store.dispatch(updateUserVideos(videoParams));
  }

  getMyVideos(videoParams: IMyVideosParams): Observable<IMyVideosResponse> {
    return this.videoApiService.myVideos(videoParams);
  }

  uploadVideo(data: FormData): Observable<any> {
    return this.videoApiService.upload(data);
  }
}
