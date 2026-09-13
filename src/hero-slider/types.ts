export interface HeroSlideItem {
  /** Unique ID for the slide */
  id: string;
  /** Slide Title / Headline shown in bold */
  title: string;
  /** Sub-badge or category (e.g., Campus Grounds, Science Facilities) */
  category?: string;
  /** Primary image source (can be a local file path like './hero-slider/slide-1.jpg' or a web URL) */
  image: string;
  /** Optional fallback image URL if local image fails to load */
  fallbackImage?: string;
  /** Whether the slide is enabled in the carousel */
  active?: boolean;
  /** Display order (lower numbers show first) */
  order?: number;
  /** Optional subtitle or description */
  description?: string;
}
