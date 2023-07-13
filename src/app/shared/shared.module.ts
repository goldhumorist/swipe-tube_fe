import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DynamicErrorComponent,
  DynamicFormComponent,
  DynamicInputComponent,
  DynamicCheckboxComponent,
  DynamicFieldComponent,
  FileUploadComponent,
} from './components';
import { UiModule } from './ui';
import { DropUploadDirective } from './directives/drop-upload-directive';
import { InfinitePaginationDirective } from './directives/infinite-pagination-directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicInputComponent,
    DynamicCheckboxComponent,
    DynamicErrorComponent,
    DropUploadDirective,
    InfinitePaginationDirective,
    FileUploadComponent,
    DynamicFieldComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, UiModule],
  exports: [
    DynamicFormComponent,
    UiModule,
    DropUploadDirective,
    FileUploadComponent,
    InfinitePaginationDirective,
  ],
})
export class SharedModule {}
