import {
  AdmissionFeeRow,
  Facility,
  FacultyMember,
  FeeItem,
  GalleryItem,
  HeroSlide,
  Notice,
  SchoolEvent,
  TransferCertificateRecord,
  UserCategory,
} from '../types';

export type {
  AdmissionFeeRow,
  Facility,
  FacultyMember,
  FeeItem,
  GalleryItem,
  HeroSlide,
  Notice,
  SchoolEvent,
  TransferCertificateRecord,
  UserCategory,
};

export type FeeCategory = UserCategory;

export const SCHOOL_INFO = {
  name: 'Assam Rifles Public School',
  city: 'Agartala',
  state: 'Tripura',
  tagline: 'Come to Learn, Go to Serve',
  hindiName: 'असम राइफल्स पब्लिक स्कूल',
  establishedYear: '1987',
  formerName: 'Suryodya Public School',
  affiliation: 'CBSE New Delhi',
  affiliationNo: '2030013',
  schoolCode: '35274',
  society: 'Under the aegis of Assam Rifles Welfare Education Society (ARWES), HQ DGAR Shillong',
  campusArea: '23,876 sq. meters',
  address: 'Assam Rifles Complex, Kunjaban, Agartala, Tripura - 799006',
  primaryPhone: '+91-8837405374',
  secondaryPhone: '+91-9774296030',
  phone: '+91-8837405374',
  primaryEmail: 'arpsagartala2022@gmail.com',
  secondaryEmail: 'assamriflesschool@rediffmail.com',
  email: 'arpsagartala2022@gmail.com',
  officeHours: '8:00 AM – 2:00 PM (Monday to Saturday)',
  timings: '8:00 AM – 2:00 PM (Monday to Saturday)',
  whatsappNumber: '+919774296030',
  facebookUrl: 'https://www.facebook.com/ARPSagt',
  youtubeUrl: 'https://www.youtube.com/@assamriflespublicschoolaga6386',
  twitterUrl: 'https://x.com/arpsagartala',
};

export const MANDATORY_DISCLOSURE = {
  schoolName: 'Assam Rifles Public School, Agartala',
  affiliationNo: '2030013',
  schoolCode: '35274',
  principalName: 'Mr. Animesh Acharya',
  principalQualification: 'M.Sc, M.Ed',
  address: 'Assam Rifles Complex, Kunjaban, Agartala, Tripura - 799006',
  documents: [
    { title: 'Affiliation and Upgradation Letter from CBSE', file: 'CBSE_Affiliation_Letter.pdf' },
    { title: 'Society Registration Certificate (ARWES Shillong)', file: 'Society_Registration_ARWES.pdf' },
    { title: 'No Objection Certificate (NOC) by State Govt of Tripura', file: 'Tripura_State_NOC.pdf' },
    { title: 'Building Safety Certificate as per National Building Code', file: 'Building_Safety_Certificate.pdf' },
    { title: 'Fire Safety Certificate Issued by Competent Authority', file: 'Fire_Safety_Certificate.pdf' },
    { title: 'Safe Drinking Water and Sanitary Condition Certificate', file: 'Water_Sanitation_Certificate.pdf' },
    { title: 'Fee Structure of the School for Session 2025-26', file: 'ARPS_Fee_Structure_2025_26.pdf' },
    { title: 'Annual Academic Calendar and List of Holidays', file: 'Academic_Calendar_2025_26.pdf' },
    { title: 'School Management Committee (SMC) Composition', file: 'SMC_Members_List.pdf' },
    { title: 'Parents Teachers Association (PTA) Members List', file: 'PTA_Committee_List.pdf' },
  ],
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Excellence in Military Tradition & Academics',
    subtitle: 'Nurturing future leaders, scholars, and proud citizens of India on our 23,876 sq. meter lush green cantonment campus.',
    badge: 'Affiliated to CBSE New Delhi – Estd. 1987',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1920&q=80',
    ctaText: 'Admission Guidelines',
    ctaLink: 'admission-process',
  },
  {
    id: 2,
    title: '100% CBSE Board Examination Pass Track Record',
    subtitle: 'State-of-the-art laboratories, smart digital classrooms, and seasoned teaching faculty dedicated to holistic student success.',
    badge: 'Academic Brilliance',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80',
    ctaText: 'Explore Facilities',
    ctaLink: 'facilities-labs',
  },
  {
    id: 3,
    title: 'Vibrant Sports, NCC & Martial Arts Training',
    subtitle: 'Instilling discipline, physical resilience, and team spirit through extensive athletic meets, drill parades, and annual championships.',
    badge: 'Holistic Development',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80',
    ctaText: 'View Sports & NCC',
    ctaLink: 'facilities-sports',
  },
  {
    id: 4,
    title: 'Introducing Geography & Psychology in Senior Secondary',
    subtitle: 'Empowering young minds with modern multidisciplinary curriculum choices in Humanities, Science, and Commerce streams.',
    badge: 'Class XI & XII Admissions',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80',
    ctaText: 'Fee Structure',
    ctaLink: 'admission-fees',
  },
];

