export interface IUser {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly repeatPassword: string;
}

export interface ISignupData {
  data: FormData;
}

export type ISignupRequestData = FormData;

export interface ISignupResponse {
  username: string;
  email: string;
  avatarUrlPath?: string;
  accessToken: string;
}

export interface ILoginResponseData {
  username: string;
  email: string;
  avatarUrlPath?: string;
  accessToken: string;
}

export interface ILoginData {
  data: {
    email: string;
    password: string;
  };
}

export interface ILoginRequestData {
  email: string;
  password: string;
}
