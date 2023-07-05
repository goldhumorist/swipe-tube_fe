import { NgModule } from '@angular/core';
import { UserLayoutComponent } from './user';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main/main-layout.component';

@NgModule({
  declarations: [UserLayoutComponent, MainLayoutComponent],
  imports: [RouterModule],
  exports: [UserLayoutComponent],
})
export class LayoutsModule {}
