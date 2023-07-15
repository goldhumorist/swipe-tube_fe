import { Component, Input } from '@angular/core';
import {
  AppRouteEnum,
  UserRouteEnum,
  VideoRouteEnum,
} from 'src/app/core/enums/app-route.enum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() isMenuOpen: boolean;

  swipePath = `/${AppRouteEnum.Video}/${VideoRouteEnum.MainVideos}`;
  profilePath = `/${AppRouteEnum.UserProfile}`;
  logoutPath = `/${AppRouteEnum.User}/${UserRouteEnum.Login}`;
}