export const ADMISSION_FEES: AdmissionFeeRow[] = [
  { category: 'Officers', amount: 2100 },
  { category: 'JCOs/WOs', amount: 1600 },
  { category: 'OR', amount: 1250 },
  { category: 'Civilians', amount: 3200 },
];

export const TUITION_FEES: FeeItem[] = [
  {
    classLevel: 'Nursery – UKG',
    categoryFees: {
      Officers: 1200,
      'JCOs/WOs': 1200,
      OR: 1200,
      Civilians: 1510,
    },
    annualCharges: 2500,
    examFee: 400,
  },
  {
    classLevel: 'Class I – V',
    categoryFees: {
      Officers: 1300,
      'JCOs/WOs': 1300,
      OR: 1300,
      Civilians: 1630,
    },
    annualCharges: 2800,
    examFee: 500,
  },
  {
    classLevel: 'Class VI – VIII',
    categoryFees: {
      Officers: 1400,
      'JCOs/WOs': 1400,
      OR: 1400,
      Civilians: 1780,
    },
    annualCharges: 3000,
    examFee: 600,
  },
  {
    classLevel: 'Class IX – X',
    categoryFees: {
      Officers: 1550,
      'JCOs/WOs': 1550,
      OR: 1550,
      Civilians: 2050,
    },
    annualCharges: 3500,
    examFee: 800,
  },
  {
    classLevel: 'Class XI – XII (Science/Arts/Commerce)',
    categoryFees: {
      Officers: 1800,
      'JCOs/WOs': 1800,
      OR: 1800,
      Civilians: 2400,
    },
    annualCharges: 4000,
    examFee: 1200,
  },
];

export const NOTICES: Notice[] = [
  {
    id: 'n-1',
    title: 'Admissions Open for Academic Session 2025-26 (Nursery to Class IX & XI)',
    category: 'Admissions',
    date: '10 Feb 2025',
    department: 'Admission Cell',
    location: 'ARPS Administrative Block, Agartala',
    description:
      'Online applications and physical forms are now open for Nursery through Class IX, and Class XI (Science, Commerce, Arts streams with Geography & Psychology). Collect forms between 8:00 AM and 1:30 PM on all working days or apply online.',
    fileUrl: '#',
    isUrgent: true,
  },
  {
    id: 'n-2',
    title: 'Teaching Faculty Recruitment - PGT & TGT Positions on Contractual Basis',
    category: 'Recruitment',
    date: '15 Jan 2025',
    department: 'Human Resources & Recruitment Cell',
    location: 'Assam Rifles Public School, Agartala',
    description:
      'We are seeking qualified and dedicated candidates for the posts of PGT (Political Science, Economics, Physics) and TGT (Computer Science & Mathematics). Eligible candidates must download the application form and submit with attested certificates.',
    fileUrl: '#',
    isUrgent: true,
  },
  {
    id: 'n-3',
    title: 'Administrative Assistant & Junior Clerk Vacancies Announced',
    category: 'Recruitment',
    date: '20 Jan 2025',
    department: 'Office Administration',
    location: 'Agartala Campus',
    description:
      'Inviting applications for Administrative Assistant and Junior Clerk roles. Required proficiency in Microsoft Office, record-keeping, and communication skills in English & Hindi. Walk-in interviews scheduled next month.',
    fileUrl: '#',
  },
  {
    id: 'n-4',
    title: 'CBSE Class X & XII Pre-Board Examination Schedule Released',
    category: 'Examinations',
    date: '02 Feb 2025',
    department: 'Examination Committee',
    location: 'Senior Secondary Wing',
    description:
      'The comprehensive date sheet for Class X and Class XII pre-board assessments has been uploaded. Students must carry their school ID card and follow strict examination room protocol.',
    fileUrl: '#',
  },
  {
    id: 'n-5',
    title: 'Computer Notes & Lab Workbook Submission Deadline',
    category: 'Academics',
    date: '28 Jan 2025',
    department: 'Department of Computer Science',
    location: 'Computer Lab 1',
    description:
      'All students of Class VII to X are instructed to complete practical exercises for Chapter 1 and Chapter 2 in their computer notebooks and submit them to their respective subject mentors.',
    fileUrl: '#',
  },
  {
    id: 'n-6',
    title: 'Annual Excursion Tour to Kaziranga National Park',
    category: 'Notice',
    date: '18 Dec 2024',
    department: 'Student Welfare & Activities Committee',
    location: 'Kaziranga, Assam',
    description:
      'An educational nature tour and wildlife heritage excursion has been scheduled for Class VIII to XI students. Interested parents are requested to submit the consent form by Saturday.',
    fileUrl: '#',
  },
];

