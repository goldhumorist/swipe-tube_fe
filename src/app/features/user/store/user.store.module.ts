import { USER_FEATURE_NAME } from './user.selector';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(USER_FEATURE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UserStoreModule {}
