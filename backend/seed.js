const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const sampleUsers = [
  {
    id: 'u1',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    role: 'veteran',
    militaryBranch: 'Army',
    rank: 'Sergeant',
    enrollmentDate: '2023-10-01',
    progress: 82,
    avatar: 'https://picsum.photos/seed/alex/100/100'
  },
  {
    id: 'u2',
    name: 'Sarah Connor',
    email: 'sarah.connor@email.com',
    role: 'veteran',
    militaryBranch: 'Marines',
    rank: 'Corporal',
    enrollmentDate: '2023-11-05',
    progress: 95,
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'u3',
    name: 'Maj. Robert Sterling',
    email: 'robert.sterling@email.com',
    role: 'teacher',
    militaryBranch: 'Army',
    rank: 'Major',
    enrollmentDate: '2023-01-01',
    specialties: ['Project Management', 'Leadership'],
    avatar: 'https://picsum.photos/seed/robert/100/100'
  },
  {
    id: 'u4',
    name: 'Sgt. Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    role: 'teacher',
    militaryBranch: 'Air Force',
    rank: 'Sergeant',
    enrollmentDate: '2023-02-15',
    specialties: ['Cybersecurity', 'IT'],
    avatar: 'https://picsum.photos/seed/maria/100/100'
  },
  {
    id: 'u5',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    role: 'veteran',
    militaryBranch: 'Navy',
    rank: 'Petty Officer',
    enrollmentDate: '2024-01-20',
    progress: 60,
    avatar: 'https://picsum.photos/seed/james/100/100'
  }
];

const sampleCourses = [
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
  },
  {
    id: '2',
    title: 'Cybersecurity Fundamentals',
    provider: 'TechForce Academy',
    category: 'Information Technology',
    duration: '30 hours',
    progress: 0,
    image: 'https://picsum.photos/seed/cyber/800/400',
    difficulty: 'Intermediate',
    instructor: 'Sgt. Maria Rodriguez',
    instructorAvatar: 'https://picsum.photos/seed/instructor2/100/100',
    description: 'Learn essential cybersecurity concepts and practices to protect digital assets in civilian organizations.',
    rating: 4.7,
    reviews: 95,
    syllabus: [
      { id: 'm1', title: 'Network Security Basics', duration: '3h' },
      { id: 'm2', title: 'Threat Detection and Response', duration: '4h' },
      { id: 'm3', title: 'Security Policies and Compliance', duration: '3h' }
    ]
  },
  {
    id: '3',
    title: 'Leadership in Civilian Organizations',
    provider: 'VetPath Academy',
    category: 'Leadership',
    duration: '25 hours',
    progress: 100,
    image: 'https://picsum.photos/seed/leadership/800/400',
    difficulty: 'Intermediate',
    instructor: 'Maj. Robert Sterling',
    instructorAvatar: 'https://picsum.photos/seed/instructor1/100/100',
    description: 'Translate military leadership experience into effective civilian management skills.',
    rating: 4.8,
    reviews: 67,
    syllabus: [
      { id: 'm1', title: 'Military vs. Corporate Leadership', duration: '3h' },
      { id: 'm2', title: 'Team Building and Motivation', duration: '4h' },
      { id: 'm3', title: 'Conflict Resolution', duration: '3h' }
    ]
  },
  {
    id: '4',
    title: 'Infantry to Security Specialist Transition (MOS 11B)',
    provider: 'VetPath Academy',
    category: 'Security & Law Enforcement',
    duration: '35 hours',
    progress: 0,
    image: 'https://picsum.photos/seed/infantry/800/400',
    difficulty: 'Intermediate',
    instructor: 'Maj. Robert Sterling',
    instructorAvatar: 'https://picsum.photos/seed/instructor1/100/100',
    description: 'Tailored for Army Infantrymen (MOS 11B), this course translates tactical skills, risk assessment, and team coordination into civilian security roles like private security, loss prevention, and protective services.',
    rating: 4.6,
    reviews: 42,
    syllabus: [
      { id: 'm1', title: 'Translating Infantry Tactics to Security Protocols', duration: '4h' },
      { id: 'm2', title: 'Risk Assessment and Threat Mitigation', duration: '5h' },
      { id: 'm3', title: 'Emergency Response and Crisis Management', duration: '4h' },
      { id: 'm4', title: 'Building Civilian Security Networks', duration: '3h' }
    ]
  },
  {
    id: '5',
    title: 'Marine Rifleman Career Pivot (MOS 0311)',
    provider: 'VetPath Academy',
    category: 'Security & Logistics',
    duration: '32 hours',
    progress: 0,
    image: 'https://picsum.photos/seed/marine/800/400',
    difficulty: 'Intermediate',
    instructor: 'Sgt. Maria Rodriguez',
    instructorAvatar: 'https://picsum.photos/seed/instructor2/100/100',
    description: 'Designed for Marine Riflemen (MOS 0311), this course bridges combat experience with civilian careers in security, logistics, and operational management, emphasizing discipline, precision, and adaptability.',
    rating: 4.7,
    reviews: 38,
    syllabus: [
      { id: 'm1', title: 'From Combat Operations to Civilian Logistics', duration: '4h' },
      { id: 'm2', title: 'Precision Planning and Execution', duration: '5h' },
      { id: 'm3', title: 'Team Leadership in High-Stress Environments', duration: '4h' },
      { id: 'm4', title: 'Adapting Marine Discipline to Corporate Culture', duration: '3h' }
    ]
  }
];

