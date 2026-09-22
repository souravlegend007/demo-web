import { FacultyMember } from '../types';

export const INITIAL_STAFF_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Mr. Animesh Acharya',
    role: 'Principal',
    designation: 'Principal & Head of School',
    department: 'School Administration & Leadership',
    qualification: 'M.Sc, M.Ed, PGDEMA',
    experience: '24+ Years with ARPS Agartala',
    dateOfJoining: '2001-04-15',
    subjectTaught: 'Educational Administration & Sciences',
    category: 'Administration',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-2',
    name: 'Mrs. Sharmistha Deb',
    role: 'Vice Principal & PGT English',
    designation: 'Vice Principal & Senior Faculty',
    department: 'Department of Languages',
    qualification: 'M.A (English), B.Ed',
    experience: '18 Years',
    dateOfJoining: '2007-06-10',
    subjectTaught: 'English Core & Literature',
    category: 'PGT',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-3',
    name: 'Dr. Rajesh Bhattacharya',
    role: 'PGT Physics & Science HOD',
    designation: 'Post Graduate Teacher (PGT)',
    department: 'Department of Science',
    qualification: 'M.Sc (Physics), Ph.D, B.Ed',
    experience: '15 Years',
    dateOfJoining: '2010-08-01',
    subjectTaught: 'Physics (Class XI & XII)',
    category: 'PGT',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-4',
    name: 'Mrs. Rupa Chakraborty',
    role: 'PGT Mathematics',
    designation: 'Post Graduate Teacher (PGT)',
    department: 'Department of Mathematics',
    qualification: 'M.Sc (Maths), B.Ed',
    experience: '14 Years',
    dateOfJoining: '2011-05-18',
    subjectTaught: 'Mathematics & Applied Maths',
    category: 'PGT',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-5',
    name: 'Mr. Bikramjit Das',
    role: 'TGT Computer Science & IT',
    designation: 'Trained Graduate Teacher (TGT)',
    department: 'Department of Computer Applications',
    qualification: 'MCA, B.Ed, Certified Python Trainer',
    experience: '10 Years',
    dateOfJoining: '2015-07-01',
    subjectTaught: 'Computer Science, AI & IT Skills',
    category: 'TGT',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-6',
    name: 'Mrs. Pampa Saha',
    role: 'PGT Economics & Humanities HOD',
    designation: 'Post Graduate Teacher (PGT)',
    department: 'Department of Social Sciences',
    qualification: 'M.A (Economics), B.Ed',
    experience: '12 Years',
    dateOfJoining: '2013-09-12',
    subjectTaught: 'Economics & Indian Economic Development',
    category: 'PGT',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-7',
    name: 'Subedar M.K. Sharma',
    role: 'Chief Physical Training Instructor & NCC Officer',
    designation: 'Physical Education Instructor & NCC Officer',
    department: 'Physical Education & NCC Wing',
    qualification: 'Diploma in Physical Training (Army P.E. Corps)',
    experience: '20+ Years Military Service',
    dateOfJoining: '2018-03-20',
    subjectTaught: 'Physical Education, NCC Army Wing & Sports',
    category: 'Activity & Sports',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-8',
    name: 'Mr. Nilmoni Barman',
    role: 'Senior Office Superintendent',
    designation: 'Head of Office Administration',
    department: 'Office Administration & Accounts',
    qualification: 'B.Com, PGDCA',
    experience: '16 Years',
    dateOfJoining: '2009-11-05',
    subjectTaught: 'Institutional Accounts & School Operations',
    category: 'Administration',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-9',
    name: 'Ms. Debarati Roy',
    role: 'PRT Primary English & EVS',
    designation: 'Primary Teacher (PRT)',
    department: 'Primary Academic Wing',
    qualification: 'B.A (English), D.El.Ed',
    experience: '6 Years',
    dateOfJoining: '2019-06-25',
    subjectTaught: 'English, Environmental Studies & Creative Arts',
    category: 'PRT',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
];

const LOCAL_STORAGE_KEY = 'arps_live_staff_directory_v2';
export const STAFF_UPDATED_EVENT = 'arps_staff_directory_updated';

function notifyStaffUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(STAFF_UPDATED_EVENT));
  }
}

export function getLiveStaffList(): FacultyMember[] {
  if (typeof window === 'undefined') {
    return INITIAL_STAFF_MEMBERS;
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_STAFF_MEMBERS));
      return INITIAL_STAFF_MEMBERS;
    }
    const parsed: FacultyMember[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_STAFF_MEMBERS;
  } catch (err) {
    console.error('Failed to parse staff from localStorage:', err);
    return INITIAL_STAFF_MEMBERS;
  }
}

export function saveStaffMember(data: Omit<FacultyMember, 'id'> & { id?: string }): FacultyMember[] {
  const current = getLiveStaffList();
  const id = data.id || `fac-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newMember: FacultyMember = {
    ...data,
    id,
    role: data.designation || data.role || 'Staff Member',
    designation: data.designation || data.role || 'Staff Member',
    subjectTaught: data.subjectTaught || data.subject || 'All General Subjects',
    dateOfJoining: data.dateOfJoining || new Date().toISOString().split('T')[0],
  };

  const updated = [newMember, ...current];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    notifyStaffUpdated();
  } catch (e) {
    console.error('Failed to save staff member to localStorage:', e);
  }
  return updated;
}

export function updateStaffMember(updatedMember: FacultyMember): FacultyMember[] {
  const current = getLiveStaffList();
  const updated = current.map((member) =>
    member.id === updatedMember.id
      ? {
          ...member,
          ...updatedMember,
          role: updatedMember.designation || updatedMember.role || member.role,
          designation: updatedMember.designation || updatedMember.role || member.designation,
          subjectTaught: updatedMember.subjectTaught || updatedMember.subject || member.subjectTaught,
        }
      : member
  );

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    notifyStaffUpdated();
  } catch (e) {
    console.error('Failed to update staff member in localStorage:', e);
  }
  return updated;
}

export function deleteStaffMember(id: string): FacultyMember[] {
  const current = getLiveStaffList();
  const updated = current.filter((m) => m.id !== id);
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    notifyStaffUpdated();
  } catch (e) {
    console.error('Failed to delete staff member from localStorage:', e);
  }
  return updated;
}

export function resetStaffToDefaults(): FacultyMember[] {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_STAFF_MEMBERS));
    notifyStaffUpdated();
  } catch (e) {
    console.error('Failed to reset staff in localStorage:', e);
  }
  return INITIAL_STAFF_MEMBERS;
}
