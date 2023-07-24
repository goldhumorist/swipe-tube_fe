import { IVideoWithStatistic } from '../../interfaces/interfaces';
import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent {
  selectedVideo: IVideoWithStatistic;

  isVideoSelected: boolean;

  @Input() videoList: IVideoWithStatistic[];
  @Input() isLoading$: Observable<boolean>;

  @Output() loadNewVideosEmitter = new EventEmitter<string>();

  onIntersection = (status: string) => this.loadNewVideosEmitter.emit(status);

  trackByFn = (index: number): number => index;

  isLastElement(index: number): boolean {
    return index === this.videoList?.length - 1;
  }

  openVideo(video: IVideoWithStatistic) {
    this.selectedVideo = video;
    this.isVideoSelected = true;
  }

  onModalClose() {
    this.selectedVideo = {
      videoUrlPath: '',
      thumbnailUrlPath: '',
      description: '',
      statistic: {},
    };
    this.isVideoSelected = false;
  }
}
