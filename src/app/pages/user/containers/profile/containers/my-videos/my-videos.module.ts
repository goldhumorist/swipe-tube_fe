import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVideosComponent } from './my-videos.component';
import { MyVideosRouting } from './my-videos.routing';
import { SharedModule } from 'src/app/shared';
import { FeaturesModule } from 'src/app/features';

@NgModule({
  declarations: [MyVideosComponent],

  imports: [CommonModule, MyVideosRouting, FeaturesModule, SharedModule],
})
export class MyVideosModule {}
