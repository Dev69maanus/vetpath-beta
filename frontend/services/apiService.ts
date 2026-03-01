const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : '/api';

export interface Course {
  id: string;
  title: string;
  provider: string;
  category: string;
  duration: string;
  progress: number;
  image: string;
  difficulty: string;
  instructor: string;
  instructorAvatar: string;
  description: string;
  rating: number;
  reviews: number;
  syllabus: { id: string; title: string; duration: string }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  courseId?: string;
  studentId?: string;
  studentName?: string;
  branch?: string;
  lastActive?: string;
  enrollmentDate?: string;
  progress?: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  userId: string;
  status: 'active' | 'expired' | 'pending' | 'completed' | 'pending-review' | 'in-progress' | 'rejected' | 'planned';
  name?: string;
  veteranId?: string;
  veteranName?: string;
  credentialId?: string;
  evidenceUrl?: string;
  auditTrail?: { id: string; action: string; date: string; actor: string; comment?: string }[];
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

export interface Mentorship {
  id: string;
  mentorId: string;
  menteeId: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled';
  focusArea: string;
}

export interface Program {
  id: string;
  name?: string;
  title?: string;
  description: string;
  startDate?: string;
  endDate?: string;
  participants?: string[];
  status: 'active' | 'planning' | 'archived' | 'completed' | 'upcoming';
  instructor?: string;
  enrolledCount?: number;
  duration?: string;
  eligibility?: string;
  performance?: number;
  category?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'document' | 'link';
  url: string;
  category: string;
  tags: string[];
  uploadedBy: string;
  uploadDate: string;
}

export interface Setting {
  id: string;
  userId: string;
  key: string;
  value: any;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  userId: string;
  verified: boolean;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: string;
  lastModified: string;
  version: number;
}

export interface Interview {
  id: string;
  userId: string;
  company: string;
  position: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: string;
  rating?: number;
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

export const apiService = {
  // Users
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response.json();
  },

