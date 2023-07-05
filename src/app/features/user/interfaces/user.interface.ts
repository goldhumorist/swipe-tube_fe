export interface IUser {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly repeatPassword: string;
}

export interface ISignupResponse {
  username: string;
  email: string;
  avatarUrlPath?: string | null;
}
