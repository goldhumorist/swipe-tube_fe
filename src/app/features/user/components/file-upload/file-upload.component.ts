import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsService } from 'src/app/core/services';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  fileName = '';
  isFileTypeValid: boolean;

  @Input() fileType: string;

  @Output() formDataEmitter: EventEmitter<FormData> =
    new EventEmitter<FormData>();

  constructor(private formsService: FormsService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (this.formsService.requiredFileType(file, this.fileType)) {
      this.fileName = file.name;
      const formData = new FormData();

      formData.append('avatarImage', file);

      this.formDataEmitter.emit(formData);
    }
  }
}
