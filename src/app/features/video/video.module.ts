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

@NgModule({
  declarations: [
    VideoItemComponent,
    VideoListComponent,
    ModalPlayerComponent,
    SwipeVideoItemComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [
    VideoItemComponent,
    VideoListComponent,
    ModalPlayerComponent,
    SwipeVideoItemComponent,
  ],
})
export class VideoModule {}