export const UPCOMING_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-1',
    title: '38th Annual Athletics & Sports Championship',
    month: 'APR',
    day: '15',
    year: '2025',
    time: '08:30 AM',
    description: 'Inter-house march past, sprint heats, high jump, shot put, and military drill demonstrations.',
    category: 'Sports',
    venue: 'ARPS Main Parade Ground, Agartala',
  },
  {
    id: 'ev-2',
    title: 'Annual Cultural Fest & Prize Distribution Gala',
    month: 'APR',
    day: '22',
    year: '2025',
    time: '10:00 AM',
    description: 'Folk dances, musical choir, dramatic performances, and felicitation of CBSE board toppers.',
    category: 'Cultural',
    venue: 'Auditorium Hall, Assam Rifles Complex',
  },
  {
    id: 'ev-3',
    title: 'Health, Dental & Eye Screening Awareness Camp',
    month: 'MAY',
    day: '05',
    year: '2025',
    time: '09:00 AM',
    description: 'Comprehensive annual medical checkup by Assam Rifles medical officers for all students.',
    category: 'Health',
    venue: 'School Medical Infirmary',
  },
  {
    id: 'ev-4',
    title: '79th Independence Day Ceremonial Parade & Flag Hoisting',
    month: 'AUG',
    day: '15',
    year: '2025',
    time: '07:45 AM',
    description: 'Patriotic song recitals, NCC cadet guard of honour, and Chairman address to students and staff.',
    category: 'National Event',
    venue: 'Central Quadrangle, ARPS Campus',
  },
];

