import { Subject } from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NotificationService } from 'src/app/core';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss'],
})
export class VideoRecorderComponent {
  @ViewChild('video') videoElement: ElementRef;

  isCameraLoading$ = new Subject<boolean>();

  isCameraOpen = false;

  isRecording = false;

  @Output() videoEmitter = new EventEmitter<Blob>();

  constructor(private notifier: NotificationService) {}

  mediaRecorder: MediaRecorder;

  videoChunks: Blob[] = [];

  toggleCamera() {
    this.isCameraLoading$.next(true);

    if (!this.isCameraOpen) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          this.videoElement.nativeElement.srcObject = stream;

          this.isCameraOpen = true;
        })
        .catch(() => {
          this.notifier.showFailedNotification('Error accessing camera');
        })
        .finally(() => {
          this.isCameraLoading$.next(false);
        });
    } else {
      this.resetCameraFlow();

      this.isCameraLoading$.next(false);
    }
  }

  startRecording() {
    if (this.isCameraOpen) {
      const videoStream = this.videoElement.nativeElement.srcObject;

      this.mediaRecorder = new MediaRecorder(videoStream);

      this.mediaRecorder.addEventListener(
        'dataavailable',
        this.mediaStartCb.bind(this),
      );

      this.mediaRecorder.addEventListener('stop', this.mediaStopCb.bind(this));

      this.mediaRecorder.start();

      this.isRecording = true;
    } else {
      this.notifier.showWarningNotification('Turn on your camera please ;)');
    }
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();

      this.resetCameraFlow();

      this.mediaRecorder.removeEventListener(
        'dataavailable',
        this.mediaStartCb.bind(this),
      );

      this.mediaRecorder.removeEventListener(
        'stop',
        this.mediaStopCb.bind(this),
      );
    }
  }

  private mediaStartCb(event: BlobEvent) {
    if (event.data.size > 0) {
      this.videoChunks.push(event.data);
    }
  }

  private mediaStopCb() {
    const videoBlob = new Blob(this.videoChunks, { type: 'video/mp4' });

    this.videoChunks = [];

    this.videoEmitter.emit(videoBlob);
  }

  private resetCameraFlow() {
    const stream: MediaStream = this.videoElement?.nativeElement?.srcObject;

    const tracks = stream?.getTracks();

    tracks.forEach(track => track.stop());

    this.videoElement.nativeElement.srcObject = null;

    this.isCameraOpen = false;

    this.isRecording = false;
  }
}
