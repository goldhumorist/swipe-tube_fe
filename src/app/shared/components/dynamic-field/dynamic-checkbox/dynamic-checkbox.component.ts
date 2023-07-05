import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['./dynamic-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCheckboxComponent {
  formName: FormGroup;

  @Input() field: any;
}
