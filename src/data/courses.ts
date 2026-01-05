import { Course } from '@/types/user';

export const schoolCourses: Course[] = [
  // Science Stream
  { id: 's1', title: 'Physics, Chemistry, Mathematics (PCM)', description: 'Foundation for engineering and technical careers', duration: '2 years', level: '11th-12th', category: 'Science', provider: 'CBSE/State Board', rating: 4.8 },
  { id: 's2', title: 'Physics, Chemistry, Biology (PCB)', description: 'Gateway to medical and life sciences', duration: '2 years', level: '11th-12th', category: 'Science', provider: 'CBSE/State Board', rating: 4.8 },
  { id: 's3', title: 'Physics, Chemistry, Mathematics, Biology (PCMB)', description: 'Flexible option for both engineering and medical', duration: '2 years', level: '11th-12th', category: 'Science', provider: 'CBSE/State Board', rating: 4.7 },
  
  // Commerce Stream
  { id: 's4', title: 'Commerce with Mathematics', description: 'For finance, accounting, and business analytics', duration: '2 years', level: '11th-12th', category: 'Commerce', provider: 'CBSE/State Board', rating: 4.6 },
  { id: 's5', title: 'Commerce without Mathematics', description: 'Focus on business, economics, and accounting', duration: '2 years', level: '11th-12th', category: 'Commerce', provider: 'CBSE/State Board', rating: 4.5 },
  
  // Arts/Humanities Stream
  { id: 's6', title: 'Arts with Psychology', description: 'For careers in counseling and social sciences', duration: '2 years', level: '11th-12th', category: 'Arts', provider: 'CBSE/State Board', rating: 4.5 },
  { id: 's7', title: 'Arts with Political Science', description: 'Foundation for law, civil services, and journalism', duration: '2 years', level: '11th-12th', category: 'Arts', provider: 'CBSE/State Board', rating: 4.4 },
  { id: 's8', title: 'Arts with Fine Arts', description: 'For creative careers in design and visual arts', duration: '2 years', level: '11th-12th', category: 'Arts', provider: 'CBSE/State Board', rating: 4.6 },
  
  // Vocational Courses
  { id: 's9', title: 'Information Technology (IT)', description: 'Practical computer skills and programming basics', duration: '2 years', level: '11th-12th', category: 'Vocational', provider: 'CBSE/State Board', rating: 4.7 },
  { id: 's10', title: 'Web Development Basics', description: 'Introduction to creating websites and web applications', duration: '2 years', level: '11th-12th', category: 'Vocational', provider: 'CBSE/State Board', rating: 4.6 },
];

