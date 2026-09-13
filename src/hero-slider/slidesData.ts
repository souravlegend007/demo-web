import { HeroSlideItem } from './types';

/**
 * ====================================================================
 * HERO SLIDER IMAGE MANAGER
 * ====================================================================
 * To add, change, or remove images in the Hero Slider:
 * 
 * 1. Put your image files in the `public/hero-slider/` (or `hero-slider/`) folder:
 *    Example: `slide-1.jpg`, `slide-2.jpg`, `annual-day.jpg`, etc.
 * 
 * 2. Update the list below:
 *    - `title`: The headline displayed on the slide.
 *    - `category`: Badge category (e.g. 'Campus Grounds', 'NCC Drill').
 *    - `image`: Relative path (e.g., './hero-slider/slide-1.jpg') or absolute ('/hero-slider/slide-1.jpg').
 *    - `fallbackImage`: Remote web backup image if the local file isn't uploaded yet.
 *    - `active`: Set to `false` to temporarily hide a slide without deleting it.
 * ====================================================================
 */

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-1',
    title: 'Morning Assembly & Solemn School Pledge',
    category: 'Assembly & Discipline',
    image: './hero-slider/slide-1.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=85',
    active: true,
    order: 1,
    description: 'Students and faculty uniting every morning for prayer, discipline, and character pledge at ARPS Agartala',
  },
  {
    id: 'slide-2',
    title: 'Northeastern Cultural Dance & Folk Traditions',
    category: 'Cultural Heritage',
    image: './hero-slider/slide-2.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=1600&q=85',
    active: true,
    order: 2,
    description: 'Celebrating the vibrant cultural heritage, folk dances, and performing arts of Tripura and the Northeast',
  },
  {
    id: 'slide-3',
    title: 'Interactive Smart Digital Classroom',
    category: 'Academic Wing',
    image: './hero-slider/slide-3.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80',
    active: true,
    order: 3,
    description: 'Technology-enabled classrooms for experiential learning',
  },
  {
    id: 'slide-4',
    title: 'Assam Rifles NCC Cadets March Past',
    category: 'Military Drill & NCC',
    image: './hero-slider/slide-4.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1579208570378-8c970854bc23?auto=format&fit=crop&w=1400&q=80',
    active: true,
    order: 4,
    description: 'Instilling discipline, patriotism, and courage in young minds',
  },
  {
    id: 'slide-5',
    title: 'Central Library & Reading Repository',
    category: 'Learning Resources',
    image: './hero-slider/slide-5.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80',
    active: true,
    order: 5,
    description: 'Over 8,000 volumes, periodicals, journals, and digital research terminals',
  },
  {
    id: 'slide-6',
    title: 'High-Speed IT & Computer Science Laboratory',
    category: 'Digital Innovation',
    image: './hero-slider/slide-6.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    active: true,
    order: 6,
    description: 'High-speed networking, coding labs, and digital literacy initiatives',
  },
  {
    id: 'slide-7',
    title: 'Inter-School Sports & Athletics Champions',
    category: 'Sports & Athletics',
    image: './hero-slider/slide-7.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80',
    active: true,
    order: 7,
    description: 'State-of-the-art sports pavilion, football grounds, and basketball courts',
  },
  {
    id: 'slide-8',
    title: 'Annual Investiture & Student Council Assembly',
    category: 'Student Leadership',
    image: './hero-slider/slide-8.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
    active: true,
    order: 8,
    description: 'Empowering future leaders with civic responsibility and character',
  },
];
