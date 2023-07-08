import { FEATURE_NAME } from './../../../core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FEATURE_NAME.USER, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UserStoreModule {}
