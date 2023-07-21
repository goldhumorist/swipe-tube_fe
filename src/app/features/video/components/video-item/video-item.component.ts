import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IVideo } from 'src/app/features/video/interfaces';
import { environment } from 'src/environments/environment';
import { faArchive, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoItemComponent {
  @Input() videoItem: IVideo;

  @Output() selectVideoEmitter = new EventEmitter<IVideo>();

  public faArchive = faArchive;
  public faHeart = faHeart;

  formThumbnailUrl = (videoThumbnailKey: string): string =>
    `${environment.baseContentUrl}/${videoThumbnailKey}`;

  onVideoClick(videoItem: IVideo) {
    this.selectVideoEmitter.emit(videoItem);
  }
}
