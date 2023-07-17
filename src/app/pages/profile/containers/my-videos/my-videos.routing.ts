import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyVideosComponent } from './my-videos.component';

const routes: Routes = [
  {
    path: '',
    component: MyVideosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyVideosRouting {}
