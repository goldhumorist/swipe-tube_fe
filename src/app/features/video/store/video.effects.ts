import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  uploadUserVideo,
  updateUserVideos,
  getUserVideos,
  getUserVideosSuccess,
  getUserVideosFailed,
  updateUserVideosSuccess,
  updateUserVideosFailed,
  uploadUserVideoSuccess,
  uploadUserVideoFailed,
} from './video.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../../core';
import { Store } from '@ngrx/store';
import { VideoService } from '../service';
import { VideoProfilePagination } from '../enums';

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private notifier: NotificationService,
    private videoService: VideoService,
    private store: Store,
  ) {}

  getUserVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserVideos),
      switchMap(videoParams =>
        this.videoService.getMyVideos(videoParams).pipe(
          map(responseData => getUserVideosSuccess(responseData)),
          catchError(error => {
            const errorMessage = error.message;

            this.notifier.showFailedNotification(errorMessage);

            return of(getUserVideosFailed({ errorMessage }));
          }),
        ),
      ),
    );
  });

  updateUserVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserVideos),
      switchMap(videoParams =>
        this.videoService.getMyVideos(videoParams).pipe(
          map(responseData => updateUserVideosSuccess(responseData)),
          catchError(error => {
            const errorMessage = error.message;

            this.notifier.showFailedNotification(errorMessage);

            return of(updateUserVideosFailed({ errorMessage }));
          }),
        ),
      ),
    );
  });

  uploadVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadUserVideo),
      switchMap(({ data }) =>
        this.videoService.uploadVideo(data).pipe(
          map(() => uploadUserVideoSuccess()),
          tap(() => {
            this.notifier.showSuccessNotification('Video uploaded');

            this.store.dispatch(
              getUserVideos({
                page: VideoProfilePagination.startPage,
                limit: VideoProfilePagination.limit,
              }),
            );
          }),
          catchError(error => {
            const errorMessage = error.message;

            this.notifier.showFailedNotification(errorMessage);

            return of(uploadUserVideoFailed({ errorMessage }));
          }),
        ),
      ),
    );
  });
}
