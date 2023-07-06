import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';
import { NavigationLinkComponent } from './navigation-link';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ButtonComponent, NavigationLinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, NavigationLinkComponent],
})
export class UiModule {}
