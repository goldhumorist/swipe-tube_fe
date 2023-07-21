import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  faComment,
  faEye,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { ISwipeVideo } from 'src/app/features/video/interfaces';
import { environment } from 'src/environments/environment';
import { VideoService } from '../../service';
import { Subject, takeUntil } from 'rxjs';
import { VideoReactionEnum } from '../../enums';

@Component({
  selector: 'app-swipe-video-item',
  templateUrl: './swipe-video-item.component.html',
  styleUrls: ['./swipe-video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipeVideoItemComponent implements OnChanges, OnDestroy {
  showVideo: boolean | undefined = false;

  faLike = faThumbsUp;
  faDislike = faThumbsDown;
  faViews = faEye;
  faComments = faComment;

  boundTimeUpdateCallback = this.timeUpdateCallback.bind(this);
  @Input() swipeVideoItem: ISwipeVideo;
  @Input() isPlaying: boolean | undefined;

  @ViewChild('swipeVideo', { static: false }) swipeVideo!: ElementRef;

  private destroySubject$ = new Subject();
  public videoReactions = VideoReactionEnum;

  get videoStatistic() {
    return this.swipeVideoItem.statistic;
  }

  get videoMetaData() {
    return this.swipeVideoItem.metaData;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private videoService: VideoService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('isPlaying' in changes) {
      const isPlaying = changes['isPlaying'].currentValue;

      isPlaying
        ? this.updateVideoState(isPlaying)
        : /**
           *  We need setTimeout to delay showing video preview
           */
          setTimeout(() => {
            this.updateVideoState(isPlaying);
          }, 500);
    }
  }

  updateVideoReaction(reaction: VideoReactionEnum) {
    this.videoService
      .updateVideoReaction({
        videoId: this.swipeVideoItem.videoId,
        reaction,
      })
      .subscribe({
        next: result => {
          this.swipeVideoItem.statistic.likes = result.statistic.likes;
          this.swipeVideoItem.statistic.dislikes = result.statistic.dislikes;

          this.swipeVideoItem.metaData.isDisliked = result.metaData.isDisliked;
          this.swipeVideoItem.metaData.isLiked = result.metaData.isLiked;

          this.changeDetectorRef.detectChanges();
        },
      });
  }

  public formUrl = (urlPath: string): string => {
    return `${environment.baseContentUrl}/${urlPath}`;
  };

  private updateVideoState(isPlaying: boolean) {
    this.showVideo = isPlaying;

    this.changeDetectorRef.detectChanges();

    isPlaying ? this.playVideo() : this.stopVideo();

    this.changeDetectorRef.detectChanges();
  }

  private playVideo() {
    const nativeElement = this.swipeVideo?.nativeElement as HTMLMediaElement;

    if (nativeElement) {
      nativeElement.volume = 0.2;
      nativeElement.play();

      this.listenSwipeVideoTimeUpdate();
    }
  }

  private stopVideo() {
    const nativeElement = this.swipeVideo?.nativeElement as HTMLMediaElement;

    if (nativeElement) {
      nativeElement.pause();
      nativeElement.currentTime = 0;
    }
  }

  private listenSwipeVideoTimeUpdate() {
    this.swipeVideo.nativeElement.addEventListener(
      'timeupdate',
      this.boundTimeUpdateCallback,
    );
  }

  private async timeUpdateCallback(event: Event) {
    const totalDuration = this.swipeVideo?.nativeElement.duration;
    const actualTime = (event.target as HTMLVideoElement).currentTime;
    const halfwayPoint = totalDuration / 2;

    if (actualTime >= halfwayPoint && !this.swipeVideoItem.metaData.isViewed) {
      this.videoService
        .addVideoView(this.swipeVideoItem.videoId)
        .pipe(takeUntil(this.destroySubject$))
        .subscribe();

      this.swipeVideo.nativeElement.removeEventListener(
        'timeupdate',
        this.boundTimeUpdateCallback,
      );
    }
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }
}
