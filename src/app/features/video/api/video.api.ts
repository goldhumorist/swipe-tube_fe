import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { VideoApiPath } from '../enums';
import {
  ILoadUserVideosParams,
  IUploadVideo,
  IUploadVideoResponse,
  IUserVideosResponse,
} from '../interfaces';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoApi {
  constructor(private apiService: ApiService) {}

  private basePath = VideoApiPath.basicVideoPath;

  public uploadVideo(data: IUploadVideo): Observable<IUploadVideoResponse> {
    return this.apiService.post<IUploadVideoResponse>(
      `${this.basePath}/upload`,
      data,
    );
  }

  public loadUserVideos(
    params: ILoadUserVideosParams,
  ): Observable<IUserVideosResponse> {
    const { page, limit } = params;

    const queryParams = new HttpParams()
      .append('page', page)
      .append('limit', limit);

    return this.apiService.get<IUserVideosResponse>(
      `${this.basePath}/my-videos`,
      {
        params: queryParams,
      },
    );
  }
}
