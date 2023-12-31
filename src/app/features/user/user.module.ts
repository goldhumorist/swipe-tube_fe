import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, FontAwesomeModule, SharedModule],
  exports: [UserFormComponent],
})
export class UserModule {}
