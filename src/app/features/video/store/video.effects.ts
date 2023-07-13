import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  uploadNewVideo,
  loadMoreUserVideos,
  initUserVideos,
  initUserVideosSuccess,
  initUserVideosFailed,
  loadMoreUserVideosSuccess,
  loadMoreUserVideosFailed,
  uploadNewVideoSuccess,
  uploadNewVideoFailed,
  updatePageValue,
} from './video.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { NotificationService } from '../../../core';
import { Store, select } from '@ngrx/store';
import { VideoService } from '../service';
import { VideoProfilePagination } from '../enums';
import { getPaginationState } from './video.selector';

@Injectable()
export class VideoEffects {
  constructor(
    private actions$: Actions,
    private notifier: NotificationService,
    private videoService: VideoService,
    private store: Store,
  ) {}

  initUserVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initUserVideos),
      withLatestFrom(this.store.pipe(select(getPaginationState))),
      switchMap(([_, paginationData]) =>
        this.videoService.loadUserVideosAPI(paginationData).pipe(
          map(responseData => initUserVideosSuccess(responseData)),
          tap(() => this.increasePage(paginationData.page)),
          catchError(error =>
            this.handleErrorResponse(error, initUserVideosFailed),
          ),
        ),
      ),
    );
  });

  loadMoreUserVideos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMoreUserVideos),
      withLatestFrom(this.store.pipe(select(getPaginationState))),
      switchMap(([_, paginationData]) =>
        this.videoService.loadUserVideosAPI(paginationData).pipe(
          map(responseData => loadMoreUserVideosSuccess(responseData)),
          tap(() => this.increasePage(paginationData.page)),
          catchError(error =>
            this.handleErrorResponse(error, loadMoreUserVideosFailed),
          ),
        ),
      ),
    );
  });

  uploadVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(uploadNewVideo),
      switchMap(({ data }) =>
        this.videoService.uploadVideoAPI(data).pipe(
          map(() => uploadNewVideoSuccess()),
          tap(() => {
            this.notifier.showSuccessNotification('Video uploaded');

            this.store.dispatch(
              updatePageValue({ page: VideoProfilePagination.startPage }),
            );

            this.store.dispatch(initUserVideos());
          }),
          catchError(error =>
            this.handleErrorResponse(error, uploadNewVideoFailed),
          ),
        ),
      ),
    );
  });

  private increasePage(currentPage: number) {
    this.store.dispatch(updatePageValue({ page: currentPage + 1 }));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private handleErrorResponse(error: Error, action: Function) {
    const errorMessage = error.message;

    this.notifier.showFailedNotification(errorMessage);

    return of(action({ errorMessage }));
  }
}
