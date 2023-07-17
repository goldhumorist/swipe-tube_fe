import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from './core/enums/app-route.enum';
import { MainLayoutComponent } from './layouts';
import { AuthGuard } from './core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: AppRouteEnum.User,
        loadChildren: () => import('./pages/user').then(m => m.UserModule),
      },
      {
        path: AppRouteEnum.UserProfile,
        loadChildren: () =>
          import('./pages/profile').then(m => m.ProfileModule),
        canActivate: [AuthGuard],
      },
      {
        path: AppRouteEnum.Video,
        loadChildren: () => import('./pages/video').then(m => m.VideoModule),
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: AppRouteEnum.Video,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
