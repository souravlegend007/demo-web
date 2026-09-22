import { PhotoItem, VideoItem } from './mediaTypes';
import { PHOTOS_DATA } from './photosData';
import { VIDEOS_DATA } from './videosData';

const PHOTOS_STORAGE_KEY = 'arps_live_photos_gallery_v2';
const VIDEOS_STORAGE_KEY = 'arps_live_videos_media_v2';
export const MEDIA_UPDATED_EVENT = 'arps_media_store_updated';

function notifyMediaUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(MEDIA_UPDATED_EVENT));
  }
}

// ----------------- PHOTOS / IMAGES -----------------
export function getLivePhotos(): PhotoItem[] {
  if (typeof window === 'undefined') {
    return PHOTOS_DATA;
  }
  try {
    const raw = localStorage.getItem(PHOTOS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(PHOTOS_DATA));
      return PHOTOS_DATA;
    }
    const parsed: PhotoItem[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PHOTOS_DATA;
  } catch (err) {
    console.error('Failed to parse live photos from storage:', err);
    return PHOTOS_DATA;
  }
}

export function saveLivePhoto(data: Omit<PhotoItem, 'id'> & { id?: string }): PhotoItem[] {
  const current = getLivePhotos();
  const id = data.id || `photo-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newPhoto: PhotoItem = {
    ...data,
    id,
    date: data.date || new Date().toISOString().split('T')[0],
  };

  const updated = [newPhoto, ...current];
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(updated));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to save photo to localStorage:', e);
  }
  return updated;
}

export function updateLivePhoto(updatedPhoto: PhotoItem): PhotoItem[] {
  const current = getLivePhotos();
  const updated = current.map((p) => (p.id === updatedPhoto.id ? { ...p, ...updatedPhoto } : p));
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(updated));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to update photo in localStorage:', e);
  }
  return updated;
}

export function deleteLivePhoto(id: string): PhotoItem[] {
  const current = getLivePhotos();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(updated));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to delete photo from localStorage:', e);
  }
  return updated;
}

export function resetPhotosToDefaults(): PhotoItem[] {
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(PHOTOS_DATA));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to reset photos in localStorage:', e);
  }
  return PHOTOS_DATA;
}

// ----------------- VIDEOS -----------------
export function getLiveVideos(): VideoItem[] {
  if (typeof window === 'undefined') {
    return VIDEOS_DATA;
  }
  try {
    const raw = localStorage.getItem(VIDEOS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(VIDEOS_DATA));
      return VIDEOS_DATA;
    }
    const parsed: VideoItem[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : VIDEOS_DATA;
  } catch (err) {
    console.error('Failed to parse live videos from storage:', err);
    return VIDEOS_DATA;
  }
}

export function saveLiveVideo(data: Omit<VideoItem, 'id'> & { id?: string }): VideoItem[] {
  const current = getLiveVideos();
  const id = data.id || `vid-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newVideo: VideoItem = {
    ...data,
    id,
    date: data.date || new Date().toISOString().split('T')[0],
  };

  const updated = [newVideo, ...current];
  try {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(updated));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to save video to localStorage:', e);
  }
  return updated;
}

export function updateLiveVideo(updatedVideo: VideoItem): VideoItem[] {
  const current = getLiveVideos();
  const updated = current.map((v) => (v.id === updatedVideo.id ? { ...v, ...updatedVideo } : v));
  try {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(updated));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to update video in localStorage:', e);
  }
  return updated;
}

export function deleteLiveVideo(id: string): VideoItem[] {
  const current = getLiveVideos();
  const updated = current.filter((v) => v.id !== id);
  try {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(updated));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to delete video from localStorage:', e);
  }
  return updated;
}

export function resetVideosToDefaults(): VideoItem[] {
  try {
    localStorage.setItem(VIDEOS_STORAGE_KEY, JSON.stringify(VIDEOS_DATA));
    notifyMediaUpdated();
  } catch (e) {
    console.error('Failed to reset videos in localStorage:', e);
  }
  return VIDEOS_DATA;
}
