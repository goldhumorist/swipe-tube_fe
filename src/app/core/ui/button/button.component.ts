import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() text = 'click';

  @Input() isDisabled = false;

  @Input() type = 'button';

  onClick() {
    this.btnClick.emit();
  }
}
