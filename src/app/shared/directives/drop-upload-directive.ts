import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDropUpload]',
})
export class DropUploadDirective {
  // The directive emits a `fileDrop` event
  // with the list of files dropped on the element
  // as an JS array of `File` objects.
  @Output('appDropUpload') fileDrop = new EventEmitter<File>();

  // Disable dropping on the body of the document.
  // This prevents the browser from loading the dropped files
  // using it's default behaviour if the user misses the drop zone.
  // Set this input to false if you want the browser default behaviour.
  @Input() preventBodyDrop = true;

  // The `drop-zone-active` class is applied to the host
  // element when a drag is currently over the target.
  @HostBinding('class.drop-zone-active')
  active = false;

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    this.active = false;

    const { dataTransfer } = event;

    if (dataTransfer?.items) {
      const file = dataTransfer.items[0];
      // If dropped items aren't files, reject them
      if (file && file.kind === 'file') {
        dataTransfer?.items.clear();
        this.fileDrop.emit(file.getAsFile() as File);
      }
    } else {
      dataTransfer?.clearData();
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.active = true;
  }
  // TODO:add effects on drag events
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.active = false;
  }

  @HostListener('body:dragover', ['$event'])
  onBodyDragOver(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  @HostListener('body:drop', ['$event'])
  onBodyDrop(event: DragEvent) {
    if (this.preventBodyDrop) {
      event.preventDefault();
    }
  }
}
