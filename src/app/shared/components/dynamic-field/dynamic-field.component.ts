import {
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { DynamicCheckboxComponent } from './dynamic-checkbox/dynamic-checkbox.component';
import { DynamicInputComponent } from './dynamic-input/dynamic-input.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.scss'],
})
export class DynamicFieldComponent implements AfterViewInit {
  formName: FormGroup;

  supportedDynamicComponents = [
    {
      type: 'text',
      component: DynamicInputComponent,
    },
    {
      type: 'number',
      component: DynamicInputComponent,
    },
    {
      type: 'date',
      component: DynamicInputComponent,
    },
    {
      type: 'checkbox',
      component: DynamicCheckboxComponent,
    },
  ];

  @Input() field: any;

  @ViewChild('dynamicInputContainer', { read: ViewContainerRef })
  dynamicInputContainer!: ViewContainerRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.registerDynamicField();
  }

  private registerDynamicField(): void {
    this.dynamicInputContainer.clear();

    const componentInstance = this.getSupportedComponent(this.field.type);
    const dynamicComponent =
      this.dynamicInputContainer.createComponent(componentInstance);

    dynamicComponent.setInput('field', this.field);

    this.cd.detectChanges();
  }

  getSupportedComponent(type: string) {
    const dynamicComponent = this.supportedDynamicComponents.find(
      component => component.type === type,
    );
    return dynamicComponent?.component || DynamicInputComponent;
  }
}
