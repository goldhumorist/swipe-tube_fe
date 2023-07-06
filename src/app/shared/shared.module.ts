import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DynamicErrorComponent,
  DynamicFormComponent,
  DynamicInputComponent,
  DynamicCheckboxComponent,
  DynamicFieldComponent,
} from './components';
import { UiModule } from './ui';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicInputComponent,
    DynamicCheckboxComponent,
    DynamicErrorComponent,
    DynamicFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, UiModule],
  exports: [DynamicFormComponent, UiModule],
})
export class SharedModule {}
