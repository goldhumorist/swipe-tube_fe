import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notifier: NotifierService) {}

  showSuccessNotification = (message: string) => {
    this.notifier.notify('success', message);
  };

  showFailedNotification = (message: string) => {
    this.notifier.notify('error', message);
  };

  showWarningNotification = (message: string) => {
    this.notifier.notify('warning', message);
  };
}
