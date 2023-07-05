export interface IDynamicFormGroup<T> {
  [fieldName: string]: IField<T>;
}

export interface IField<T> {
  type: string;
  value: T;
  label: string;
  fieldName?: string;
  rules?: {
    [key: string]: boolean;
  };
}
