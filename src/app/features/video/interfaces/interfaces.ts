export interface IMyVideosResponse {
  pagination: IVideoPagination;
  videos: Array<IVideo>;
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

export interface IMyVideosParams {
  page: number;
  limit: number;
}

export interface IGetUserVideosData {
  page: number;
  limit: number;
}
export interface IUpdateUserVideos {
  page: number;
  limit: number;
}
export interface IUpdateUserVideosResponse {
  page: number;
  limit: number;
}
