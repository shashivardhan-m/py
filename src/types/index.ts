export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  fullName: string;
  password: string;
}

export const Platform = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  TIKTOK: 'tiktok',
} as const;

export type Platform = typeof Platform[keyof typeof Platform];

export interface SocialAccount {
  id: string;
  platform: Platform;
  platformUserId: string;
  username: string;
  displayName: string;
  profilePicture?: string;
  isActive: boolean;
  connectedAt: string;
  permissions: string[];
}

export interface Post {
  id: string;
  content: string;
  platforms: Platform[];
  mediaUrls?: string[];
  scheduledFor?: string;
  publishedAt?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedItem {
  id: string;
  platform: Platform;
  platformPostId: string;
  content: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  mediaUrls?: string[];
  likes: number;
  comments: number;
  shares: number;
  publishedAt: string;
  url: string;
}

export interface PostMetrics {
  postId: string;
  platform: Platform;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  engagement: number;
}

export interface PlatformStats {
  platform: Platform;
  followers: number;
  totalPosts: number;
  totalEngagement: number;
  avgEngagementRate: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface ComposerState {
  content: string;
  selectedPlatforms: Platform[];
  mediaFiles: File[];
  mediaUrls: string[];
  scheduledFor?: Date;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
