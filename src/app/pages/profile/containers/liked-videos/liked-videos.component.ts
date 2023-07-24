import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VideoService } from 'src/app/features/video';
import { IVideoWithStatistic } from 'src/app/features/video/interfaces';
import { IntersectionStatus } from 'src/app/shared/directives/service/from-intersection-observer';

@Component({
  selector: 'app-liked-videos',
  templateUrl: './liked-videos.component.html',
  styleUrls: ['./liked-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LikedVideosComponent implements OnInit, OnDestroy {
  public videoList: IVideoWithStatistic[];

  public isLoading$ = this.videosService.isLoadingSelector$;
  private destroySubject$ = new Subject();

  paginationParams = { page: 1, limit: 15 };

  constructor(
    private videosService: VideoService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.videosService.setLoadingState(true);

    this.videosService
      .loadLikedVideos(this.paginationParams)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: videos => {
          this.videoList = videos;
          this.cd.detectChanges();
        },
        complete: () => {
          this.videosService.setLoadingState(false);
        },
      });
  }

  loadNewVideos(status: string) {
    if (status === IntersectionStatus.Pending)
      this.videosService.setLoadingState(true);

    if (status === IntersectionStatus.Visible) {
      this.videosService.setLoadingState(false);
      this.paginationParams = {
        ...this.paginationParams,
        page: this.paginationParams.page + 1,
      };

      this.videosService
        .loadLikedVideos(this.paginationParams)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe({
          next: videos => {
            this.videoList = [...this.videoList, ...videos];
            this.cd.detectChanges();
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }
}
