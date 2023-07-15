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

export interface ISwipeVideo {
  videoUrlPath: string;
  thumbnailUrlPath: string;
  description?: string;
  isPlaying?: boolean;
}

export interface IUserVideosResponse {
  pagination: IVideoPagination;
  videos: Array<IVideo>;
}

export interface ILoadUserVideosParams {
  page: number;
  limit: number;
}

export interface ISwipeVideosResponse {
  pagination: IVideoPagination;
  videos: Array<IVideo>;
}

export type ISwipeFormatedVideosResponse = Array<ISwipeVideo>;

export interface ISwipeVideosParams {
  page: number;
  mainLimit: number;
  itemLimit: number;
}
