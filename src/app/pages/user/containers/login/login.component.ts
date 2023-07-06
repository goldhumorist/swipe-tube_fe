import { IDynamicFormGroup } from '../../../../shared/interfaces/';
import { ILoginData, UserService } from '../../../../features/user';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  AppRouteEnum,
  UserRouteEnum,
} from './../../../../core/enums/app-route.enum';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
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

  destroy$: Subject<boolean> = new Subject<boolean>();

  signupPageLink = `${AppRouteEnum.User}/${UserRouteEnum.Signup}`;

  constructor(private readonly userService: UserService) {}

  onSubmit(loginFormGroup: FormGroup): void {
    const loginData: ILoginData = loginFormGroup.value;
    console.log('loginData', loginData);

    this.userService
      .login(loginData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // TODO redirect to main page(video)
          console.log('Login success');
        },
        complete: () => {
          console.log('Login complete');
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
