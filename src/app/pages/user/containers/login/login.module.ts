import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/';
import { FeaturesModule } from './../../../../features/';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FeaturesModule,
    ReactiveFormsModule,
    LoginRouting,
    SharedModule,
  ],
})
export class LoginModule {}
