import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ALLOWED_FILE_TYPES } from '../../enums';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  fileName = '';
  isFileTypeValid: boolean;

  @Output() formDataEmitter: EventEmitter<FormData> =
    new EventEmitter<FormData>();

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file: File = inputElement.files?.[0] as File;

    if (file && this.isCorrectFileType(file)) {
      this.fileName = file.name;
      const formData = new FormData();

      formData.append('avatarImage', file);

      this.formDataEmitter.emit(formData);
    }
  }

  private isCorrectFileType(file: File) {
    const extension = file.name.split('.')[1].toLowerCase();

    return ALLOWED_FILE_TYPES.includes(extension.toLowerCase());
  }
}
