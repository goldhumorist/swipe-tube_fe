import { environment } from 'src/environments/environment';

export enum UserApiPath {
  basicUserPath = '/api/v1/user',
  basicSessionPath = '/api/v1/session',
}

export const ALLOWED_IMAGE_FILE_TYPES = ['jpg', 'png', 'jpeg'];

export const ALLOWED_VIDEO_FILE_TYPES = ['mp4'];

export enum AllowedFormats {
  video = 'video',
  image = 'image',
}

export const DEFAULT_PROFILE_IMAGE_URL = `${environment.baseContentUrl}/default_profile_image.jpg`;
