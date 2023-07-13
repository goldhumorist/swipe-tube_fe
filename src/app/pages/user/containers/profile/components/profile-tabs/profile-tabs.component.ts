import {
  PATH_TO_PROFILE_LIKED_VIDEOS,
  PATH_TO_PROFILE_MY_VIDEOS,
} from './../../../../../../core/enums/app-route.enum';
import { Component } from '@angular/core';
import { faArchive, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
})
export class ProfileTabsComponent {
  public faArchive = faArchive;
  public faHeart = faHeart;
  public readonly myVideosPath = PATH_TO_PROFILE_MY_VIDEOS;
  public readonly likedVideosPath = PATH_TO_PROFILE_LIKED_VIDEOS;
}
