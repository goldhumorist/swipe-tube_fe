import { IUser } from './../../../../features/user/';
import { IDynamicFormGroup } from './../../../../shared/interfaces';
import { PATH_TO_LOGIN } from './../../../../core/enums/app-route.enum';
import { UserService } from '../../../../features/user/';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
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
    username: {
      type: 'text',
      value: '',
      label: 'Username',
      rules: {
        required: true,
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
    repeatPassword: {
      type: 'password',
      value: '',
      label: 'Repeat password',
    },
  };

  constructor(private readonly userService: UserService) {}

  isLoading$ = this.userService.isLoadingSelector$;

  userFormData: FormData = new FormData();

  loginPageLink = PATH_TO_LOGIN;

  onAvatarUpload(avatarFormData: FormData): void {
    this.resetFormDataAvatar();

    for (const key of avatarFormData.keys()) {
      const newFile = avatarFormData.get(key);

      if (newFile) this.userFormData.append(key, newFile);
    }
  }

  resetFormDataAvatar() {
    const existingFile = this.userFormData.get('avatarImage');

    if (existingFile) {
      this.userFormData.delete('avatarImage');
    }
  }

  onSubmit(formGroup: FormGroup): void {
    const dumpedUser = this.dumpSignupUser(formGroup.value);

    for (const [key, val] of Object.entries(dumpedUser)) {
      this.userFormData.append(key, val);
    }

    this.userService.signup({ data: this.userFormData });

    this.userFormData = new FormData();
  }

  private dumpSignupUser(user: IUser) {
    return {
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }
}
