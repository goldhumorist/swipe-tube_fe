import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedVideosComponent } from './liked-videos.component';
import { LikedVideosRouting } from './liked-videos.routing';
import { SharedModule } from 'src/app/shared';
import { FeaturesModule } from 'src/app/features';

@NgModule({
  declarations: [LikedVideosComponent],
  imports: [CommonModule, LikedVideosRouting, FeaturesModule, SharedModule],
})
export class LikedVideosModule {}
