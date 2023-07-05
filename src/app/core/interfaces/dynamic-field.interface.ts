import { FormControl } from '@angular/forms';

export type IDynamicField<T> = {
  [key in keyof T]: FormControl;
};
