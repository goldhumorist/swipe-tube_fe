import {
  AppRouteEnum,
  UserProfileRouteEnum,
} from './../../../core/enums/app-route.enum';
import { environment } from './../../../../environments/environment';
import { DEFAULT_PROFILE_IMAGE_URL } from './../../../features/user/enums/enums';
import { map } from 'rxjs';
import { UserService } from './../../../features/user/service/user.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  profileImageUrl$ = this.userService.userAvatarUrlPath$.pipe(
    map(urlPath =>
      urlPath
        ? `${environment.baseContentUrl}/${urlPath}`
        : DEFAULT_PROFILE_IMAGE_URL,
    ),
  );

  profileImageClick() {
    this.router.navigate([
      `${AppRouteEnum.UserProfile}/${UserProfileRouteEnum.MyVideos}`,
    ]);
  }
}
