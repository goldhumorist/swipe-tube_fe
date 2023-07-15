import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedVideosComponent } from './liked-videos.component';

const routes: Routes = [
  {
    path: '',
    component: LikedVideosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedVideosRouting {}
