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

  private destroySubject$ = new Subject();

  @Input()
  isLiked = false;

  @Input()
  isDisliked = false;

  @Input() swipeVideoItem: ISwipeVideo;

  @Input() isPlaying: boolean | undefined;

  @ViewChild('swipeVideo', { static: false }) swipeVideo!: ElementRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private videoService: VideoService,
  ) {}

  getLikes() {
    return this.swipeVideoItem.statistic?.likes
      ? this.swipeVideoItem.statistic.likes
      : 0;
  }

  getDislikes() {
    return this.swipeVideoItem.statistic?.likes
      ? this.swipeVideoItem.statistic.likes
      : 0;
  }

  getViews() {
    return this.swipeVideoItem.statistic?.views
      ? this.swipeVideoItem.statistic.views
      : 0;
  }

  likeVideo() {
    console.log('liked');
  }

  dislikeVideo() {
    console.log('disliked');
  }

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

  public formUrl = (urlPath: string): string => {
    return `${environment.baseContentUrl}/${urlPath}`;
  };

  listenSwipeVideoTimeUpdate() {
    this.swipeVideo.nativeElement.addEventListener(
      'timeupdate',
      this.boundTimeUpdateCallback,
    );
  }

  async timeUpdateCallback(event: Event) {
    const totalDuration = this.swipeVideo?.nativeElement.duration;
    const actualTime = (event.target as HTMLVideoElement).currentTime;
    const halfwayPoint = totalDuration / 2;

    if (actualTime >= halfwayPoint) {
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
