import { IDynamicFormGroup } from '../../../../shared/interfaces/';
import { ILoginData, UserService } from '../../../../features/user';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PATH_TO_SIGNUP } from './../../../../core/enums/app-route.enum';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  model: IDynamicFormGroup<unknown> = {
    email: {
      type: 'text',
      value: '',
      label: 'Email',
      rules: {
        required: true,
        email: true,
      },
    },
    password: {
      type: 'password',
      value: '',
      label: 'Password',
      rules: {
        required: true,
        password: true,
        minLength: true,
      },
    },
  };

  constructor(private readonly userService: UserService) {}

  isLoading$ = this.userService.isLoading$;

  signupPageLink = PATH_TO_SIGNUP;

  onSubmit(loginFormGroup: FormGroup): void {
    const loginData: ILoginData = { data: loginFormGroup.value };

    this.userService.login(loginData);
  }
}
