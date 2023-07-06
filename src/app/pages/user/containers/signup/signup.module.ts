import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FeaturesModule } from 'src/app/features';
import { SignupComponent } from './signup.component';
import { SignupRouting } from './signup.routing';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [SignupComponent],
  imports: [FeaturesModule, ReactiveFormsModule, SignupRouting, SharedModule],
})
export class SignupModule {}
