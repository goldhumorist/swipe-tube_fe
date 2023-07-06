import { NgModule } from '@angular/core';
import { UserModule } from './user';

@NgModule({
  exports: [UserModule],
  imports: [],
})
export class FeaturesModule {}
