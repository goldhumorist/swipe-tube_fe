import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VideoService } from 'src/app/features/video';

@Component({
  selector: 'app-main-video',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordComponent {
  constructor(private videoService: VideoService) {}

  async uploadVideo(video: Blob) {
    const formData = new FormData();

    formData.append('video', video, 'user_video.mp4');

    this.videoService.uploadVideo(formData);
  }
}
