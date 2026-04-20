import { apiClient } from './api';
import { Course, PaginatedResponse } from '@types/index';

function paginate<T>(items: T[], page: number, limit: number): PaginatedResponse<T> {
  const total = items.length;
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return {
    data,
    total,
    page,
    pageSize: limit,
    hasMore: start + limit < total,
  };
}

export const courseService = {
  async getCourses(page = 1, limit = 10): Promise<PaginatedResponse<Course>> {
    const response = await apiClient.get<Course[]>('/courses/all');
    return paginate(response.data || [], page, limit);
  },

  async getCourseById(id: string): Promise<Course> {
    const response = await apiClient.get<Course>(`/courses/read/${id}`);
    return response.data;
  },

  async searchCourses(query: string, page = 1, limit = 10): Promise<PaginatedResponse<Course>> {
    const response = await apiClient.get<Course[]>('/courses/all');
    const filtered = response.data.filter((course) => {
      const normalizedQuery = query.toLowerCase();
      return (
        course.name.toLowerCase().includes(normalizedQuery) ||
        course.code.toLowerCase().includes(normalizedQuery) ||
        course.description?.toLowerCase().includes(normalizedQuery)
      );
    });
    return paginate(filtered, page, limit);
  },

  async getCategories(): Promise<string[]> {
    const response = await apiClient.get<Course[]>('/courses/all');
    const codes = Array.from(new Set(response.data.map((course) => course.code || ''))).filter(Boolean);
    return codes;
  },
};
