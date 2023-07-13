import { NgModule } from '@angular/core';
import { UserModule } from './user';
import { VideoModule } from './video';

@NgModule({
  declarations: [],
  exports: [UserModule, VideoModule],
  imports: [],
})
export class FeaturesModule {}
