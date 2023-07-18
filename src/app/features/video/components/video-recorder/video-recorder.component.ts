import {
  MaxRecordingVideoDuration,
  MaxVideoDurationText,
  MinRecordingVideoDuration,
  MinRecordingVideoDurationText,
} from './../../enums';
import { Subject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { NotificationService } from 'src/app/core';

@Component({
  selector: 'app-video-recorder',
  templateUrl: './video-recorder.component.html',
  styleUrls: ['./video-recorder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoRecorderComponent implements OnDestroy {
  @Output() videoEmitter = new EventEmitter<Blob>();

  @ViewChild('video') videoElement: ElementRef;

  recordingParams = {
    isCameraOpen: false,
    isStartRecordingAvailable: false,
    isRecording: false,
    isStopRecordingAvailable: false,
    isCameraLoading$: new Subject<boolean>(),
  };
  maxVideoDurationText = MaxVideoDurationText;
  maxVideoDurationTimeout: ReturnType<typeof setTimeout>;
  minVideoDurationText = MinRecordingVideoDurationText;

  recordedVideoUrl: string | null;
  recordedVideoBlob: Blob | null;

  mediaRecorder: MediaRecorder;
  videoChunks: Blob[] = [];

  constructor(
    private notifier: NotificationService,
    private cd: ChangeDetectorRef,
  ) {}

  async toggleCamera() {
    if (this.recordingParams.isCameraOpen) {
      this.resetCameraFlow();
      return;
    }

    this.recordingParams.isCameraLoading$.next(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.videoElement.nativeElement.srcObject = stream;

      this.recordingParams.isCameraOpen = true;
      this.recordingParams.isStartRecordingAvailable = true;
    } catch (error) {
      this.notifier.showFailedNotification('Error accessing camera');
    } finally {
      this.recordingParams.isCameraLoading$.next(false);
    }
  }

  startRecording() {
    if (this.recordingParams.isStartRecordingAvailable) {
      this.recordingParams.isStartRecordingAvailable = false;

      const videoStream = this.videoElement.nativeElement.srcObject;
      this.mediaRecorder = new MediaRecorder(videoStream);

      this.mediaRecorder.addEventListener(
        'dataavailable',
        this.recordingStartCallback.bind(this),
      );

      this.mediaRecorder.addEventListener(
        'stop',
        this.recordingStopCallback.bind(this),
      );

      this.mediaRecorder.start();
      this.recordingParams.isRecording = true;

      this.maxVideoDurationTimeout = setTimeout(() => {
        this.stopRecording();

        this.notifier.showWarningNotification(
          `Please be attentive max video duration is - ${this.maxVideoDurationText}`,
        );
      }, MaxRecordingVideoDuration);

      setTimeout(() => {
        this.recordingParams.isStopRecordingAvailable = true;
        this.cd.detectChanges();
      }, MinRecordingVideoDuration);

      return;
    }
    this.notifier.showWarningNotification('Turn on your camera please ;)');
  }

  stopRecording() {
    if (this.mediaRecorder) {
      clearTimeout(this.maxVideoDurationTimeout);

      this.mediaRecorder.stop();

      this.mediaRecorder.removeEventListener(
        'dataavailable',
        this.recordingStartCallback.bind(this),
      );

      this.mediaRecorder.removeEventListener(
        'stop',
        this.recordingStopCallback.bind(this),
      );

      this.recordingParams.isStopRecordingAvailable = false;
    }
  }

  uploadRecordedVideo() {
    this.videoEmitter.emit(this.recordedVideoBlob as Blob);
    this.recordedVideoBlob = null;
    this.recordedVideoUrl = null;
  }

  deleteRecordedVideo() {
    this.recordedVideoBlob = null;
    this.recordedVideoUrl = null;
  }

  private recordingStartCallback(event: BlobEvent) {
    if (event.data.size > 0) this.videoChunks.push(event.data);
  }

  private recordingStopCallback() {
    this.recordedVideoBlob = new Blob(this.videoChunks, { type: 'video/mp4' });
    this.recordedVideoUrl = URL.createObjectURL(this.recordedVideoBlob);

    this.resetCameraFlow();
    this.cd.detectChanges();
  }

  private resetCameraFlow() {
    const stream: MediaStream = this.videoElement?.nativeElement?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());

    this.videoChunks = [];
    this.videoElement.nativeElement.srcObject = null;
    this.recordingParams.isCameraOpen = false;
    this.recordingParams.isStartRecordingAvailable = false;
    this.recordingParams.isRecording = false;
  }

  ngOnDestroy(): void {
    this.resetCameraFlow();
  }
}
