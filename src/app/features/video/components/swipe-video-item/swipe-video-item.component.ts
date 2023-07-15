import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IVideo, ISwipeVideo } from 'src/app/features/video/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-swipe-video-item',
  templateUrl: './swipe-video-item.component.html',
  styleUrls: ['./swipe-video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwipeVideoItemComponent implements OnChanges, AfterViewInit {
  @Input() swipeVideoItem: ISwipeVideo;

  @Input() isPlaying: boolean | undefined;

  showVideo: boolean | undefined = false;

  @ViewChild('swipeVideo', { static: false }) swipeVideo!: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.isPlaying) this.playVideo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isPlaying = changes['isPlaying'].currentValue;

    isPlaying
      ? this.updateVideoState(isPlaying)
      : /**
         *  We need setTimeout to delay showing video preview
         */
        setTimeout(() => {
          this.updateVideoState(isPlaying);
        }, 300);
  }

  private updateVideoState(isPlaying: boolean) {
    this.showVideo = isPlaying;

    this.changeDetectorRef.detectChanges();

    isPlaying ? this.playVideo() : this.stopVideo();

    this.changeDetectorRef.detectChanges();
  }

  private playVideo() {
    this.swipeVideo?.nativeElement?.play();
  }

  private stopVideo() {
    const nativeElement = this.swipeVideo?.nativeElement as HTMLMediaElement;

    if (nativeElement) {
      this.swipeVideo.nativeElement.pause();
      this.swipeVideo.nativeElement.currentTime = 0;
    }
  }

  public formUrl = (urlPath: string): string => {
    return `${environment.baseContentUrl}/${urlPath}`;
  };
}
