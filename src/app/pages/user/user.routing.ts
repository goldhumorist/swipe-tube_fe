import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouteEnum } from 'src/app/core/enums/app-route.enum';
import { UserLayoutComponent } from 'src/app/layouts';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: UserRouteEnum.Signup,
        loadChildren: () =>
          import('./containers/signup').then(m => m.SignupModule),
      },
      {
        path: '**',
        redirectTo: UserRouteEnum.Signup,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouting {}