const sampleCertifications = [
  {
    id: 'cert1',
    name: 'Project Management Professional (PMP)',
    title: 'Project Management Professional (PMP)',
    issuer: 'PMI',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    userId: 'u1',
    status: 'active',
    veteranId: 'u1',
    veteranName: 'Alex Thompson',
    credentialId: 'PMP-88219-TX',
    evidenceUrl: 'pmp_cert.pdf',
    auditTrail: [
      { id: 'a1', action: 'Uploaded', date: '2024-01-16', actor: 'Alex Thompson' },
      { id: 'a2', action: 'Verified', date: '2024-01-18', actor: 'Maj. Robert Sterling', comment: 'Credential ID verified against PMI registry.' }
    ]
  },
  {
    id: 'cert2',
    name: 'CompTIA Security+',
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    issueDate: '2024-05-10',
    expiryDate: '2027-05-10',
    userId: 'u1',
    status: 'pending',
    veteranId: 'u1',
    veteranName: 'Alex Thompson',
    credentialId: 'SEC-PLUS-1122',
    evidenceUrl: 'sec_plus.jpg',
    auditTrail: [
      { id: 'a3', action: 'Uploaded', date: '2024-05-11', actor: 'Alex Thompson' }
    ]
  },
  {
    id: 'cert3',
    name: 'Certified Information Systems Security Professional (CISSP)',
    title: 'Certified Information Systems Security Professional (CISSP)',
    issuer: '(ISC)²',
    issueDate: '2024-04-20',
    expiryDate: '2027-04-20',
    userId: 'u2',
    status: 'active',
    veteranId: 'u2',
    veteranName: 'Sarah Connor',
    credentialId: 'CISSP-99001',
    evidenceUrl: 'cissp_proof.pdf',
    auditTrail: [
      { id: 'a5', action: 'Uploaded', date: '2024-04-21', actor: 'Sarah Connor' }
    ]
  }
];

const sampleMentors = [
  {
    id: 'm1',
    name: 'Sarah Johnson',
    role: 'Senior Project Manager',
    company: 'Amazon',
    militaryBranch: 'U.S. Army',
    specialties: ['Operations', 'Agile', 'Resume Review'],
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: 'm2',
    name: 'Michael Chen',
    role: 'Cybersecurity Analyst',
    company: 'Google',
    militaryBranch: 'U.S. Navy',
    specialties: ['Network Security', 'Threat Analysis', 'Career Transition'],
    avatar: 'https://picsum.photos/seed/michael/100/100'
  },
  {
    id: 'm3',
    name: 'Jessica Lee',
    role: 'HR Director',
    company: 'Microsoft',
    militaryBranch: 'U.S. Air Force',
    specialties: ['Hiring', 'Leadership', 'Culture Fit'],
    avatar: 'https://picsum.photos/seed/jessica/100/100'
  }
];

