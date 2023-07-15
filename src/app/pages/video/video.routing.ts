import { VideoRouteEnum } from './../../core/enums/app-route.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoLayoutComponent } from './../../layouts/';
import { AuthGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: VideoLayoutComponent,
    children: [
      {
        path: VideoRouteEnum.MainVideos,
        loadChildren: () =>
          import('./containers/main').then(m => m.VideoMainModule),
      },
      {
        path: '**',
        redirectTo: VideoRouteEnum.MainVideos,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoRouting {}
