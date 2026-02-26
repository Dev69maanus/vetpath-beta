
import { Course, Mentor, ForumPost, Program, Certification } from './types';

export const MOCK_CERTS: Certification[] = [
  {
    id: 'cert1',
    veteranId: 'v1',
    veteranName: 'Alex Thompson',
    name: 'Project Management Professional (PMP)',
    issuer: 'PMI',
    status: 'completed',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    credentialId: 'PMP-88219-TX',
    evidenceUrl: 'pmp_cert.pdf',
    auditTrail: [
      { id: 'a1', action: 'Uploaded', date: '2024-01-16', actor: 'Alex Thompson' },
      { id: 'a2', action: 'Verified', date: '2024-01-18', actor: 'Instr. Sterling', comment: 'Credential ID verified against PMI registry.' }
    ]
  },
  {
    id: 'cert2',
    veteranId: 'v1',
    veteranName: 'Alex Thompson',
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    status: 'pending-review',
    issueDate: '2024-05-10',
    expiryDate: '2027-05-10',
    credentialId: 'SEC-PLUS-1122',
    evidenceUrl: 'sec_plus.jpg',
    auditTrail: [
      { id: 'a3', action: 'Uploaded', date: '2024-05-11', actor: 'Alex Thompson' }
    ]
  },
  {
    id: 'cert3',
    veteranId: 'v1',
    veteranName: 'Alex Thompson',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    status: 'in-progress',
    auditTrail: [
      { id: 'a4', action: 'Plan Created', date: '2024-03-01', actor: 'Alex Thompson' }
    ]
  },
  {
    id: 'cert4',
    veteranId: 'v2',
    veteranName: 'Sarah Connor',
    name: 'Certified Information Systems Security Professional (CISSP)',
    issuer: '(ISC)²',
    status: 'pending-review',
    issueDate: '2024-04-20',
    expiryDate: '2027-04-20',
    credentialId: 'CISSP-99001',
    evidenceUrl: 'cissp_proof.pdf',
    auditTrail: [
      { id: 'a5', action: 'Uploaded', date: '2024-04-21', actor: 'Sarah Connor' }
    ]
  }
];

export const MOCK_PROGRAMS: Program[] = [
  {
    id: 'prog1',
    name: 'IT Transition Program',
    description: 'A comprehensive 12-week intensive designed to pivot combat-arms veterans into junior systems administration roles.',
    instructor: 'Cmdr. James Holden',
    enrolledCount: 24,
    duration: '12 Weeks',
    performance: 88,
    category: 'Information Technology',
    status: 'active',
    eligibility: 'Any MOS'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Project Management Professional (PMP) Prep',
    provider: 'VetPath Academy',
    category: 'Project Management',
    duration: '40 hours',
    progress: 45,
    image: 'https://picsum.photos/seed/pmp/800/400',
    difficulty: 'Advanced',
    instructor: 'Maj. Robert Sterling',
    instructorAvatar: 'https://picsum.photos/seed/instructor1/100/100',
    description: 'Designed specifically for military leaders, this course bridges the gap between tactical operations and corporate project management frameworks.',
    rating: 4.9,
    reviews: 128,
    syllabus: [
      { id: 'm1', title: 'Intro to Agile vs. Waterfall', duration: '2h' },
      { id: 'm2', title: 'The PMBOK Guide for Veterans', duration: '5h' },
      { id: 'm3', title: 'Stakeholder Management & Communications', duration: '4h' }
    ]
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: 'Sarah Johnson',
    role: 'Senior Project Manager',
    company: 'Amazon',
    militaryBranch: 'U.S. Army',
    specialties: ['Operations', 'Agile', 'Resume Review'],
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  }
];

export const MOCK_POSTS: ForumPost[] = [
  {
    id: 'p1',
    author: 'John Doe (Army Vet)',
    title: 'Tips for translating leadership skills to corporate?',
    content: 'Just finished my transition. How did you guys describe commanding a platoon on a tech resume?',
    date: '2 hours ago',
    likes: 24,
    replies: 12
  }
];
