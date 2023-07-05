import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from './core/enums/app-route.enum';
import { MainLayoutComponent } from './layouts';

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
        path: '**',
        redirectTo: AppRouteEnum.User,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
