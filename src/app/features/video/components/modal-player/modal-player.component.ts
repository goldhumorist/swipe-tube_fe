import {
  ChangeDetectionStrategy,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPlayerComponent {
  @Input() videoItem: IVideo;
  @Output() modalCloseEmitter = new EventEmitter<void>();

  public faClose = faClose;

  formVideoUrl = (videoKey: string): string =>
    `${environment.baseContentUrl}/${videoKey}`;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.modalCloseEmitter.emit();
  }

  onClose() {
    this.modalCloseEmitter.emit();
  }

  onVideoClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
