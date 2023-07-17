import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared';
import { FeaturesModule } from '../../../../features';
import { NgModule } from '@angular/core';
import { RecordComponent } from './record.component';
import { RecordRouting } from './record.routing';

@NgModule({
  declarations: [RecordComponent],
  imports: [CommonModule, FeaturesModule, RecordRouting, SharedModule],
})
export class RecordModule {}
