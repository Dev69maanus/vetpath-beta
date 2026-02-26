
export enum AppView {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  PROGRAMS = 'programs',
  SKILLS_TRANSLATOR = 'translator',
  RESUME_REFINER = 'resume_refiner',
  INTERVIEW_COACH = 'interview_coach',
  COURSES = 'courses',
  CERTIFICATIONS = 'certifications',
  MENTORSHIP = 'mentorship',
  COMMUNITY = 'community',
  RESOURCES = 'resources',
  ATTENDANCE = 'attendance'
}

export type UserRole = 'veteran' | 'teacher' | null;

export type CertificationStatus = 'planned' | 'in-progress' | 'completed' | 'expired' | 'pending-review' | 'rejected';

export interface AuditEntry {
  id: string;
  action: string;
  date: string;
  actor: string;
  comment?: string;
}

export interface Certification {
  id: string;
  veteranId: string;
  veteranName: string;
  name: string;
  issuer: string;
  status: CertificationStatus;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  evidenceUrl?: string; // Simulated file path
  auditTrail: AuditEntry[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  category: string;
  duration: string;
  progress: number;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  instructorAvatar: string;
  description: string;
  rating: number;
  reviews: number;
  syllabus: CourseModule[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  instructor: string;
  enrolledCount: number;
  duration: string;
  eligibility: string;
  performance: number;
  category: string;
  status: 'active' | 'planning' | 'archived';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  militaryBranch: string;
  specialties: string[];
  avatar: string;
}

export interface ForumPost {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  replies: number;
}

export interface TranslationResult {
  civilianRole: string;
  relevance: string;
  matchingSkills: string[];
  suggestedCourses: string[];
  skillGaps: string[];
}

export interface ResumeRefinement {
  civilianVersion: string;
  whyItWorks: string;
}

export interface InterviewMessage {
  role: 'coach' | 'user';
  text: string;
  feedback?: string;
}

export interface BookingData {
  mentorId: string;
  mentorName: string;
  userId: string;
  date: string;
  time: string;
  duration: number;
  timezone: string;
  message: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export type BookingStatus = 'idle' | 'loading' | 'success' | 'error';
