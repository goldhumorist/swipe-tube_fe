import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal-overlay',
  templateUrl: './modal-overlay.component.html',
  styleUrls: ['./modal-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalOverlayComponent {}
