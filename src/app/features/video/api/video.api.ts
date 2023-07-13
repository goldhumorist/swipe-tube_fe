import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core';
import { VideoApiPath } from '../enums';
import { IMyVideosParams, IMyVideosResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoApi {
  constructor(private apiService: ApiService) {}

  private basePath = VideoApiPath.basicVideoPath;

  public upload(videoData: FormData): Observable<FormData> {
    return this.apiService.post<FormData>(`${this.basePath}/upload`, videoData);
  }
  public myVideos(videoParams: IMyVideosParams): Observable<IMyVideosResponse> {
    const queryParams = new HttpParams()
      .append('page', videoParams.page)
      .append('limit', videoParams.limit);

    return this.apiService.get<IMyVideosResponse>(
      `${this.basePath}/my-videos`,
      {
        params: queryParams,
      },
    );
  }
}
