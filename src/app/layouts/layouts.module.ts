import { NgModule } from '@angular/core';
import { MainComponent } from './main';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainComponent],
  imports: [RouterModule],
  exports: [MainComponent],
})
export class LayoutsModule {}
