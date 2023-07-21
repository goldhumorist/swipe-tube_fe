import { VideoReactionEnum } from '../enums';

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
  dislikes?: number;
}

export interface ISwipeVideoMeta {
  isViewed: boolean;
  isLiked: boolean;
  isDisliked: boolean;
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
  metaData: ISwipeVideoMeta;
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

export interface IUpdateVideoReactionData {
  videoId: number;
  reaction: VideoReactionEnum;
}

export interface IUpdateVideoReactionResponse {
  userId: number;
  videoId: number;
  statistic: {
    likes: number;
    dislikes: number;
  };
  metaData: {
    isLiked: boolean;
    isDisliked: boolean;
  };
}
