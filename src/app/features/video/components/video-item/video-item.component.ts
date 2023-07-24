import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IVideoWithStatistic } from 'src/app/features/video/interfaces';
import { environment } from 'src/environments/environment';
import {
  faThumbsUp,
  faThumbsDown,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() videoItem: IVideoWithStatistic;

  @Output() selectVideoEmitter = new EventEmitter<IVideoWithStatistic>();

  public faThumbsUp = faThumbsUp;
  public faThumbsDown = faThumbsDown;
  public faEye = faEye;

  get thumbnailUrl() {
    return `${environment.baseContentUrl}/${this.videoItem.thumbnailUrlPath}`;
  }

  get videoStatistic() {
    return this.videoItem.statistic;
  }

  onVideoClick(videoItem: IVideoWithStatistic) {
    this.selectVideoEmitter.emit(videoItem);
  }
}
