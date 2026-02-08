export enum SocialPlatform {
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  WHATSAPP = 'WhatsApp'
}

export enum PostStatus {
  SCHEDULED = 'Scheduled',
  POSTED = 'Posted',
  FAILED = 'Failed'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  connected: boolean;
  handle?: string;
  lastSync?: string;
}

export interface Hadith {
  id: string;
  arabicText: string;
  translation: string;
  source: string; // e.g., "Sahih Al-Bukhari 1"
  grade: string; // e.g., "Sahih"
}

export interface ScheduledPost {
  id: string;
  hadith: Hadith;
  scheduledTime: string; // ISO string
  platforms: SocialPlatform[];
  status: PostStatus;
  caption?: string; // AI generated caption
}

export interface PostedHistoryItem {
  id: string;
  hadithId: string;
  hadithSource: string;
  postedAt: string;
  platforms: SocialPlatform[];
  status: PostStatus;
  likes?: number;
  shares?: number;
}
