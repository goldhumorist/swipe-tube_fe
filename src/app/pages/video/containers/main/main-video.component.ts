import { IntersectionStatus } from 'src/app/shared/directives/service/from-intersection-observer';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { VideoService } from 'src/app/features/video';
import {
  ISwipeVideosParams,
  ISwipeVideo,
} from 'src/app/features/video/interfaces';
import {
  Observable,
  Subject,
  debounceTime,
  fromEvent,
  map,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-main-video',
  templateUrl: './main-video.component.html',
  styleUrls: ['./main-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainVideoComponent implements OnInit, OnDestroy {
  constructor(
    private videoService: VideoService,
    private cd: ChangeDetectorRef,
  ) {}

  public swipeVideoParams: ISwipeVideosParams = {
    page: 1,
    mainLimit: 5,
    itemLimit: 5,
  };

  public scrollEvent$ = fromEvent(
    window,
    'mousewheel',
  ) as Observable<WheelEvent>;

  public destroySubject$ = new Subject<boolean>();

  public swipeVideos: ISwipeVideo[];
  public currentVideoIndex = 0;

  public isLoading: boolean;

  @ViewChild('swipeVideosList', { static: false })
  swipeVideosListElement!: ElementRef;

  ngOnInit(): void {
    this.isLoading = true;

    this.videoService
      .loadSwipeVideos(this.swipeVideoParams)
      .pipe(
        takeUntil(this.destroySubject$),
        map(videos => this.mapVideoResponseForInit(videos)),
      )
      .subscribe({
        next: videos => {
          this.swipeVideos = videos;

          this.isLoading = false;
          this.cd.detectChanges();
        },
      });

    this.scrollEvent$
      .pipe(takeUntil(this.destroySubject$), debounceTime(100))
      .subscribe({
        next: ($event: WheelEvent) =>
          $event.deltaY > 0
            ? this.handleScroll('up')
            : this.handleScroll('down'),
      });
  }

  loadMoreSwipeVideos(status: string) {
    if (IntersectionStatus.Visible === status) {
      this.swipeVideoParams.page += 1;

      this.videoService
        .loadSwipeVideos(this.swipeVideoParams)
        .pipe(
          takeUntil(this.destroySubject$),
          map(videos => this.mapVideoResponse(videos)),
        )
        .subscribe({
          next: videos => {
            this.swipeVideos = [...this.swipeVideos, ...videos];

            this.isLoading = false;
            this.cd.detectChanges();
          },
        });
    }
  }

  isElementListenerForLoadMoreData(index: number) {
    return index === this.swipeVideos.length - 3;
  }

  private handleScroll(direction: 'up' | 'down') {
    const isDirectionUp = direction === 'up';

    const prevVideoIndex = this.currentVideoIndex;

    const nextVideoIndex = isDirectionUp
      ? this.currentVideoIndex + 1
      : this.currentVideoIndex - 1;

    const isStartOrEnd =
      nextVideoIndex !== -1 && nextVideoIndex !== this.swipeVideos.length;

    if (isStartOrEnd) {
      this.currentVideoIndex = nextVideoIndex;

      const nextElement =
        this.swipeVideosListElement.nativeElement.children[nextVideoIndex];

      this.scrollToElement(nextElement);

      this.swipeVideos[nextVideoIndex].isPlaying = true;

      this.swipeVideos[prevVideoIndex].isPlaying = false;

      this.cd.detectChanges();
    }
  }

  private scrollToElement(nextElement: Element) {
    nextElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  private mapVideoResponse(swipeVideos: Array<ISwipeVideo>) {
    return swipeVideos.map(currentVideo => ({
      ...currentVideo,
      isPlaying: false,
    }));
  }

  private mapVideoResponseForInit(swipeVideos: Array<ISwipeVideo>) {
    return swipeVideos.map((currentVideo, index) =>
      index === 0
        ? {
            ...currentVideo,
            isPlaying: true,
          }
        : {
            ...currentVideo,
            isPlaying: false,
          },
    );
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }
}
