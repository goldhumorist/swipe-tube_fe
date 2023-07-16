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
  HeaderComponent,
  NavigationMenuComponent,
} from './components';
import { UiModule } from './ui';
import { DropUploadDirective, InfinitePaginationDirective } from './directives';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

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
    NavigationMenuComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    UiModule,
    RouterModule,
  ],
  exports: [
    DynamicFormComponent,
    UiModule,
    DropUploadDirective,
    FileUploadComponent,
    InfinitePaginationDirective,
    HeaderComponent,
  ],
})
export class SharedModule {}
