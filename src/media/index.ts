/**
 * ARPS Agartala Media Manager
 * Central registry for all school photos and videos.
 */
import { PhotoItem, VideoItem, PhotoCategory, VideoCategory } from './mediaTypes';
import { PHOTOS_DATA } from './photosData';
import { VIDEOS_DATA } from './videosData';

export * from './mediaTypes';
export * from './photosData';
export * from './videosData';

// Photo Query Helpers
export function getAllPhotos(): PhotoItem[] {
  return PHOTOS_DATA;
}

export function getFeaturedPhotos(): PhotoItem[] {
  return PHOTOS_DATA.filter((p) => p.featured);
}

export function getPhotosByCategory(category: PhotoCategory): PhotoItem[] {
  if (category === 'All') return PHOTOS_DATA;
  return PHOTOS_DATA.filter((p) => p.category === category);
}

// Video Query Helpers
export function getAllVideos(): VideoItem[] {
  return VIDEOS_DATA;
}

export function getFeaturedVideos(): VideoItem[] {
  return VIDEOS_DATA.filter((v) => v.featured);
}

export function getVideosByCategory(category: VideoCategory): VideoItem[] {
  if (category === 'All') return VIDEOS_DATA;
  return VIDEOS_DATA.filter((v) => v.category === category);
}

// Search across both photos and videos
export function searchMedia(query: string): {
  photos: PhotoItem[];
  videos: VideoItem[];
} {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { photos: PHOTOS_DATA, videos: VIDEOS_DATA };
  }
  const photos = PHOTOS_DATA.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
  );
  const videos = VIDEOS_DATA.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.description.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.tags?.some((t) => t.toLowerCase().includes(q))
  );
  return { photos, videos };
}
