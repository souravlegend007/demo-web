export type PhotoCategory =
  | 'All'
  | 'Campus'
  | 'Events'
  | 'Sports'
  | 'Laboratories'
  | 'Activities'
  | 'Ceremonial'
  | 'Cultural'
  | 'NCC'
  | 'Leadership';

export type VideoCategory =
  | 'All'
  | 'Events'
  | 'Ceremonial'
  | 'Sports'
  | 'Campus Tour'
  | 'Academics';

export interface PhotoItem {
  id: string;
  title: string;
  category: PhotoCategory;
  imageUrl: string;
  localPath?: string;
  date: string;
  description: string;
  tags?: string[];
  featured?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  videoUrl: string;
  thumbnailUrl: string;
  localPath?: string;
  duration: string;
  date: string;
  description: string;
  type: 'youtube' | 'mp4' | 'embed';
  tags?: string[];
  featured?: boolean;
}

export interface MediaCategoryInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
}
