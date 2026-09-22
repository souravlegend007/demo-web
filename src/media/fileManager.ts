export interface ManagedFileItem {
  id: string;
  name: string;
  category: 'branding' | 'slides' | 'photos' | 'faculty' | 'documents' | 'uploads';
  subCategory?: string;
  url: string;
  extension: string;
  fileSize?: string;
  dimensions?: string;
  uploadedAt: string;
  description: string;
  suggestedUse: string;
  tags: string[];
  isCustom?: boolean;
}

export const DEFAULT_MANAGED_FILES: ManagedFileItem[] = [
  // Branding
  {
    id: 'brand-logo-png',
    name: 'arps-logo.png',
    category: 'branding',
    subCategory: 'Official Crest',
    url: '/media/branding/arps-logo.png',
    extension: '.png',
    fileSize: '415 KB',
    dimensions: '512x512',
    uploadedAt: '2026-09-01',
    description: 'Official Assam Rifles Public School crest and emblem with transparent background.',
    suggestedUse: 'Main website header, top navigation bar, and official letterheads.',
    tags: ['logo', 'emblem', 'crest', 'official', 'header'],
  },
  {
    id: 'brand-logo-jpg',
    name: 'arps-logo.jpg',
    category: 'branding',
    subCategory: 'Official Crest',
    url: '/media/branding/arps-logo.jpg',
    extension: '.jpg',
    fileSize: '313 KB',
    dimensions: '600x600',
    uploadedAt: '2026-09-01',
    description: 'High-resolution school insignia JPEG format for social previews and print.',
    suggestedUse: 'Footer branding, social media share cards, and document headers.',
    tags: ['logo', 'jpg', 'print', 'footer'],
  },

  // Slides / Banners
  {
    id: 'slide-campus-parade',
    name: 'hero-parade-ground.jpg',
    category: 'slides',
    subCategory: 'Hero Carousel',
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '340 KB',
    dimensions: '1920x1080',
    uploadedAt: '2026-08-15',
    description: 'Majestic school campus building and assembly grounds under clear skies.',
    suggestedUse: 'Homepage Hero Slide #1: Welcoming banner.',
    tags: ['hero', 'slide', 'campus', 'building', 'banner'],
  },
  {
    id: 'slide-ncc-cadets',
    name: 'hero-ncc-drill.jpg',
    category: 'slides',
    subCategory: 'Hero Carousel',
    url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '385 KB',
    dimensions: '1920x1080',
    uploadedAt: '2026-08-15',
    description: 'Disciplined NCC Army Wing cadets during ceremonial march past and drill.',
    suggestedUse: 'Homepage Hero Slide #2: Discipline & Military heritage.',
    tags: ['hero', 'ncc', 'discipline', 'parade', 'drill'],
  },
  {
    id: 'slide-stem-lab',
    name: 'hero-science-laboratory.jpg',
    category: 'slides',
    subCategory: 'Hero Carousel',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1920&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '290 KB',
    dimensions: '1920x1080',
    uploadedAt: '2026-08-15',
    description: 'Students performing practical chemistry and modern physics experiments in lab.',
    suggestedUse: 'Homepage Hero Slide #3: Academic & STEM excellence.',
    tags: ['hero', 'stem', 'science', 'laboratory', 'students'],
  },

  // Photos - Campus & Labs
  {
    id: 'photo-computer-lab',
    name: 'computer-it-lab.jpg',
    category: 'photos',
    subCategory: 'laboratories',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '260 KB',
    dimensions: '1200x800',
    uploadedAt: '2026-07-20',
    description: 'Modern high-speed ICT and Computer Science laboratory with 40+ workstations.',
    suggestedUse: 'Facilities section and infrastructure gallery.',
    tags: ['facilities', 'computer', 'it', 'lab', 'technology'],
  },
  {
    id: 'photo-school-library',
    name: 'central-library-hall.jpg',
    category: 'photos',
    subCategory: 'campus',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '310 KB',
    dimensions: '1200x800',
    uploadedAt: '2026-07-20',
    description: 'School Central Library stocking over 12,000 academic titles, encyclopedias and journals.',
    suggestedUse: 'Facilities tab and student life showcase.',
    tags: ['library', 'books', 'reading', 'campus', 'study'],
  },
  {
    id: 'photo-sports-football',
    name: 'annual-football-tournament.jpg',
    category: 'photos',
    subCategory: 'sports',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '410 KB',
    dimensions: '1200x800',
    uploadedAt: '2026-08-01',
    description: 'Inter-house football tournament at ARPS lush green sports grounds.',
    suggestedUse: 'Sports & Co-curricular activities page.',
    tags: ['sports', 'football', 'athletics', 'houses', 'ground'],
  },

  // Documents & Certificates
  {
    id: 'doc-cbse-disclosure',
    name: 'CBSE-Mandatory-Public-Disclosure.pdf',
    category: 'documents',
    subCategory: 'CBSE Compliance',
    url: '/media/documents/CBSE-Mandatory-Public-Disclosure.pdf',
    extension: '.pdf',
    fileSize: '1.4 MB',
    uploadedAt: '2026-08-20',
    description: 'Official CBSE Appendix IX Mandatory Public Disclosure document with affiliation details.',
    suggestedUse: 'CBSE Mandatory Disclosure modal & footer legal compliance link.',
    tags: ['cbse', 'disclosure', 'appendix-ix', 'affiliation', 'compliance'],
  },
  {
    id: 'doc-admission-prospectus',
    name: 'ARPS-Admission-Prospectus-2026-27.pdf',
    category: 'documents',
    subCategory: 'Admissions',
    url: '/media/documents/ARPS-Admission-Prospectus-2026-27.pdf',
    extension: '.pdf',
    fileSize: '2.8 MB',
    uploadedAt: '2026-08-10',
    description: 'Comprehensive admission guidelines, age criteria, curriculum details, and uniform code.',
    suggestedUse: 'Admission section "Download Prospectus" CTA button.',
    tags: ['admission', 'prospectus', 'guide', 'criteria', 'download'],
  },
  {
    id: 'doc-fee-schedule',
    name: 'Fee-Structure-Schedule-2026-27.pdf',
    category: 'documents',
    subCategory: 'Finance',
    url: '/media/documents/Fee-Structure-Schedule-2026-27.pdf',
    extension: '.pdf',
    fileSize: '420 KB',
    uploadedAt: '2026-08-10',
    description: 'Breakdown of tuition, computer, laboratory, and quarterly fees for AR & civilian categories.',
    suggestedUse: 'Fee Calculator and finance information table.',
    tags: ['fees', 'tuition', 'finance', 'schedule', 'quarterly'],
  },
  {
    id: 'doc-tc-sample',
    name: 'Transfer-Certificate-Format-Sample.pdf',
    category: 'documents',
    subCategory: 'Certificates',
    url: '/media/documents/Transfer-Certificate-Format-Sample.pdf',
    extension: '.pdf',
    fileSize: '310 KB',
    uploadedAt: '2026-07-15',
    description: 'Verified sample copy of ARPS Student Transfer Certificate (TC) signed by Principal.',
    suggestedUse: 'TC Verification portal reference document.',
    tags: ['tc', 'certificate', 'verification', 'transfer', 'format'],
  },

  // Faculty & Leadership
  {
    id: 'faculty-principal',
    name: 'principal-portrait.jpg',
    category: 'faculty',
    subCategory: 'Leadership',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    extension: '.jpg',
    fileSize: '180 KB',
    dimensions: '600x750',
    uploadedAt: '2026-08-01',
    description: 'Principal desk portrait for official greeting and annual message.',
    suggestedUse: 'Leadership messages & About the School section.',
    tags: ['faculty', 'principal', 'leadership', 'message'],
  },
];

const LOCAL_STORAGE_KEY = 'arps_custom_managed_files_v1';

export function getAllManagedFiles(): ManagedFileItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_MANAGED_FILES;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_MANAGED_FILES;
    const parsed: ManagedFileItem[] = JSON.parse(raw);
    return [...DEFAULT_MANAGED_FILES, ...parsed];
  } catch (err) {
    console.error('Failed to load custom files from localStorage:', err);
    return DEFAULT_MANAGED_FILES;
  }
}

export function saveCustomManagedFile(item: Omit<ManagedFileItem, 'id' | 'uploadedAt' | 'isCustom'>): ManagedFileItem {
  const newFile: ManagedFileItem = {
    ...item,
    id: 'custom-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    uploadedAt: new Date().toISOString().split('T')[0],
    isCustom: true,
  };

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing: ManagedFileItem[] = raw ? JSON.parse(raw) : [];
    existing.unshift(newFile);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save file to localStorage:', err);
  }

  return newFile;
}

export function deleteCustomManagedFile(id: string): boolean {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return false;
    const existing: ManagedFileItem[] = JSON.parse(raw);
    const filtered = existing.filter((f) => f.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete file from localStorage:', err);
    return false;
  }
}