const samplePrograms = [
  {
    id: 'prog1',
    name: 'IT Transition Program',
    title: 'IT Transition Program',
    description: 'A comprehensive 12-week intensive designed to pivot combat-arms veterans into junior systems administration roles.',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    participants: ['u1', 'u2', 'u5'],
    status: 'active'
  },
  {
    id: 'prog2',
    name: 'Project Management Bootcamp',
    title: 'Project Management Bootcamp',
    description: 'Fast-track program for NCOs and officers to earn PMP certification and transition into project management roles.',
    startDate: '2024-01-15',
    endDate: '2024-03-10',
    participants: ['u1', 'u3'],
    status: 'active'
  }
];

const sampleAttendance = [
  {
    id: 'att1',
    studentId: 'u1',
    studentName: 'Alex Thompson',
    userId: 'u1',
    branch: 'Army',
    lastActive: '2024-01-27T10:00:00Z',
    enrollmentDate: '2023-10-01',
    status: 'present',
    date: '2024-01-27',
    progress: 82
  },
  {
    id: 'att2',
    studentId: 'u2',
    studentName: 'Sarah Connor',
    userId: 'u2',
    branch: 'Marines',
    lastActive: '2024-01-27T09:50:00Z',
    enrollmentDate: '2023-11-05',
    status: 'present',
    date: '2024-01-27',
    progress: 95
  },
  {
    id: 'att3',
    studentId: 'u5',
    studentName: 'James Wilson',
    userId: 'u5',
    branch: 'Navy',
    lastActive: '2024-01-26T16:00:00Z',
    enrollmentDate: '2024-01-20',
    status: 'absent',
    date: '2024-01-27',
    progress: 60
  }
];

const sampleResources = [
  {
    id: 'r1',
    title: 'Military Skills Translator Guide',
    type: 'document',
    url: 'military_skills_guide.pdf',
    category: 'Career Transition',
    tags: ['skills', 'translation', 'guide'],
    uploadedBy: 'Maj. Robert Sterling',
    uploadDate: '2024-01-01'
  },
  {
    id: 'r2',
    title: 'Resume Writing Workshop Recording',
    type: 'video',
    url: 'resume_workshop.mp4',
    category: 'Resume Building',
    tags: ['resume', 'workshop', 'video'],
    uploadedBy: 'Sgt. Maria Rodriguez',
    uploadDate: '2024-01-15'
  },
  {
    id: 'r3',
    title: 'LinkedIn Profile Optimization Guide',
    type: 'article',
    url: 'https://example.com/linkedin-guide',
    category: 'Career Transition',
    tags: ['linkedin', 'profile', 'networking'],
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2024-01-20'
  }
];

const sampleForumPosts = [
  {
    id: 'p1',
    author: 'John Doe (Army Vet)',
    title: 'Tips for translating leadership skills to corporate?',
    content: 'Just finished my transition. How did you guys describe commanding a platoon on a tech resume?',
    date: '2024-01-25T14:30:00Z',
    likes: 24,
    replies: 12
  },
  {
    id: 'p2',
    author: 'Jane Smith (Navy Vet)',
    title: 'Best resources for PMP prep?',
    content: 'I\'m starting the PMP course next week. Any recommended study materials or tips?',
    date: '2024-01-24T09:15:00Z',
    likes: 18,
    replies: 8
  },
  {
    id: 'p3',
    author: 'Robert Martinez (AF Vet)',
    title: 'Salary negotiation strategies for veterans',
    content: 'Anyone have experience negotiating higher salaries after transition?',
    date: '2024-01-23T16:45:00Z',
    likes: 35,
    replies: 22
  }
];

const sampleSkills = [
  {
    id: 'skill1',
    name: 'Leadership',
    category: 'Soft Skills',
    level: 'expert',
    userId: 'u1',
    verified: true
  },
  {
    id: 'skill2',
    name: 'Project Management',
    category: 'Professional',
    level: 'advanced',
    userId: 'u1',
    verified: true
  },
  {
    id: 'skill3',
    name: 'Cybersecurity',
    category: 'Technical',
    level: 'intermediate',
    userId: 'u5',
    verified: false
  }
];

const sampleResumes = [
  {
    id: 'res1',
    userId: 'u1',
    title: 'Military to Corporate - Version 1',
    content: 'Sample resume content for Alex Thompson',
    lastModified: '2024-01-20T10:00:00Z',
    version: 1
  },
  {
    id: 'res2',
    userId: 'u2',
    title: 'Sarah Connor - Tech Resume',
    content: 'Sample resume content for Sarah Connor',
    lastModified: '2024-01-25T15:30:00Z',
    version: 2
  }
];

