import { formatDistanceToNow, format } from 'date-fns';
import { Platform } from '../types';

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  return format(new Date(date), 'MMM dd, yyyy HH:mm');
};

export const formatRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getPlatformColor = (platform: Platform): string => {
  const colors: Record<Platform, string> = {
    [Platform.TWITTER]: 'bg-blue-400',
    [Platform.FACEBOOK]: 'bg-blue-600',
    [Platform.INSTAGRAM]: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    [Platform.LINKEDIN]: 'bg-blue-700',
    [Platform.TIKTOK]: 'bg-black',
  };
  return colors[platform] || 'bg-gray-500';
};

export const getPlatformIcon = (platform: Platform): string => {
  const icons: Record<Platform, string> = {
    [Platform.TWITTER]: '𝕏',
    [Platform.FACEBOOK]: 'f',
    [Platform.INSTAGRAM]: '📷',
    [Platform.LINKEDIN]: 'in',
    [Platform.TIKTOK]: '♪',
  };
  return icons[platform] || '?';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const calculateEngagementRate = (
  likes: number,
  comments: number,
  shares: number,
  impressions: number
): number => {
  if (impressions === 0) return 0;
  return ((likes + comments + shares) / impressions) * 100;
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

export const isVideoFile = (file: File): boolean => {
  return file.type.startsWith('video/');
};
