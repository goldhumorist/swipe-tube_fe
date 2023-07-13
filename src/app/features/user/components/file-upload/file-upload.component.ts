import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ALLOWED_IMAGE_FILE_TYPES,
  ALLOWED_VIDEO_FILE_TYPES,
  AllowedFormats,
} from '../../enums';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/core';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnChanges {
  fileName = '';
  isFileTypeValid: boolean;
  faDownload = faDownload;
  isFileSelected: boolean;

  constructor(private notifier: NotificationService) {}

  @Input() isUploadDisabled = false;

  @Input() uploadText: string;

  @Input() format: string;

  @Input() showCircle = false;

  @Output() formDataEmitter: EventEmitter<FormData> =
    new EventEmitter<FormData>();

  @ViewChild('fileUpload')
  fileUploadInput: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    const isUploadCanceled =
      changes['isUploadDisabled'] &&
      !changes['isUploadDisabled'].currentValue &&
      this.fileUploadInput;

    if (isUploadCanceled) {
      this.fileName = '';
      this.fileUploadInput.nativeElement.value = '';
    }
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file: File = inputElement.files?.[0] as File;

    if (file) {
      this.handleFileEmit(file);
    }
  }

  onFileDrop(file: File) {
    this.handleFileEmit(file);
  }

  handleFileEmit(file: File) {
    const formData = new FormData();

    switch (this.format) {
      case AllowedFormats.image:
        if (this.isCorrectFileType(file, ALLOWED_IMAGE_FILE_TYPES)) {
          formData.append('avatarImage', file);

          this.fileName = file.name;

          this.formDataEmitter.emit(formData);
          break;
        }

        this.notifier.showFailedNotification('Wrong format');
        break;

      case AllowedFormats.video:
        if (this.isCorrectFileType(file, ALLOWED_VIDEO_FILE_TYPES)) {
          formData.append('video', file);

          this.fileName = file.name;

          this.formDataEmitter.emit(formData);
          break;
        }

        this.notifier.showFailedNotification('Wrong format');
        break;
    }
  }

  private isCorrectFileType(file: File, allowedTypes: Array<string>) {
    const extension = file.name.split('.')[1].toLowerCase();

    return allowedTypes.includes(extension.toLowerCase());
  }
}
