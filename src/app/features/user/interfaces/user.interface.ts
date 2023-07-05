export interface IUser {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly repeatPassword: string;
}

export interface ISignupResponse {
  data: {
    username: string;
    email: string;
    avatarUrlPath?: string | null;
  };
  status: number;
}

export interface ISignupResError {
  status: number;
  error: IError;
}
interface IErrorFields {
  email: string;
}
interface IError {
  code: string;
  message: string;
  fields: IErrorFields;
}
