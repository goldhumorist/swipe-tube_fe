import { UserService } from '../../../../features/user/service/user.service';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DumpUserService } from 'src/app/features/user';
import { IDynamicFormGroup } from 'src/app/shared';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
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
  userFormData: FormData = new FormData();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly dumpUserService: DumpUserService,
    private readonly userService: UserService,
  ) {}

  onAvatarUpload(avatarFormData: FormData): void {
    for (const key of avatarFormData.keys()) {
      const avatarFormDataField = avatarFormData.get(key);

      if (avatarFormDataField)
        this.userFormData.append(key, avatarFormDataField);
    }
  }

  onSubmit(formGroup: FormGroup): void {
    const dumpedUser = this.dumpUserService.dumbSignupUser(formGroup.value);

    for (const [key, val] of Object.entries(dumpedUser)) {
      this.userFormData.append(key, val);
    }
    this.userService
      .signup(this.userFormData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.userFormData = new FormData();
          // TODO:relocate to main page(video)
        },
        complete: () => {
          this.userFormData = new FormData();
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
