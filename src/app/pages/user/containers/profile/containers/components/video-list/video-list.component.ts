import { IVideo } from './../../../../../../../features/video/interfaces/interfaces';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { faArchive, faHeart } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  public faArchive = faArchive;
  public faHeart = faHeart;

  @Input() videoList: IVideo[];

  @Input() isLoading$: Observable<boolean>;

  @Output() loadNewVideosEmitter = new EventEmitter<string>();

  formThumbnailPath = (videoThumbnailKey: string): string =>
    `${environment.baseContentUrl}/${videoThumbnailKey}`;

  onIntersection = (status: string) => this.loadNewVideosEmitter.emit(status);

  trackByFn = (index: number): number => index;

  isLastElement(index: number): boolean {
    return index === this.videoList?.length - 1;
  }
}
