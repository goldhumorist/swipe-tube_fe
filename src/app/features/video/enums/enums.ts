export enum VideoApiPath {
  basicVideoPath = '/api/v1/video',
}
export enum VideoProfilePagination {
  startPage = 1,
  limit = 15,
}

export const MaxRecordingVideoDuration = 1000 * 60 * 2; // 2 minutes
export const MaxVideoDurationText = '2 minutes';
export const MinRecordingVideoDuration = 5000; // 5 seconds
export const MinRecordingVideoDurationText = '5 seconds';
