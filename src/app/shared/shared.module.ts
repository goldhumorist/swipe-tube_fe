import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsService } from '../core/services';
import { DynamicErrorComponent, DynamicFormComponent } from './components';
import {
  DynamicCheckboxComponent,
  DynamicInputComponent,
} from './components/dynamic-field';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { UiModule } from '../core';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicInputComponent,
    DynamicCheckboxComponent,
    DynamicErrorComponent,
    DynamicFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, UiModule],
  exports: [DynamicFormComponent],
  providers: [FormsService],
})
export class SharedModule {}
