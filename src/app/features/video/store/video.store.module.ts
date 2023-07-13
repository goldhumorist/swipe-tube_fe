import { FEATURE_NAME } from '../../../core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { videoReducer } from './video.reducer';
import { VideoEffects } from './video.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FEATURE_NAME.VIDEO, videoReducer),
    EffectsModule.forFeature([VideoEffects]),
  ],
})
export class VideoStoreModule {}
