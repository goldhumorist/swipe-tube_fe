import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from '../components/video-list/video-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [VideoListComponent],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [VideoListComponent],
})
export class ProfileSharedModule {}