export const undergraduateCourses: Course[] = [
  // Engineering
  { id: 'u1', title: 'B.Tech Computer Science', description: 'Software development, AI, and data science', duration: '4 years', level: 'Undergraduate', category: 'Engineering', provider: 'IITs/NITs/Private', rating: 4.9 },
  { id: 'u2', title: 'B.Tech Electronics & Communication', description: 'Hardware design and telecommunications', duration: '4 years', level: 'Undergraduate', category: 'Engineering', provider: 'IITs/NITs/Private', rating: 4.7 },
  { id: 'u3', title: 'B.Tech Mechanical Engineering', description: 'Design and manufacturing systems', duration: '4 years', level: 'Undergraduate', category: 'Engineering', provider: 'IITs/NITs/Private', rating: 4.6 },
  { id: 'u4', title: 'B.Tech Civil Engineering', description: 'Infrastructure and construction', duration: '4 years', level: 'Undergraduate', category: 'Engineering', provider: 'IITs/NITs/Private', rating: 4.5 },
  
  // Medical
  { id: 'u5', title: 'MBBS', description: 'Bachelor of Medicine and Surgery', duration: '5.5 years', level: 'Undergraduate', category: 'Medical', provider: 'AIIMS/Government/Private', rating: 4.9 },
  { id: 'u6', title: 'BDS', description: 'Bachelor of Dental Surgery', duration: '5 years', level: 'Undergraduate', category: 'Medical', provider: 'Government/Private', rating: 4.6 },
  { id: 'u7', title: 'B.Pharm', description: 'Pharmaceutical sciences and drug development', duration: '4 years', level: 'Undergraduate', category: 'Medical', provider: 'Government/Private', rating: 4.5 },
  
  // Commerce & Business
  { id: 'u8', title: 'B.Com (Honours)', description: 'Advanced commerce and accounting', duration: '3 years', level: 'Undergraduate', category: 'Commerce', provider: 'DU/Top Universities', rating: 4.6 },
  { id: 'u9', title: 'BBA', description: 'Business administration and management', duration: '3 years', level: 'Undergraduate', category: 'Commerce', provider: 'Top Universities', rating: 4.5 },
  { id: 'u10', title: 'CA Foundation', description: 'Chartered Accountancy pathway', duration: '3-4 years', level: 'Undergraduate', category: 'Commerce', provider: 'ICAI', rating: 4.8 },
  
  // Arts & Design
  { id: 'u11', title: 'BA Economics', description: 'Economic theory and policy analysis', duration: '3 years', level: 'Undergraduate', category: 'Arts', provider: 'Top Universities', rating: 4.6 },
  { id: 'u12', title: 'BA Psychology', description: 'Understanding human behavior and mind', duration: '3 years', level: 'Undergraduate', category: 'Arts', provider: 'Top Universities', rating: 4.5 },
  { id: 'u13', title: 'B.Des (Design)', description: 'Product, graphic, and UX design', duration: '4 years', level: 'Undergraduate', category: 'Design', provider: 'NID/NIFT/Private', rating: 4.7 },
  
  // Science
  { id: 'u14', title: 'B.Sc Physics', description: 'Fundamental physics and research', duration: '3 years', level: 'Undergraduate', category: 'Science', provider: 'Top Universities', rating: 4.5 },
  { id: 'u15', title: 'B.Sc Data Science', description: 'Statistics, ML, and analytics', duration: '3 years', level: 'Undergraduate', category: 'Science', provider: 'Top Universities', rating: 4.8 },
];

export const postgraduateCourses: Course[] = [
  // India PG
  { id: 'p1', title: 'M.Tech (IITs/NITs)', description: 'Advanced engineering specialization', duration: '2 years', level: 'Postgraduate', category: 'Engineering', provider: 'India - IITs/NITs', rating: 4.9 },
  { id: 'p2', title: 'MBA (IIMs)', description: 'Premier business management program', duration: '2 years', level: 'Postgraduate', category: 'Business', provider: 'India - IIMs', rating: 4.9 },
  { id: 'p3', title: 'MD/MS (Medical)', description: 'Medical specialization programs', duration: '3 years', level: 'Postgraduate', category: 'Medical', provider: 'India - AIIMS/Top Medical', rating: 4.9 },
  { id: 'p4', title: 'M.Sc (Research)', description: 'Research-oriented science programs', duration: '2 years', level: 'Postgraduate', category: 'Science', provider: 'India - IISc/TIFR', rating: 4.8 },
  { id: 'p5', title: 'MA Economics', description: 'Advanced economic theory and research', duration: '2 years', level: 'Postgraduate', category: 'Arts', provider: 'India - DSE/JNU', rating: 4.7 },
  
  // Abroad PG
  { id: 'p6', title: 'MS in Computer Science (USA)', description: 'Advanced CS from top US universities', duration: '2 years', level: 'Postgraduate', category: 'Engineering', provider: 'Abroad - USA', rating: 4.9 },
  { id: 'p7', title: 'MBA (USA/UK)', description: 'Global business education', duration: '1-2 years', level: 'Postgraduate', category: 'Business', provider: 'Abroad - USA/UK', rating: 4.9 },
  { id: 'p8', title: 'MS in Data Science (Europe)', description: 'Data science from European universities', duration: '2 years', level: 'Postgraduate', category: 'Engineering', provider: 'Abroad - Germany/Netherlands', rating: 4.8 },
  { id: 'p9', title: 'MSc Management (UK)', description: 'Management programs from UK universities', duration: '1 year', level: 'Postgraduate', category: 'Business', provider: 'Abroad - UK', rating: 4.7 },
  { id: 'p10', title: 'PhD Programs (Global)', description: 'Research doctorate opportunities worldwide', duration: '4-6 years', level: 'Postgraduate', category: 'Research', provider: 'Abroad - Global', rating: 4.9 },
];

