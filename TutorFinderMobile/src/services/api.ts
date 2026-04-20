import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API endpoint - update this based on your deployment
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8080/TutorFinderSystem/api';

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

class ApiClient {
  private client: AxiosInstance;
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token and logging
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.metadata = { startTime: Date.now() };

        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle auth errors and caching
    this.client.interceptors.response.use(
      (response) => {
        const duration = Date.now() - (response.config.metadata?.startTime || 0);
        console.log(`✅ API Response: ${response.status} ${response.config.url} (${duration}ms)`);

        // Cache GET responses
        if (response.config.method?.toLowerCase() === 'get') {
          this.setCache(response.config.url!, response.data);
        }

        return response;
      },
      async (error) => {
        const duration = Date.now() - (error.config?.metadata?.startTime || 0);
        console.error(`❌ API Error: ${error.response?.status} ${error.config?.url} (${duration}ms)`, error.response?.data);

        if (error.response?.status === 401) {
          // Token expired, clear auth and redirect to login
          await this.clearAuthData();
        }

        // Extract error message from backend
        const message = this.extractErrorMessage(error);
        const enhancedError = {
          ...error,
          message,
          status: error.response?.status,
          code: error.code,
        };

        return Promise.reject(enhancedError);
      }
    );
  }

  private extractErrorMessage(error: any): string {
    const data = error.response?.data;
    return (
      data?.message ||
      data?.error ||
      data?.detail ||
      data?.title ||
      (typeof data === 'string' ? data : undefined) ||
      error.message ||
      'Request failed'
    );
  }

  private async clearAuthData() {
    await AsyncStorage.multiRemove(['authToken', 'userEmail', 'userRole', 'userData']);
  }

  private getCacheKey(url: string): string {
    return url;
  }

  private getCache(url: string): any | null {
    const key = this.getCacheKey(url);
    const entry = this.cache.get(key);

    if (entry && Date.now() - entry.timestamp < entry.ttl) {
      console.log(`📋 Cache hit: ${url}`);
      return entry.data;
    }

    if (entry) {
      this.cache.delete(key);
    }

    return null;
  }

  private setCache(url: string, data: any, ttl = this.CACHE_TTL) {
    const key = this.getCacheKey(url);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private async retryRequest(config: AxiosRequestConfig, retries = 3): Promise<AxiosResponse> {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.client.request(config);
      } catch (error: any) {
        if (i === retries - 1 || error.response?.status < 500) {
          throw error;
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    throw new Error('Max retries exceeded');
  }

  // Enhanced HTTP methods with caching and retry logic
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // Check cache first for GET requests
    const cached = this.getCache(url);
    if (cached) {
      return {
        data: cached,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { url } as any,
      } as AxiosResponse<T>;
    }

    return this.retryRequest({ ...config, method: 'get', url });
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.retryRequest({ ...config, method: 'post', url, data });
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.retryRequest({ ...config, method: 'put', url, data });
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.retryRequest({ ...config, method: 'delete', url });
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.retryRequest({ ...config, method: 'patch', url, data });
  }

  // Utility methods
  clearCache() {
    this.cache.clear();
  }

  clearCacheEntry(url: string) {
    this.cache.delete(this.getCacheKey(url));
  }

  // Auth methods
  async setAuthToken(token: string) {
    await AsyncStorage.setItem('authToken', token);
  }

  async getAuthToken(): Promise<string | null> {
    return AsyncStorage.getItem('authToken');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return !!token;
  }

  async logout() {
    await this.clearAuthData();
    this.clearCache();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
        
        return Promise.reject(new Error(message));
      }
    );
  }

  get<T>(url: string, params?: any) {
    return this.client.get<T>(url, { params });
  }

  post<T>(url: string, data?: any) {
    return this.client.post<T>(url, data);
  }

  put<T>(url: string, data?: any) {
    return this.client.put<T>(url, data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url);
  }
}

export const apiClient = new ApiClient();
