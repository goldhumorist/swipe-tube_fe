import { IVideo } from '../../interfaces/interfaces';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  selectedVideo: IVideo;

  isVideoSelected: boolean;

  @Input() videoList: IVideo[];
  @Input() isLoading$: Observable<boolean>;

  @Output() loadNewVideosEmitter = new EventEmitter<string>();

  onIntersection = (status: string) => this.loadNewVideosEmitter.emit(status);

  trackByFn = (index: number): number => index;

  isLastElement(index: number): boolean {
    return index === this.videoList?.length - 1;
  }

  openVideo(video: IVideo) {
    this.selectedVideo = video;
    this.isVideoSelected = true;
  }

  onModalClose() {
    this.selectedVideo = {
      videoUrlPath: '',
      thumbnailUrlPath: '',
      description: '',
    };
    this.isVideoSelected = false;
  }
}
