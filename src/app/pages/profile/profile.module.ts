import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileTabsComponent } from './components';
import { CommonModule } from '@angular/common';
import { FeaturesModule } from 'src/app/features';
import { ProfileRouting } from './profile.routing';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [ProfileComponent, ProfileTabsComponent],
  imports: [
    CommonModule,
    FeaturesModule,
    FontAwesomeModule,
    ProfileRouting,
    SharedModule,
  ],
})
export class ProfileModule {}
