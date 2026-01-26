export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'Non-Binary',
}

export interface Character {
  id: string;
  name: string;
  gender: Gender;
  age: string;
  personality: string; // e.g., "Gentle", "Rational"
  tone: string; // e.g., "Warm", "Humorous"
  role: string; // e.g., "Friend", "Therapist"
  background: string;
  avatar: string;
  specialties: string[]; // New: Healing specialties
  usageCount?: number; 
  lastInteraction?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  emotion?: string; // Analysis of the message
}

export interface ChatSession {
  id: string;
  characterId: string;
  messages: Message[];
  lastMessageAt: number;
  unreadCount?: number;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  emotionTags: string[];
  category: 'Emotional' | 'Life' | 'Career' | 'Study';
  isSaved?: boolean;
  starterQuestions?: string[];
}

export interface MoodRecord {
  id: string;
  timestamp: number;
  emotion: string;
  note?: string;
  relatedSessionId?: string;
}

export type ViewState = 
  | 'auth' 
  | 'chat_list' // Tab 1: Session List
  | 'character_list' // Tab 2: Character Grid
  | 'topic_list' // Tab 3: Topics
  | 'profile' // Tab 4: User Profile
  | 'chat' // Active Chat Interface
  | 'character_detail' // Character Detail View
  | 'character_wizard' // Create/Edit Character (Steps)
  | 'topic_detail' // Topic Detail View
  | 'mood_journal' // Mood History
  | 'settings'; // Settings

export interface EmotionAnalysisResult {
  emotion: string;
  intensity: number; // 0-10
}