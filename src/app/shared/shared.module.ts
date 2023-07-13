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
import { DropUploadDirective } from './directives/drop-upload-directive';
import { InfinitePaginationDirective } from './directives/infinite-pagination-directive';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicInputComponent,
    DynamicCheckboxComponent,
    DynamicErrorComponent,
    DropUploadDirective,
    InfinitePaginationDirective,
    DynamicFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, UiModule],
  exports: [
    DynamicFormComponent,
    UiModule,
    DropUploadDirective,
    InfinitePaginationDirective,
  ],
})
export class SharedModule {}
