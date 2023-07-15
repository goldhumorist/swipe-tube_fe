import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button';
import { NavigationLinkComponent } from './navigation-link';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { ModalOverlayComponent } from './modal-overlay/modal-overlay.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BurgerMenuComponent } from './burger-menu/burger-menu.component';
import { NavigationComponent } from './burger-menu/navigation/navigation.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    NavigationLinkComponent,
    LoaderComponent,
    FooterComponent,
    LoadingOverlayComponent,
    ModalOverlayComponent,
    BurgerMenuComponent,
    NavigationComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [
    ButtonComponent,
    NavigationLinkComponent,
    LoaderComponent,
    FooterComponent,
    ModalOverlayComponent,
    LoadingOverlayComponent,
    BurgerMenuComponent,
    HeaderComponent,
  ],
})
export class UiModule {}
