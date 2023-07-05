import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from './core/enums/app-route.enum';
import { MainComponent } from './layouts';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: AppRouteEnum.Signup,
        loadChildren: () => import('./pages/signup').then(m => m.SignupModule),
      },
      {
        path: '**',
        redirectTo: AppRouteEnum.Signup,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
