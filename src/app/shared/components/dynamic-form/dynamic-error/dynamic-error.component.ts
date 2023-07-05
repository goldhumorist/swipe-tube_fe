import { Component, Input, OnInit } from '@angular/core';

import {
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-error',
  templateUrl: './dynamic-error.component.html',
  styleUrls: ['./dynamic-error.component.scss'],
})
export class DynamicErrorComponent implements OnInit {
  formName: FormGroup;

  @Input()
  isSubmitted: boolean;

  @Input() fieldName: string;

  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formName = this.formgroupDirective.control;
  }

  generateMessage() {
    const result: string[] = Object.keys(
      this.formName.controls[this.fieldName].errors as ValidationErrors,
    ).map(errorKey => {
      switch (errorKey) {
        case 'pattern':
          return `please, use 1 uppercase letter, 1 lowercase letter, number and use 1 or more of these symbols: *!#$&`;
        case 'minlength':
          return `please, provide more than 12 characters`;
        case 'required':
          return `field required`;
        case 'email':
          return `invalid email`;
        default:
          return '';
      }
    });

    return result;
  }
}
