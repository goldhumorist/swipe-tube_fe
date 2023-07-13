export type IUploadVideo = FormData;

export interface IUploadVideoResponse {
  videoUrlPath: string;
  thumbnailUrlPath: string;
  description?: string | null;
}

export interface IVideoPagination {
  page: number;
  pageSize: number;
  totalRows: number;
}

export interface IVideo {
  videoUrlPath: string;
  thumbnailUrlPath: string;
  description?: string;
}

export interface IUserVideosResponse {
  pagination: IVideoPagination;
  videos: Array<IVideo>;
}

export interface ILoadUserVideosParams {
  page: number;
  limit: number;
}
