import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main';
import { UserLayoutComponent } from './user';
import { VideoLayoutComponent } from './video';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    UserLayoutComponent,
    MainLayoutComponent,
    VideoLayoutComponent,
  ],
  imports: [RouterModule, SharedModule],
})
export class LayoutsModule {}
