import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';
import { FeaturesModule } from '../../../../features';
import { NgModule } from '@angular/core';
import { MainVideoComponent } from './main-video.component';
import { VideoMainRouting } from './main-video.routing';

@NgModule({
  declarations: [MainVideoComponent],
  imports: [CommonModule, FeaturesModule, VideoMainRouting, SharedModule],
})
export class VideoMainModule {}
