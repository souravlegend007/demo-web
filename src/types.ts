export type UserCategory = 'Officers' | 'JCOs/WOs' | 'OR' | 'Civilians';

export interface FeeItem {
  classLevel: string;
  categoryFees: Record<UserCategory, number>;
  annualCharges: number;
  examFee: number;
}

export interface AdmissionFeeRow {
  category: UserCategory;
  amount: number;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academics' | 'Recruitment' | 'Examinations' | 'Notice' | 'Admissions';
  date: string;
  department: string;
  location: string;
  description: string;
  fileUrl?: string;
  isUrgent?: boolean;
  isNew?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  year: string;
  time?: string;
  description: string;
  category: string;
  venue: string;
}

export interface Facility {
  id: string;
  name: string;
  category: 'Laboratories' | 'Library' | 'Sports' | 'NCC' | 'Medical' | 'Music & Arts';
  description: string;
  features: string[];
  imageUrl: string;
  highlights: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  designation?: string;
  dateOfJoining?: string;
  department?: string;
  subject?: string;
  subjectTaught?: string;
  qualification: string;
  experience?: string;
  category: 'Teaching' | 'Administration' | 'PGT' | 'TGT' | 'PRT' | 'Activity & Sports' | 'Support Staff' | string;
  image: string;
  photo?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Events' | 'Sports' | 'Laboratories' | 'Activities' | 'Ceremonial' | 'Cultural' | 'NCC' | 'Leadership' | string;
  imageUrl: string;
  url?: string;
  date?: string;
  description: string;
  localPath?: string;
  tags?: string[];
  featured?: boolean;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface TransferCertificateRecord {
  admissionNo: string;
  studentName: string;
  fatherName: string;
  motherName?: string;
  dob: string;
  classLeaving: string;
  issueDate: string;
  tcNumber: string;
  status: 'Verified' | 'Issued' | 'Archived';
  reason: string;
}
