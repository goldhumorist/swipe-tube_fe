import { FormGroup, FormGroupDirective } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent implements OnInit {
  constructor(private formgroupDirective: FormGroupDirective) {}
  @Input() field: any;
  formName: FormGroup;
  ngOnInit(): void {
    this.formName = this.formgroupDirective.control;
  }
}
