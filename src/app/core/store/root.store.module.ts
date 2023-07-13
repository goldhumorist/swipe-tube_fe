import { UserStoreModule } from '../../features/user';
import { VideoStoreModule } from '../../features/video';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [UserStoreModule, VideoStoreModule],
})
export class RootStoreModule {}
