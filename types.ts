
export enum UserRole {
  VISITOR = 'Visitor',
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Platform Admin'
}

export enum ViewState {
  HOME = 'HOME',
  PLATFORM_INTRO = 'PLATFORM_INTRO',
  AI_COMPANION = 'AI_COMPANION',
  SKILL_ANALYSIS = 'SKILL_ANALYSIS',
  LEARNING_ANALYSIS = 'LEARNING_ANALYSIS',
  PROCESS_DATA = 'PROCESS_DATA',
  // Kept for backward compatibility if needed, though mapped to new views
  AUTO_SCORING = 'AUTO_SCORING', 
  STATS = 'STATS',
  THIRD_PARTY = 'THIRD_PARTY'
}

export type Language = 'zh' | 'en';

export interface SkillNode {
  id: string;
  group: number;
  val: number; // Size/Importance
  label: string;
}

export interface SkillLink {
  source: string;
  target: string;
}

export interface SkillGraphData {
  nodes: SkillNode[];
  links: SkillLink[];
}

export interface StudentProfile {
  name: string;
  id: string;
  attendance: number;
  assignments: number;
  quizScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendedJobs: string[];
}
