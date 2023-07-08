import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoLayoutComponent } from './../../layouts/';

const routes: Routes = [
  {
    path: '',
    component: VideoLayoutComponent,
    children: [],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRouting {}
