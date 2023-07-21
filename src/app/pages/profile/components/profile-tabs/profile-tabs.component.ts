import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faArchive, faHeart } from '@fortawesome/free-solid-svg-icons';
import {
  PATH_TO_PROFILE_LIKED_VIDEOS,
  PATH_TO_PROFILE_MY_VIDEOS,
} from 'src/app/core/enums/app-route.enum';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTabsComponent {
  public faArchive = faArchive;
  public faHeart = faHeart;
  public readonly myVideosPath = PATH_TO_PROFILE_MY_VIDEOS;
  public readonly likedVideosPath = PATH_TO_PROFILE_LIKED_VIDEOS;
}
