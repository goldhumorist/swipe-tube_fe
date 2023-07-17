import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VideoService } from 'src/app/features/video';
import { IVideo } from 'src/app/features/video/interfaces';
import { IntersectionStatus } from 'src/app/shared/directives/service/from-intersection-observer';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyVideosComponent implements OnInit, OnDestroy {
  public videoList: IVideo[];

  public isLoading$ = this.videosService.isLoadingSelector$;
  private destroySubject$ = new Subject();

  constructor(
    private videosService: VideoService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.videosService.initUserVideos();

    this.videosService.userVideosSelector$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: videos => {
          this.videoList = videos;
          this.cd.detectChanges();
        },
      });
  }

  loadNewVideos(status: string) {
    if (status === IntersectionStatus.Pending)
      this.videosService.setLoadingState(true);

    if (status === IntersectionStatus.Visible) {
      this.videosService.loadMoreUserVideos();

      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
    this.destroySubject$.unsubscribe();
  }
}