const sampleInterviews = [
  {
    id: 'int1',
    userId: 'u1',
    company: 'Microsoft',
    position: 'Project Manager',
    date: '2024-02-10T14:00:00Z',
    status: 'scheduled',
    feedback: null,
    rating: null
  },
  {
    id: 'int2',
    userId: 'u2',
    company: 'Google',
    position: 'Security Engineer',
    date: '2024-01-28T10:00:00Z',
    status: 'completed',
    feedback: 'Great technical knowledge, excellent communication',
    rating: 5
  }
];

const sampleMentorship = [
  {
    id: 'ment1',
    mentorId: 'm1',
    menteeId: 'u1',
    startDate: '2024-01-15',
    endDate: null,
    status: 'active',
    focusArea: 'Project Management Transition'
  },
  {
    id: 'ment2',
    mentorId: 'm2',
    menteeId: 'u5',
    startDate: '2024-01-20',
    endDate: null,
    status: 'active',
    focusArea: 'Cybersecurity Career Path'
  }
];

const sampleSettings = [
  {
    id: 'set1',
    userId: 'u1',
    key: 'emailNotifications',
    value: true
  },
  {
    id: 'set2',
    userId: 'u1',
    key: 'theme',
    value: 'dark'
  }
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('vetpath');

    // Drop existing collections
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
      await db.collection(collection.name).deleteMany({});
      console.log(`Cleared ${collection.name}`);
    }

    // Seed Users
    const usersCollection = db.collection('users');
    await usersCollection.insertMany(sampleUsers);
    console.log(`Inserted ${sampleUsers.length} users`);

    // Seed Courses
    const coursesCollection = db.collection('courses');
    await coursesCollection.insertMany(sampleCourses);
    console.log(`Inserted ${sampleCourses.length} courses`);

    // Seed Certifications
    const certificationsCollection = db.collection('certifications');
    await certificationsCollection.insertMany(sampleCertifications);
    console.log(`Inserted ${sampleCertifications.length} certifications`);

    // Seed Mentors
    const mentorsCollection = db.collection('mentors');
    await mentorsCollection.insertMany(sampleMentors);
    console.log(`Inserted ${sampleMentors.length} mentors`);

    // Seed Programs
    const programsCollection = db.collection('programs');
    await programsCollection.insertMany(samplePrograms);
    console.log(`Inserted ${samplePrograms.length} programs`);

    // Seed Attendance
    const attendanceCollection = db.collection('attendance');
    await attendanceCollection.insertMany(sampleAttendance);
    console.log(`Inserted ${sampleAttendance.length} attendance records`);

    // Seed Resources
    const resourcesCollection = db.collection('resources');
    await resourcesCollection.insertMany(sampleResources);
    console.log(`Inserted ${sampleResources.length} resources`);

    // Seed Forum Posts
    const forumPostsCollection = db.collection('forum_posts');
    await forumPostsCollection.insertMany(sampleForumPosts);
    console.log(`Inserted ${sampleForumPosts.length} forum posts`);

    // Seed Skills
    const skillsCollection = db.collection('skills');
    await skillsCollection.insertMany(sampleSkills);
    console.log(`Inserted ${sampleSkills.length} skills`);

    // Seed Resumes
    const resumesCollection = db.collection('resumes');
    await resumesCollection.insertMany(sampleResumes);
    console.log(`Inserted ${sampleResumes.length} resumes`);

    // Seed Interviews
    const interviewsCollection = db.collection('interviews');
    await interviewsCollection.insertMany(sampleInterviews);
    console.log(`Inserted ${sampleInterviews.length} interviews`);

    // Seed Mentorship
    const mentorshipCollection = db.collection('mentorship');
    await mentorshipCollection.insertMany(sampleMentorship);
    console.log(`Inserted ${sampleMentorship.length} mentorship records`);

    // Seed Settings
    const settingsCollection = db.collection('settings');
    await settingsCollection.insertMany(sampleSettings);
    console.log(`Inserted ${sampleSettings.length} settings`);

    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

seedDatabase();