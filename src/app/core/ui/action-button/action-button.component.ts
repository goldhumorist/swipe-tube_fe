import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {
  public btnText: string;

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  set text(name: string) {
    this.btnText = name;
  }
  get name(): string {
    return this.btnText;
  }

  @Input() isDisabled = false;
  @Input() type = 'button';

  onClick() {
    this.btnClick.emit();
  }
}
