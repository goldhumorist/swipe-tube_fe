import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { IVideo } from '../../interfaces';
import { environment } from 'src/environments/environment';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.scss'],
})
export class ModalPlayerComponent {
  @Input() videoItem: IVideo;
  @Output() modalCloseEmitter = new EventEmitter<void>();

  public faClose = faClose;

  formVideoPath = (videoKey: string): string =>
    `${environment.baseContentUrl}/${videoKey}`;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.modalCloseEmitter.emit();
  }
  onCrossClick() {
    this.modalCloseEmitter.emit();
  }
}
