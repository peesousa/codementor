
export enum UserRole {
  MENTEE = 'MENTEE',
  MENTOR = 'MENTOR',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  xp: number;
  streak: number;
  languages: string[];
  interests: string;
}

export interface Mentor extends User {
  title: string;
  company: string;
  skills: string[];
  hourlyRate: number;
  rating: number;
  reviews: number;
  isOnline: boolean;
  matchScore?: number;
  matchReason?: string;
}

export interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  topic: string;
  date: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  rating?: number;
  earnings?: number; // Para mentores
}

export type ViewState = 
  | 'AUTH'
  | 'ONBOARDING'
  | 'DASHBOARD' 
  | 'FIND_MENTOR' 
  | 'MY_SESSIONS'
  | 'WAR_ROOM' 
  | 'REPOSITORY' 
  | 'GAMIFICATION'
  | 'REQUESTS' 
  | 'AVAILABILITY'
  | 'HISTORY'
  | 'ADMIN_DASHBOARD' // Inclui Moderação, Usuários, Disputas
  | 'REPORTS' // Inclui Suporte/FAQ
  | 'SETTINGS';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

// Repository
export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: string;
  title: string; // Max 200
  difficulty: ProblemDifficulty;
  tags: string[];
  description: string; // Max 5000
  acceptanceRate: number;
  starterCode: string;
}

export interface Solution {
  code: string; // Max 10000
  language: string;
  submittedAt: Date;
}

// Requests
export type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface SessionRequest {
  id: string;
  requesterName: string;
  requesterAvatar: string;
  topic: string;
  proposedDate: string;
  status: RequestStatus;
  message: string; // Max 500
}

// Availability
export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// Gamification
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface RankingEntry {
  rank: number;
  userId: string;
  userName: string;
  points: number; // Max 1,000,000
}

// Feedback
export interface SessionFeedback {
  sessionId: string;
  rating: number; // 1-5
  comment: string; // Max 1000
  submittedAt: Date;
}

// Reports
export interface ReportMetric {
  label: string;
  value: string | number;
  change?: string;
}