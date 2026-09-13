import { HERO_SLIDES } from './slidesData';
import { HeroSlideItem } from './types';

export * from './types';
export * from './slidesData';

const STORAGE_KEY = 'arps_hero_custom_slides_v1';

/**
 * Returns all slides (from local storage if customized, or default HERO_SLIDES).
 */
export function getAllHeroSlides(): HeroSlideItem[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as HeroSlideItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore storage parsing error
    }
  }
  return HERO_SLIDES;
}

/**
 * Returns all slides that are marked active, sorted by their order property.
 */
export function getActiveHeroSlides(): HeroSlideItem[] {
  return getAllHeroSlides()
    .filter((slide) => slide.active !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/**
 * Retrieve a specific slide by its ID.
 */
export function getHeroSlideById(id: string): HeroSlideItem | undefined {
  return getAllHeroSlides().find((slide) => slide.id === id);
}

/**
 * Total active slide count.
 */
export function getActiveSlideCount(): number {
  return getActiveHeroSlides().length;
}

/**
 * Save customized slides list (e.g. uploaded images or caption updates).
 */
export function saveCustomHeroSlides(slides: HeroSlideItem[]): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
      window.dispatchEvent(new CustomEvent('arps_hero_slides_updated'));
    } catch (e) {
      console.error('Failed to save hero slides to localStorage:', e);
    }
  }
}

/**
 * Reset all slides back to the codebase defaults.
 */
export function resetHeroSlidesToDefault(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('arps_hero_slides_updated'));
    } catch {
      // ignore
    }
  }
}