export const professionalCourses: Course[] = [
  // Skill Development
  { id: 'pr1', title: 'Full Stack Web Development', description: 'Complete web development bootcamp', duration: '6 months', level: 'Professional', category: 'Skill Development', provider: 'Coursera/Udemy', rating: 4.8 },
  { id: 'pr2', title: 'Data Science & Machine Learning', description: 'Comprehensive ML and AI program', duration: '8 months', level: 'Professional', category: 'Skill Development', provider: 'Coursera/DataCamp', rating: 4.8 },
  { id: 'pr3', title: 'Digital Marketing Mastery', description: 'SEO, SEM, and social media marketing', duration: '4 months', level: 'Professional', category: 'Skill Development', provider: 'Google/HubSpot', rating: 4.6 },
  { id: 'pr4', title: 'Cloud Computing (AWS/Azure)', description: 'Cloud architecture and services', duration: '5 months', level: 'Professional', category: 'Skill Development', provider: 'AWS/Microsoft', rating: 4.7 },
  { id: 'pr5', title: 'UI/UX Design', description: 'User interface and experience design', duration: '4 months', level: 'Professional', category: 'Skill Development', provider: 'Coursera/Udemy', rating: 4.6 },
  
  // Certifications
  { id: 'pr6', title: 'AWS Solutions Architect', description: 'Cloud architecture certification', duration: '3 months', level: 'Professional', category: 'Certification', provider: 'AWS', rating: 4.9 },
  { id: 'pr7', title: 'PMP Certification', description: 'Project Management Professional', duration: '4 months', level: 'Professional', category: 'Certification', provider: 'PMI', rating: 4.8 },
  { id: 'pr8', title: 'Google Data Analytics', description: 'Professional data analytics certificate', duration: '6 months', level: 'Professional', category: 'Certification', provider: 'Google', rating: 4.7 },
  { id: 'pr9', title: 'Certified Scrum Master', description: 'Agile project management certification', duration: '2 months', level: 'Professional', category: 'Certification', provider: 'Scrum Alliance', rating: 4.6 },
  { id: 'pr10', title: 'Six Sigma Green Belt', description: 'Process improvement certification', duration: '3 months', level: 'Professional', category: 'Certification', provider: 'ASQ', rating: 4.5 },
];

export const interestAreas = [
  'Technology & Computer Science',
  'Medical & Healthcare',
  'Business & Management',
  'Engineering & Manufacturing',
  'Arts & Design',
  'Science & Research',
  'Finance & Accounting',
  'Law & Public Policy',
  'Media & Communication',
  'Education & Teaching',
];

export const skillTestQuestions = [
  { id: 1, question: 'I enjoy solving complex mathematical problems', category: 'analytical' },
  { id: 2, question: 'I like working with computers and technology', category: 'technology' },
  { id: 3, question: 'I am interested in understanding how the human body works', category: 'medical' },
  { id: 4, question: 'I enjoy creative activities like art and design', category: 'creative' },
  { id: 5, question: 'I like reading about business and economics', category: 'business' },
  { id: 6, question: 'I am fascinated by how things are built and work', category: 'engineering' },
  { id: 7, question: 'I enjoy writing and communication', category: 'communication' },
  { id: 8, question: 'I like helping and teaching others', category: 'social' },
];
