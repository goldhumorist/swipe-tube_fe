import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './components';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [UserFormComponent, FileUploadComponent],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [UserFormComponent, FileUploadComponent],
})
export class UserModule {}
