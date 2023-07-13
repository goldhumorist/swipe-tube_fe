import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';
import { NavigationLinkComponent } from './navigation-link';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { ModalOverlayComponent } from './modal-overlay/modal-overlay.component';

@NgModule({
  declarations: [
    ButtonComponent,
    NavigationLinkComponent,
    LoaderComponent,
    FooterComponent,
    LoadingOverlayComponent,
    ModalOverlayComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ButtonComponent,
    NavigationLinkComponent,
    LoaderComponent,
    FooterComponent,
    ModalOverlayComponent,
    LoadingOverlayComponent,
  ],
})
export class UiModule {}