export const FACILITIES: Facility[] = [
  {
    id: 'f-1',
    name: 'Smart Classrooms & Laboratories',
    category: 'Laboratories',
    description: 'High-tech Physics, Chemistry, Biology, and Mathematics labs equipped with modern apparatus, digital projectors, and certified safety equipment meeting strict CBSE secondary and senior secondary standards.',
    features: ['Advanced Physics Optics & Mechanics Kits', 'Safe Chemical Fume Reagents & Bunsen Stations', 'Biological Microscopic Specimens & Models', 'Interactive Digital Whiteboards in classrooms'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    highlights: 'Hands-on practical experiments for all grades from Class VI upwards.',
  },
  {
    id: 'f-2',
    name: 'Computer & AI Technology Centre',
    category: 'Laboratories',
    description: 'Modern computer lab furnished with 40+ networked high-performance desktop systems, high-speed fibre broadband, educational software suites, and coding curriculum for Python, HTML, and AI fundamentals.',
    features: ['1:1 Student to PC workstation allocation', 'Dedicated UPS power backup', 'Cyber safety filtered firewall network', 'Curriculum for Coding & Robotics'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    highlights: 'Equipping students with essential digital literacy and technological acumen.',
  },
  {
    id: 'f-3',
    name: 'Central Knowledge Library',
    category: 'Library',
    description: 'A spacious, silent sanctum housing over 8,000 catalogued volumes spanning literature, science, history, competitive examination guides, national dailies, and periodicals.',
    features: ['Extensive CBSE NCERT reference library', 'Subscription to 12+ newspapers & educational journals', 'Cozy reading corners for primary students', 'Digital catalogue management system'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    highlights: 'Encouraging independent enquiry, literature appreciation, and deep research.',
  },
  {
    id: 'f-4',
    name: 'Sports Complex & Athletic Grounds',
    category: 'Sports',
    description: 'Sprawling grass playground accommodating full-sized football matches, cricket nets, volleyball courts, basketball court, badminton, and a dedicated 200-meter athletics running track.',
    features: ['Full grass football field & cricket pitch', 'Outdoor basketball & volleyball courts', 'Specialized athletic coaches and trainers', 'Annual inter-house sports championships'],
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    highlights: 'Building physical endurance, teamwork, and competitive sportsmanship.',
  },
  {
    id: 'f-5',
    name: 'NCC Cadet Wing (13 Tripura Bn)',
    category: 'NCC',
    description: 'Active National Cadet Corps (NCC) junior troop instilling military discipline, patriotic pride, survival tactics, map reading, obstacle courses, and community service.',
    features: ['Annual Combined Cadets Training Camps (CATC)', 'Firing practice & obstacle navigation training', 'Special parade training for Republic Day and Independence Day', 'Direct weightage for military and police recruitment'],
    imageUrl: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=800&q=80',
    highlights: 'Training disciplined, socially responsible youth for service to the nation.',
  },
  {
    id: 'f-6',
    name: 'Health Care & Medical Infirmary',
    category: 'Medical',
    description: 'Well-appointed medical room with immediate first-aid provisions, routine health screenings, qualified nursing care, and emergency ambulance transit to military base hospital.',
    features: ['Qualified full-time health and first-aid attendant', 'Annual pediatric dental & vision checkups', 'Emergency oxygen & medical kit readiness', 'Direct proximity to Assam Rifles Hospital'],
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    highlights: 'Uncompromising standard of student wellness and immediate care.',
  },
  {
    id: 'f-7',
    name: 'Music & Cultural Arts Academy',
    category: 'Music & Arts',
    description: 'Vibrant studio for learning vocal Indian classical music, western keyboard, guitar, traditional tabla, brass band instruments, and classical dance forms.',
    features: ['Equipped with keyboards, guitars, harmonium, and tabla sets', 'School Brass Band training under military instructors', 'Preparation for state and national youth cultural fests', 'Visual arts & painting workshop bay'],
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    highlights: 'Nurturing aesthetic sensibility, creative expression, and rhythmic harmony.',
  },
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Mr. Animesh Acharya',
    role: 'Principal',
    department: 'School Administration & Leadership',
    qualification: 'M.Sc, M.Ed, PGDEMA',
    experience: '24+ Years with ARPS Agartala',
    category: 'Administration',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-2',
    name: 'Mrs. Sharmistha Deb',
    role: 'Vice Principal & PGT English',
    department: 'Department of Languages',
    qualification: 'M.A (English), B.Ed',
    experience: '18 Years',
    category: 'Teaching',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-3',
    name: 'Dr. Rajesh Bhattacharya',
    role: 'PGT Physics & Science HOD',
    department: 'Department of Science',
    qualification: 'M.Sc (Physics), Ph.D, B.Ed',
    experience: '15 Years',
    category: 'Teaching',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-4',
    name: 'Mrs. Rupa Chakraborty',
    role: 'PGT Mathematics',
    department: 'Department of Mathematics',
    qualification: 'M.Sc (Maths), B.Ed',
    experience: '14 Years',
    category: 'Teaching',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-5',
    name: 'Mr. Bikramjit Das',
    role: 'TGT Computer Science & IT',
    department: 'Department of Computer Applications',
    qualification: 'MCA, B.Ed, Certified Python Trainer',
    experience: '10 Years',
    category: 'Teaching',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-6',
    name: 'Mrs. Pampa Saha',
    role: 'PGT Economics & Humanities HOD',
    department: 'Department of Social Sciences',
    qualification: 'M.A (Economics), B.Ed',
    experience: '12 Years',
    category: 'Teaching',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-7',
    name: 'Subedar M.K. Sharma',
    role: 'Chief Physical Training Instructor & NCC Officer',
    department: 'Physical Education & NCC Wing',
    qualification: 'Diploma in Physical Training (Army P.E. Corps)',
    experience: '20+ Years Military Service',
    category: 'Teaching',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fac-8',
    name: 'Mr. Nilmoni Barman',
    role: 'Senior Office Superintendent',
    department: 'Office Administration & Accounts',
    qualification: 'B.Com, PGDCA',
    experience: '16 Years',
    category: 'Administration',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
];

import { PHOTOS_DATA } from '../media/photosData';
export { PHOTOS_DATA, VIDEOS_DATA } from '../media';

export const GALLERY_ITEMS: GalleryItem[] = PHOTOS_DATA;

export const SAMPLE_TC_RECORDS: TransferCertificateRecord[] = [
  {
    admissionNo: 'ARPS/2021/1042',
    studentName: 'Rahul Debbarma',
    fatherName: 'Bikash Debbarma',
    motherName: 'Anjana Debbarma',
    dob: '14-08-2008',
    classLeaving: 'Class X',
    issueDate: '24-05-2024',
    tcNumber: 'TC-2024-089',
    status: 'Verified',
    reason: 'Parent posted on official transfer to Dimapur',
  },
  {
    admissionNo: 'ARPS/2020/0914',
    studentName: 'Priya Sharma',
    fatherName: 'Subedar Ram Kumar Sharma',
    motherName: 'Sunita Sharma',
    dob: '02-11-2007',
    classLeaving: 'Class XII (Science)',
    issueDate: '10-06-2024',
    tcNumber: 'TC-2024-112',
    status: 'Verified',
    reason: 'Passed CBSE Class XII Board Examination 2024',
  },
  {
    admissionNo: 'ARPS/2022/1189',
    studentName: 'Aman Singh',
    fatherName: 'Havildar Rajesh Singh',
    motherName: 'Kavita Singh',
    dob: '19-03-2010',
    classLeaving: 'Class VIII',
    issueDate: '12-07-2024',
    tcNumber: 'TC-2024-145',
    status: 'Verified',
    reason: 'Family relocation to Assam Rifles HQ Shillong',
  },
  {
    admissionNo: 'ARPS/2023/1305',
    studentName: 'Sneha Majumder',
    fatherName: 'Pradip Majumder',
    motherName: 'Madhumita Majumder',
    dob: '28-09-2012',
    classLeaving: 'Class VI',
    issueDate: '15-08-2024',
    tcNumber: 'TC-2024-190',
    status: 'Verified',
    reason: 'Admission in State Specialized Sports Academy',
  },
];

export const HOUSES_INFO = [
  {
    name: 'Gandhi',
    color: '#DC2626', // Red
    colorName: 'Scarlet Red',
    patron: 'Mahatma Gandhi',
    motto: 'Truth and Non-Violence',
    values: 'Truth, Peace, Moral Courage, Simplicity, and Selfless Service',
    description: 'Inspires moral uprightness, humility, truthfulness, and compassionate service to society.',
  },
  {
    name: 'Nehru',
    color: '#2563EB', // Blue
    colorName: 'Royal Blue',
    patron: 'Pandit Jawaharlal Nehru',
    motto: 'Vision and Progress',
    values: 'Modern Vision, Democratic Spirit, Scientific Outlook, and Progress',
    description: 'Fosters progressive leadership, scientific temper, intellectual curiosity, and national unity.',
  },
  {
    name: 'Subhash',
    color: '#16A34A', // Green
    colorName: 'Emerald Green',
    patron: 'Netaji Subhash Chandra Bose',
    motto: 'Courage and Patriotism',
    values: 'Patriotism, Fearless Leadership, Vigor, and Unyielding Determination',
    description: 'Instills martial discipline, athletic grit, patriotic fervor, and supreme dedication to the motherland.',
  },
  {
    name: 'Tagore',
    color: '#EAB308', // Yellow
    colorName: 'Golden Yellow',
    patron: 'Rabindranath Tagore',
    motto: 'Knowledge is Freedom',
    values: 'Creativity, Literature, Universal Brotherhood, and Artistic Expression',
    description: 'Celebrates artistic sensibility, eloquence, cultural heritage, and liberal pursuit of knowledge.',
  },
];

export const LEADERSHIP_MESSAGES = {
  chairman: {
    name: 'Brig. Nishant Chandel',
    title: 'Chairman, ARPS Agartala & Commander 21 Sector Assam Rifles',
    affiliation: 'Assam Rifles Welfare Education Society (ARWES), HQ DGAR Shillong',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    quote: 'The Great Aim of Education is not knowledge but action.',
  },
  principal: {
    name: 'Mr. Animesh Acharya',
    title: 'Principal, Assam Rifles Public School Agartala',
    experience: 'M.Sc, M.Ed – 22+ Years in Educational Administration',
    affiliation: 'Assam Rifles Public School, Agartala',
    qualification: 'M.Sc (Mathematics), M.Ed, UGC-NET',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    quote: 'True education is an ornament in prosperity and a refuge in adversity.',
  },
};

export const ADMISSION_STEPS = [
  {
    step: 1,
    title: 'Obtain & Submit Application',
    description: 'Collect registration kit from school administrative reception (8:00 AM – 1:30 PM) or complete the instant online registration form on this portal.',
    highlight: 'Online & Offline Options Available',
  },
  {
    step: 2,
    title: 'Document Scrutiny',
    description: 'Submit child birth certificate, previous school transfer certificate, report card, immunization records, and parent defense/civilian ID credentials.',
    highlight: 'Strict CBSE Guideline Compliance',
  },
  {
    step: 3,
    title: 'Diagnostic Interaction',
    description: 'Friendly age-appropriate aptitude evaluation in English, Mathematics, and General Science to assess foundational conceptual grounding.',
    highlight: 'No Stressful Elimination Tests',
  },
  {
    step: 4,
    title: 'Confirmation & Enrollment',
    description: 'Merit list published on official notice board and website. Complete nominal admission fee payment to secure child seat.',
    highlight: 'Zero Capitation Fee Guarantee',
  },
];

export const CLASS_AGE_CRITERIA = [
  { classLevel: 'Nursery / Pre-KG', minAge: '3 Years', maxAge: '4 Years', mode: 'Direct / Interaction' },
  { classLevel: 'LKG / KG-I', minAge: '4 Years', maxAge: '5 Years', mode: 'Direct / Interaction' },
  { classLevel: 'UKG / KG-II', minAge: '5 Years', maxAge: '6 Years', mode: 'Direct / Interaction' },
  { classLevel: 'Class I', minAge: '6 Years', maxAge: '7 Years', mode: 'Interaction & Baseline Assessment' },
  { classLevel: 'Class II to V', minAge: '7 to 10 Years', maxAge: '8 to 11 Years', mode: 'Subject Evaluation (Eng, Math)' },
  { classLevel: 'Class VI to VIII', minAge: '11 to 13 Years', maxAge: '12 to 14 Years', mode: 'Written Assessment & Interview' },
  { classLevel: 'Class IX', minAge: '14 Years', maxAge: '15 Years', mode: 'CBSE Written Aptitude Test' },
  { classLevel: 'Class XI (Science/Arts/Com)', minAge: '16 Years', maxAge: '17 Years', mode: 'Class X Board Merit & Interview' },
];

export const STREAMS_AVAILABLE = [
  {
    name: 'Science (Medical & Non-Medical)',
    subjects: ['English Core', 'Physics', 'Chemistry', 'Mathematics / Biology', 'Computer Science / Physical Education'],
    careers: 'Medicine, Engineering, Biotechnology, Data Science, Defense Services (NDA/CDS)',
  },
  {
    name: 'Commerce',
    subjects: ['English Core', 'Accountancy', 'Business Studies', 'Economics', 'Applied Mathematics / Informatics Practices'],
    careers: 'Chartered Accountancy, Banking, Corporate Law, Business Management, Finance',
  },
  {
    name: 'Humanities / Arts',
    subjects: ['English Core', 'History', 'Political Science', 'Geography', 'Psychology / Sociology / Physical Education'],
    careers: 'Civil Services (UPSC), Judiciary & Law, Journalism, International Relations, Psychology',
  },
];

export interface NoticeItem {
  id: string;
  title: string;
  category: string;
  date: string;
  department?: string;
  location?: string;
  description?: string;
  fileUrl?: string;
  isUrgent?: boolean;
  isNew?: boolean;
}

export interface JobOpening {
  id: string;
  title: string;
  post?: string;
  category: string;
  qualification: string;
  qualifications?: string;
  experience: string;
  vacancies: number;
  salary?: string;
  lastDate: string;
  description: string;
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Post Graduate Teacher (PGT) - Physics',
    post: 'Post Graduate Teacher (PGT) - Physics',
    category: 'Teaching Faculty',
    qualification: 'Master degree in Physics with minimum 55% marks & B.Ed from NCTE recognized institution.',
    qualifications: 'M.Sc (Physics) + B.Ed with min 55% marks',
    experience: 'Minimum 3 years teaching senior secondary (CBSE Class XI & XII).',
    vacancies: 1,
    salary: 'As per ARWES VI Pay Matrix + Allowances',
    lastDate: '28 Feb 2025',
    description: 'Lead theory lectures and oversee Physics laboratory practicals for senior secondary students. Foster scientific thinking.',
  },
  {
    id: 'job-2',
    title: 'Post Graduate Teacher (PGT) - Political Science / Geography',
    post: 'Post Graduate Teacher (PGT) - Political Science / Geography',
    category: 'Teaching Faculty',
    qualification: 'Post Graduate in Political Science / Geography + B.Ed.',
    qualifications: 'M.A. (Pol Science / Geography) + B.Ed',
    experience: 'Prior CBSE board teaching experience preferred.',
    vacancies: 2,
    salary: 'As per ARWES VI Pay Matrix + Allowances',
    lastDate: '28 Feb 2025',
    description: 'Teach newly introduced Senior Secondary Humanities curriculum and mentor civil services aspirants.',
  },
  {
    id: 'job-3',
    title: 'Trained Graduate Teacher (TGT) - Computer Science & AI',
    post: 'Trained Graduate Teacher (TGT) - Computer Science & AI',
    category: 'Teaching Faculty',
    qualification: 'MCA / B.Tech (CS/IT) / B.Sc Computer Science with B.Ed or equivalent.',
    qualifications: 'MCA / B.Tech CS / B.Sc CS + B.Ed',
    experience: 'Hands-on knowledge in Python, Web Development, and CBSE Artificial Intelligence curriculum.',
    vacancies: 1,
    salary: 'Commensurate with ARWES Scale',
    lastDate: '05 Mar 2025',
    description: 'Instruct middle and secondary classes in computer fundamentals, programming, and manage computer lab infrastructure.',
  },
  {
    id: 'job-4',
    title: 'Physical Education Teacher (PET) / NCC Coordinator',
    post: 'Physical Education Teacher (PET) / NCC Coordinator',
    category: 'Sports & Drill',
    qualification: 'B.P.Ed / M.P.Ed with specialized training in athletics or martial arts. NCC "C" certificate holder preferred.',
    qualifications: 'B.P.Ed / M.P.Ed + NCC C-Cert preferred',
    experience: '2+ years organizing sports meets and conducting drill ceremonies.',
    vacancies: 1,
    salary: 'As per ARWES Rules',
    lastDate: '05 Mar 2025',
    description: 'Direct morning physical fitness drills, train student athletic teams, and coordinate Assam Rifles NCC Army Wing troop.',
  },
  {
    id: 'job-5',
    title: 'School Counselor & Wellness Educator',
    post: 'School Counselor & Wellness Educator',
    category: 'Student Support',
    qualification: 'M.A. / M.Sc. in Psychology / Child Development with Diploma in Guidance & Counseling.',
    qualifications: 'M.A. Psychology + Guidance Diploma',
    experience: 'Experience working in CBSE affiliated school environment.',
    vacancies: 1,
    salary: 'As per ARWES Rules',
    lastDate: '10 Mar 2025',
    description: 'Provide confidential behavioral, emotional, and career guidance counseling to students.',
  },
];

export interface TopperStudent {
  name: string;
  classGrade: string;
  stream: string;
  percentage: string;
  photo: string;
  achievement: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Academic' | 'Sports' | 'Co-Curricular';
  level: string;
  year: string;
  badge: string;
  description: string;
}

export const TOPPERS: TopperStudent[] = [
  {
    name: 'Debasmita Roy',
    classGrade: 'Class XII',
    stream: 'Science',
    percentage: '97.4%',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    achievement: 'Tripura State CBSE Rank 2 – 100/100 in Chemistry & Mathematics',
  },
  {
    name: 'Rahul Debbarma',
    classGrade: 'Class XII',
    stream: 'Commerce',
    percentage: '96.2%',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    achievement: 'School Topper in Accountancy & Economics – Admitted to SRCC Delhi',
  },
  {
    name: 'Ananya Sharma',
    classGrade: 'Class XII',
    stream: 'Humanities',
    percentage: '95.8%',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    achievement: 'Distinction in Political Science & History – National Debate Finalist',
  },
  {
    name: 'Sourabh Saha',
    classGrade: 'Class X',
    stream: 'General CBSE',
    percentage: '98.0%',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    achievement: 'Class X School Topper – Centum in Standard Mathematics & Science',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Tripura State Inter-School Football Championship',
    category: 'Sports',
    level: 'State Level',
    year: '2024',
    badge: 'Gold Medalists',
    description: 'Senior Boys football team clinched the championship trophy at Swami Vivekananda Stadium, Agartala with 3-1 victory in finals.',
  },
  {
    id: 'ach-2',
    title: 'Inter-ARPS Athletic & Drill Meet Overall Trophy',
    category: 'Sports',
    level: 'Zonal / Assam Rifles',
    year: '2024',
    badge: 'Overall Champions',
    description: 'Bagged 14 gold, 8 silver, and 6 bronze medals across 100m, 400m relay, high jump, shot put, and military marching squad.',
  },
  {
    id: 'ach-3',
    title: 'National Science Olympiad (NSO) Gold Medal of Excellence',
    category: 'Academic',
    level: 'National Level',
    year: '2024',
    badge: 'Zonal Rank 1',
    description: 'Four ARPS Agartala students ranked in the top 1% nationally in Science and Cyber Olympiad examinations.',
  },
  {
    id: 'ach-4',
    title: 'CBSE East Zone Shooting & Archery Meet',
    category: 'Sports',
    level: 'National Qualifiers',
    year: '2024',
    badge: 'National Representation',
    description: 'NCC cadets represented Tripura state at the CBSE National Games in 10m Air Rifle and Archery events.',
  },
  {
    id: 'ach-5',
    title: 'All-India Inter-School Debate & Model United Nations (MUN)',
    category: 'Co-Curricular',
    level: 'Regional Level',
    year: '2024',
    badge: 'Best Delegation',
    description: 'Senior secondary student delegates bagged Best Speaker and High Commendation at North-East Inter-School MUN.',
  },
  {
    id: 'ach-6',
    title: 'State Level Children Science Congress',
    category: 'Academic',
    level: 'State Level',
    year: '2024',
    badge: 'First Prize',
    description: 'Eco-innovation project on indigenous bamboo bio-filters selected for national science forum presentation in New Delhi.',
  },
];

export interface AlumniStory {
  name: string;
  batch: string;
  currentRole: string;
  achievement: string;
  photo: string;
  quote: string;
}

export const ALUMNI_STORIES: AlumniStory[] = [
  {
    name: 'Major Vikramjit Sen, SM',
    batch: '2008',
    currentRole: 'Indian Army (Special Forces)',
    achievement: 'Sena Medal Gallantry Awardee – NDA 123rd Course',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'The military discipline, punctuality, and fearlessness instilled by my teachers at ARPS Agartala became the bedrock of my career in the armed forces.',
  },
  {
    name: 'Dr. Pallabi Bhattacharjee, MD',
    batch: '2012',
    currentRole: 'Consultant Neurosurgeon, AIIMS New Delhi',
    achievement: 'CBSE State Topper 2012 – Gold Medalist in MBBS',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    quote: 'The encouragement in ARPS science laboratories ignited my fascination for medicine. I remain perpetually indebted to our teachers who believed in my potential.',
  },
  {
    name: 'Rohit Tripura, IAS',
    batch: '2015',
    currentRole: 'Assistant Commissioner, Ministry of Finance',
    achievement: 'UPSC Civil Services Examination (AIR 84)',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    quote: 'Our school motto "Come to Learn, Go to Serve" was not just words carved on the assembly walls; it transformed into my lifelong guiding mantra for civil service.',
  },
];

export const FAQS = [
  {
    question: 'Are civilian children eligible for admission at ARPS Agartala?',
    answer: 'Yes, absolutely. While priority and subsidized fee slabs are designated for wards of Assam Rifles, Armed Forces, and Paramilitary personnel, ARPS Agartala welcomes civilian students across all classes from Nursery to Class XII subject to seat availability.',
  },
  {
    question: 'What board is Assam Rifles Public School Agartala affiliated to?',
    answer: 'The school is permanently affiliated to the Central Board of Secondary Education (CBSE), New Delhi up to Senior Secondary Level (+2) under Affiliation No. 2030013 and School Code: 35274.',
  },
  {
    question: 'Are there any donation or capitation fees charged during admission?',
    answer: 'None whatsoever. In adherence to ARWES regulations and CBSE norms, ARPS strictly prohibits capitation fees, donations, or building funds. Fees are transparently defined and publicly notified.',
  },
  {
    question: 'What are the school administrative office timings for inquiries and visits?',
    answer: 'The administrative office operates between 8:00 AM and 2:00 PM from Monday to Saturday (closed on second Saturdays and gazetted national holidays).',
  },
  {
    question: 'How do I obtain or verify a Transfer Certificate (TC)?',
    answer: 'Parents can submit a TC application form at the administrative reception or verify issued TCs online instantly via our portal by providing the admission number and student date of birth.',
  },
  {
    question: 'What streams and new elective subjects are offered in Class XI & XII?',
    answer: 'We offer Science (Medical & Non-Medical), Commerce, and Humanities. As an academic highlight, we have recently introduced Geography and Psychology in the Senior Secondary Humanities curriculum.',
  },
];
