import { UserProfileRouteEnum } from './../../core/enums/app-route.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: UserProfileRouteEnum.MyVideos,
        loadChildren: () =>
          import('./containers/my-videos').then(m => m.MyVideosModule),
      },
      {
        path: UserProfileRouteEnum.LikedVideos,
        loadChildren: () =>
          import('./containers/liked-videos').then(m => m.LikedVideosModule),
      },
      {
        path: '**',
        redirectTo: UserProfileRouteEnum.MyVideos,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {}
