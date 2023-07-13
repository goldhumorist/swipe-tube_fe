import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VideoService } from 'src/app/features/video';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  isVideoUploaded = false;
  uploadData: FormData;

  constructor(private videoService: VideoService) {}

  onVideoUpload(file: FormData) {
    this.isVideoUploaded = true;
    this.uploadData = file;
  }

  onUploadConfirm() {
    this.isVideoUploaded = false;

    this.videoService.uploadVideo(this.uploadData);
  }

  onUploadCancel() {
    this.isVideoUploaded = false;
  }
}
