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

export interface IError {
  code: string;
  message: string;
  fields: IErrorFields;
}

interface IErrorFields {
  email: string;
}

export interface ILoginResponse {
  username: string;
  email: string;
  avatarUrlPath?: string | null;
}

export interface ILoginData {
  email: string;
  password: string;
}
