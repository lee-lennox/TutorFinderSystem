import { apiClient } from './api';
import { User, LoginRequest, AuthResponse, RegisterRequest, ApiResponse } from '@types/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = 'user';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const payload = {
      username: credentials.identifier,
      password: credentials.password,
    };
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);

    if (response.data) {
      const user: User = {
        username: credentials.identifier,
        email: response.data.email ?? credentials.identifier,
        role: response.data.role ?? 'USER',
      };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }

    return response.data;
  },

  async register(data: RegisterRequest): Promise<ApiResponse<number>> {
    const response = await apiClient.post<ApiResponse<number>>('/auth/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  async forgotPassword(email: string): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>('/auth/request-password-reset', { email });
    return response.data;
  },

  async resetPassword(email: string, code: string, newPassword: string): Promise<ApiResponse<any>> {
    const response = await apiClient.post<ApiResponse<any>>('/auth/reset-password', {
      email,
      code,
      newPassword,
    });
    return response.data;
  },
};
