import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-video-layout',
  templateUrl: './video-layout.component.html',
  styleUrls: ['./video-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoLayoutComponent {}
