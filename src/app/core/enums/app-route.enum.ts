export enum UserRouteEnum {
  Login = 'login',
  Signup = 'signup',
  Profile = 'profile',
}

export enum ProfileRouteEnum {
  MyVideos = 'my-videos',
  LikedVideos = 'liked-videos',
}

export enum AppRouteEnum {
  User = 'user',
  Video = 'video',
}

export const PATH_TO_LOGIN = `/${AppRouteEnum.User}/${UserRouteEnum.Login}`;
export const PATH_TO_SIGNUP = `/${AppRouteEnum.User}/${UserRouteEnum.Signup}`;
export const PATH_TO_PROFILE = `/${AppRouteEnum.User}/${UserRouteEnum.Profile}`;

export const PATH_TO_PROFILE_MY_VIDEOS = `/${AppRouteEnum.User}/${UserRouteEnum.Profile}/${ProfileRouteEnum.MyVideos}`;
export const PATH_TO_PROFILE_LIKED_VIDEOS = `/${AppRouteEnum.User}/${UserRouteEnum.Profile}/${ProfileRouteEnum.LikedVideos}`;
