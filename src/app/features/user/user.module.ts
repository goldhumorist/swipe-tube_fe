import { NgModule } from '@angular/core';
import { UserFormComponent } from './components';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [UserFormComponent, FileUploadComponent],
  exports: [UserFormComponent, FileUploadComponent],
})
export class UserModule {}
