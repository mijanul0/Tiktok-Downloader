export interface Author {
  nickname: string;
  unique_id: string;
  avatar: string;
}

export interface Downloads {
  nowatermark: string;
  nowatermark_hd: string;
  watermark: string;
  music: string;
}

export interface VideoData {
  id: string;
  title: string;
  cover: string;
  duration: number;
  play_count: number;
  digg_count: number;
  comment_count: number;
  share_count: number;
  author: Author;
  downloads: Downloads;
}

export interface AdSettings {
  showAds: boolean;
  topBannerCode: string;
  nativeAdCode: string;
  resultBannerCode: string;
  bottomBannerCode: string;
  smartlinkUrl: string;
}

export interface RapidApiConfig {
  apiKey: string;
  apiHost: string;
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  cover: string;
  authorName: string;
  authorHandle: string;
  downloadUrl: string;
  timestamp: number;
}
