export enum UserRouteEnum {
  Login = 'login',
  Signup = 'signup',
}

export enum AppRouteEnum {
  User = 'user',
  Video = 'video',
}

export const PATH_TO_LOGIN = `/${AppRouteEnum.User}/${UserRouteEnum.Login}`;
export const PATH_TO_SIGNUP = `/${AppRouteEnum.User}/${UserRouteEnum.Signup}`;
