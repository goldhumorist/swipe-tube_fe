import { FormGroup } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsService } from 'src/app/core/services';
import { IDynamicFormGroup, IField } from '../../interfaces';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit {
  public isSubmitted = false;
  public isSignup = false;
  public dynamicFormGroup: FormGroup;
  public fields: Array<IField<unknown>> = [];

  @Input() formBtnText: string;

  @Input() model: IDynamicFormGroup<unknown>;

  @Output() submitEmmiter: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(private formsService: FormsService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  // send further to use inside components
  emitSubmit(): void {
    if (this.isFormValid()) {
      this.submitEmmiter.emit(this.dynamicFormGroup);

      // return this.dynamicFormGroup.reset();
    }
    this.isSubmitted = true;
  }

  isFormValid(): boolean {
    return (
      this.dynamicFormGroup.status === 'VALID' &&
      (this.isSignup ? this.isPasswordsEqual() : true)
    );
  }

  isBtnDisabled(): boolean {
    return this.isSubmitted && !this.isFormValid();
  }

  isPasswordsEqual(): boolean {
    return (
      this.dynamicFormGroup.controls['repeatPassword']?.value ===
      this.dynamicFormGroup.controls['password']?.value
    );
  }

  buildForm() {
    const formGroupFields: any = this.formsService.getFormGroupFields(
      this.fields,
      this.model,
    );

    if (formGroupFields.repeatPassword) {
      this.isSignup = true;
    }

    this.dynamicFormGroup = new FormGroup(formGroupFields);
  }
}
