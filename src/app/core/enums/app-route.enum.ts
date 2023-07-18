export enum UserRouteEnum {
  Login = 'login',
  Signup = 'signup',
}

export enum UserProfileRouteEnum {
  MyVideos = 'my-videos',
  LikedVideos = 'liked-videos',
}

export enum VideoRouteEnum {
  MainVideos = 'main',
  Record = 'record',
}

export enum AppRouteEnum {
  User = 'user',
  UserProfile = 'user-profile',
  Video = 'video',
}

export const PATH_TO_LOGIN = `/${AppRouteEnum.User}/${UserRouteEnum.Login}`;
export const PATH_TO_SIGNUP = `/${AppRouteEnum.User}/${UserRouteEnum.Signup}`;
export const PATH_TO_PROFILE = `/${AppRouteEnum.UserProfile}`;
export const PATH_TO_SWIPES_VIDEOS = `/${AppRouteEnum.Video}/${VideoRouteEnum.MainVideos}`;

export const PATH_TO_PROFILE_MY_VIDEOS = `/${AppRouteEnum.UserProfile}/${UserProfileRouteEnum.MyVideos}`;
export const PATH_TO_PROFILE_LIKED_VIDEOS = `/${AppRouteEnum.UserProfile}/${UserProfileRouteEnum.LikedVideos}`;
