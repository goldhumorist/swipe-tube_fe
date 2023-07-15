import { DEFAULT_PROFILE_IMAGE_URL } from './../../features/user/enums/enums';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/features/user';
import { VideoService } from 'src/app/features/video';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  constructor(
    private videoService: VideoService,
    private userService: UserService,
  ) {}

  isVideoUploaded = false;
  uploadData: FormData;

  userData$ = this.userService.userDataSelector$;

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

  getProfileImageUrl(imagePath?: string) {
    return imagePath
      ? `${environment.baseContentUrl}/${imagePath}`
      : DEFAULT_PROFILE_IMAGE_URL;
  }
}
