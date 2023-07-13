import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/';
import { FeaturesModule } from './../../../../features/';
import { NgModule } from '@angular/core';
import { ProfileRouting } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { ProfileTabsComponent } from './components/profile-tabs/profile-tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
