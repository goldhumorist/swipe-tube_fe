import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ModalPlayerComponent,
  VideoItemComponent,
  VideoListComponent,
  SwipeVideoItemComponent,
} from './components';
import { SharedModule } from 'src/app/shared';
import { VideoRecorderComponent } from './components/video-recorder/video-recorder.component';

@NgModule({
  declarations: [
    VideoItemComponent,
    VideoListComponent,
    ModalPlayerComponent,
    SwipeVideoItemComponent,
    VideoRecorderComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [
    VideoItemComponent,
    VideoListComponent,
    ModalPlayerComponent,
    SwipeVideoItemComponent,
    VideoRecorderComponent,
  ],
})
export class VideoModule {}
