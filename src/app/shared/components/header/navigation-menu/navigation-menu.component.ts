import { Component } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  AppRouteEnum,
  VideoRouteEnum,
} from 'src/app/core/enums/app-route.enum';
import { UserService } from 'src/app/features/user';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent {
  public faBars = faBars;
  public faXmark = faXmark;
  public isMenuOpen = false;

  swipePath = `/${AppRouteEnum.Video}/${VideoRouteEnum.MainVideos}`;
  profilePath = `/${AppRouteEnum.UserProfile}`;
  recordPath = `/${AppRouteEnum.Video}/${VideoRouteEnum.Record}`;

  constructor(private userService: UserService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logoutHandler() {
    this.userService.logout();
  }
}
