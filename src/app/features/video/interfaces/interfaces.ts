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

export interface ISwipeVideoStatistic {
  views?: number;
  likes?: number;
}

export interface IVideo {
  videoUrlPath: string;
  thumbnailUrlPath: string;
  description?: string;
}

export interface ISwipeVideo {
  videoId: number;
  videoUrlPath: string;
  thumbnailUrlPath: string;
  description?: string;
  isPlaying?: boolean;
  statistic: ISwipeVideoStatistic;
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
  videos: Array<ISwipeVideo>;
}

export type ISwipeFormatedVideosResponse = Array<ISwipeVideo>;

export interface ISwipeVideosParams {
  page: number;
  mainLimit: number;
  itemLimit: number;
}
