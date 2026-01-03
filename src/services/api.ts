import axios, { type AxiosInstance, type AxiosError } from 'axios';
import type {
  User,
  AuthTokens,
  LoginCredentials,
  RegisterData,
  SocialAccount,
  Post,
  FeedItem,
  PostMetrics,
  PlatformStats,
  Notification,
  PaginatedResponse,
  PaginationParams,
  Platform,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && originalRequest && !originalRequest.headers['X-Retry']) {
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            const response = await this.client.post<AuthTokens>('/auth/refresh', {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['X-Retry'] = 'true';
            
            return this.client(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.client.post('/auth/login', credentials);
    return response.data;
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.client.post('/auth/register', data);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  async getConnectedAccounts(): Promise<SocialAccount[]> {
    const response = await this.client.get('/accounts');
    return response.data;
  }

  async connectAccount(platform: Platform): Promise<{ authUrl: string }> {
    const response = await this.client.post(`/accounts/connect/${platform}`);
    return response.data;
  }

  async disconnectAccount(accountId: string): Promise<void> {
    await this.client.delete(`/accounts/${accountId}`);
  }

  async handleOAuthCallback(
    platform: Platform,
    code: string,
    state: string
  ): Promise<SocialAccount> {
    const response = await this.client.post(`/accounts/callback/${platform}`, {
      code,
      state,
    });
    return response.data;
  }

  async getFeed(params: PaginationParams): Promise<PaginatedResponse<FeedItem>> {
    const response = await this.client.get('/feed', { params });
    return response.data;
  }

  async getPosts(params: PaginationParams): Promise<PaginatedResponse<Post>> {
    const response = await this.client.get('/posts', { params });
    return response.data;
  }

  async createPost(data: {
    content?: string;
    selectedPlatforms?: Platform[];
    mediaUrls?: string[];
    scheduledFor?: string;
  }): Promise<Post> {
    const response = await this.client.post('/posts', data);
    return response.data;
  }

  async uploadMedia(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.client.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async schedulePost(postId: string, scheduledFor: string): Promise<Post> {
    const response = await this.client.put(`/posts/${postId}/schedule`, {
      scheduledFor,
    });
    return response.data;
  }

  async deletePost(postId: string): Promise<void> {
    await this.client.delete(`/posts/${postId}`);
  }

  async getPostMetrics(postId: string): Promise<PostMetrics[]> {
    const response = await this.client.get(`/posts/${postId}/metrics`);
    return response.data;
  }

  async getPlatformStats(): Promise<PlatformStats[]> {
    const response = await this.client.get('/analytics/platforms');
    return response.data;
  }

  async getNotifications(params: PaginationParams): Promise<PaginatedResponse<Notification>> {
    const response = await this.client.get('/notifications', { params });
    return response.data;
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.client.put(`/notifications/${notificationId}/read`);
  }

  async markAllNotificationsAsRead(): Promise<void> {
    await this.client.put('/notifications/read-all');
  }
}

export const apiClient = new ApiClient();
