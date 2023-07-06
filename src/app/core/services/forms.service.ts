import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { IDynamicFormGroup, IField } from 'src/app/shared';
import { IDynamicField } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  getFormGroupFields<T extends object>(
    fields: Array<IField<unknown>>,
    model: IDynamicFormGroup<unknown>,
  ): IDynamicField<T> {
    const formGroupFields: IDynamicField<T> = {} as IDynamicField<T>;

    for (const field of Object.keys(model)) {
      const fieldProps: IField<unknown> = model[field];

      const validators: ValidatorFn[] = this.addValidator(
        fieldProps.rules,
      ) as ValidatorFn[];

      formGroupFields[field as keyof T] = new FormControl(
        fieldProps.value,
        validators,
      );

      //metadata fields for dynamic form fields component
      fields.push({ ...fieldProps, fieldName: field });
    }

    return formGroupFields;
  }

  private addValidator(rules: { [keyWord: string]: boolean } | undefined) {
    if (!rules) {
      return [];
    }

    const validators = Object.keys(rules).map(rule => {
      switch (rule) {
        case 'required':
          return Validators.required;
        case 'minLength':
          return Validators.minLength(12);
        case 'password':
          return Validators.pattern(
            /^(?=.*[*!#$&])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
          );
        case 'repeatPassword':
          return Validators.required;
        case 'email':
          return Validators.email;
        default:
          return [];
        //add more case for future.
      }
    });

    return validators;
  }
}
