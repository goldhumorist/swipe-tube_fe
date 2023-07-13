import { IntersectionStatus } from 'src/app/shared/directives/service/from-intersection-observer';
import {
  IMyVideosParams,
  IVideo,
} from './../../../../../../features/video/interfaces/interfaces';
import { VideoService } from './../../../../../../features/video/service/video.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoProfilePagination } from 'src/app/features/video';

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyVideosComponent implements OnInit {
  public videoParams: IMyVideosParams = {
    page: VideoProfilePagination.startPage,
    limit: VideoProfilePagination.limit,
  };

  public videoList: IVideo[];

  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private videosService: VideoService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isLoading$.next(true);

    this.videosService.initStoreUserVideos();

    this.videosService.getUserVideosFromStore().subscribe({
      next: videos => {
        this.videoList = videos;
        this.cd.detectChanges();
        this.isLoading$.next(false);
      },
    });
  }

  loadNewVideos(status: string) {
    if (status === IntersectionStatus.Pending) {
      this.isLoading$.next(true);
    }

    if (status === IntersectionStatus.Visible) {
      this.videoParams.page += 1;

      this.videosService.updateStoreVideos(this.videoParams);

      this.isLoading$.next(false);

      this.cd.detectChanges();
    }
  }
}
