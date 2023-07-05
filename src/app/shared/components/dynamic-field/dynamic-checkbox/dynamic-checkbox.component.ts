import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-checkbox',
  templateUrl: './dynamic-checkbox.component.html',
  styleUrls: ['./dynamic-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCheckboxComponent {
  @Input() field: any;
  formName: FormGroup;
}
