import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FeaturesModule } from 'src/app/features';
import { DumpUser, UserModule, UserService } from 'src/app/features/user';
import { SignupComponent } from './signup.component';
import { SignupRouting } from './signup.routing';
import { FormsService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared';
import { UiModule } from 'src/app/core';
import { HttpClient } from '@angular/common/http';
import { UserApi } from 'src/app/features/user/api/user.api';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    FeaturesModule,
    UserModule,
    ReactiveFormsModule,
    UiModule,
    SignupRouting,
    SharedModule,
  ],
  providers: [FormsService, DumpUser, HttpClient, UserService, UserApi],
})
export class SignupModule {}
