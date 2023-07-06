import { FormControl } from '@angular/forms';

export type IDynamicField<T> = {
  [key in keyof T]: FormControl;
};

export interface IServerErrorResponse {
  status: number;
  error: {
    message: string;
    fields: {
      [key: string]: string;
    };
  };
}

export interface IServerSuccessResponse {
  status: number;
  data: {
    [key: string]: string;
  };
}

export type ServerResponse = IServerErrorResponse & IServerSuccessResponse;