  // Courses
  async getCourses(): Promise<Course[]> {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  },

  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(course),
    });
    if (!response.ok) {
      throw new Error('Failed to create course');
    }
    return response.json();
  },

  // Attendance
  async getAttendance(): Promise<Attendance[]> {
    const response = await fetch(`${API_BASE_URL}/attendance`);
    if (!response.ok) {
      throw new Error('Failed to fetch attendance');
    }
    return response.json();
  },

  async createAttendance(attendance: Omit<Attendance, 'id'>): Promise<Attendance> {
    const response = await fetch(`${API_BASE_URL}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendance),
    });
    if (!response.ok) {
      throw new Error('Failed to create attendance record');
    }
    return response.json();
  },

  async updateAttendance(id: string, update: Partial<Attendance>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/attendance/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    if (!response.ok) {
      throw new Error('Failed to update attendance');
    }
  },

  // Certifications
  async getCertifications(): Promise<Certification[]> {
    const response = await fetch(`${API_BASE_URL}/certifications`);
    if (!response.ok) {
      throw new Error('Failed to fetch certifications');
    }
    return response.json();
  },

  async createCertification(certification: Omit<Certification, 'id'>): Promise<Certification> {
    const response = await fetch(`${API_BASE_URL}/certifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(certification),
    });
    if (!response.ok) {
      throw new Error('Failed to create certification');
    }
    return response.json();
  },

  async updateCertification(id: string, update: Partial<Certification>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/certifications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    });
    if (!response.ok) {
      throw new Error('Failed to update certification');
    }
  },

  // Mentors
  async getMentors(): Promise<Mentor[]> {
    const response = await fetch(`${API_BASE_URL}/mentors`);
    if (!response.ok) {
      throw new Error('Failed to fetch mentors');
    }
    return response.json();
  },

  async createMentor(mentor: Omit<Mentor, 'id'>): Promise<Mentor> {
    const response = await fetch(`${API_BASE_URL}/mentors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mentor),
    });
    if (!response.ok) {
      throw new Error('Failed to create mentor');
    }
    return response.json();
  },

  // Mentorship
  async getMentorship(): Promise<Mentorship[]> {
    const response = await fetch(`${API_BASE_URL}/mentorship`);
    if (!response.ok) {
      throw new Error('Failed to fetch mentorship records');
    }
    return response.json();
  },

  async createMentorship(mentorship: Omit<Mentorship, 'id'>): Promise<Mentorship> {
    const response = await fetch(`${API_BASE_URL}/mentorship`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mentorship),
    });
    if (!response.ok) {
      throw new Error('Failed to create mentorship record');
    }
    return response.json();
  },

  // Programs
  async getPrograms(): Promise<Program[]> {
    const response = await fetch(`${API_BASE_URL}/programs`);
    if (!response.ok) {
      throw new Error('Failed to fetch programs');
    }
    return response.json();
  },

  async createProgram(program: Omit<Program, 'id'>): Promise<Program> {
    const response = await fetch(`${API_BASE_URL}/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(program),
    });
    if (!response.ok) {
      throw new Error('Failed to create program');
    }
    return response.json();
  },

  // Resources
  async getResources(): Promise<Resource[]> {
    const response = await fetch(`${API_BASE_URL}/resources`);
    if (!response.ok) {
      throw new Error('Failed to fetch resources');
    }
    return response.json();
  },

  async createResource(resource: Omit<Resource, 'id'>): Promise<Resource> {
    const response = await fetch(`${API_BASE_URL}/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    });
    if (!response.ok) {
      throw new Error('Failed to create resource');
    }
    return response.json();
  },

  // Forum Posts
  async getForumPosts(): Promise<ForumPost[]> {
    const response = await fetch(`${API_BASE_URL}/forum-posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch forum posts');
    }
    return response.json();
  },

  async createForumPost(post: Omit<ForumPost, 'id'>): Promise<ForumPost> {
    const response = await fetch(`${API_BASE_URL}/forum-posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create forum post');
    }
    return response.json();
  },

  // Settings
  async getSettings(): Promise<Setting[]> {
    const response = await fetch(`${API_BASE_URL}/settings`);
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return response.json();
  },

  async createSetting(setting: Omit<Setting, 'id'>): Promise<Setting> {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setting),
    });
    if (!response.ok) {
      throw new Error('Failed to create setting');
    }
    return response.json();
  },

  // Skills
  async getSkills(): Promise<Skill[]> {
    const response = await fetch(`${API_BASE_URL}/skills`);
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    return response.json();
  },

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });
    if (!response.ok) {
      throw new Error('Failed to create skill');
    }
    return response.json();
  },

  // Resumes
  async getResumes(): Promise<Resume[]> {
    const response = await fetch(`${API_BASE_URL}/resumes`);
    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }
    return response.json();
  },

  async createResume(resume: Omit<Resume, 'id'>): Promise<Resume> {
    const response = await fetch(`${API_BASE_URL}/resumes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resume),
    });
    if (!response.ok) {
      throw new Error('Failed to create resume');
    }
    return response.json();
  },

  // Interviews
  async getInterviews(): Promise<Interview[]> {
    const response = await fetch(`${API_BASE_URL}/interviews`);
    if (!response.ok) {
      throw new Error('Failed to fetch interviews');
    }
    return response.json();
  },

  async createInterview(interview: Omit<Interview, 'id'>): Promise<Interview> {
    const response = await fetch(`${API_BASE_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(interview),
    });
    if (!response.ok) {
      throw new Error('Failed to create interview');
    }
    return response.json();
  },

  // Bookings
  async createBooking(bookingData: {
    mentorId: string;
    mentorName: string;
    userId: string;
    date: string;
    time: string;
    duration: number;
    timezone: string;
    message: string;
  }): Promise<{ id: string; status: string }> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return response.json();
  },
};
