import { apiClient } from './api';
import { Tutor, PaginatedResponse } from '@types/index';

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

export const tutorService = {
  async getTutors(page = 1, limit = 10): Promise<PaginatedResponse<Tutor>> {
    const response = await apiClient.get<Tutor[]>('/tutors/all');
    return paginate(response.data || [], page, limit);
  },

  async getTutorById(id: string): Promise<Tutor> {
    const response = await apiClient.get<Tutor>(`/tutors/read/${id}`);
    return response.data;
  },

  async searchTutors(query: string, page = 1, limit = 10): Promise<PaginatedResponse<Tutor>> {
    const response = await apiClient.get<Tutor[]>('/tutors/all');
    const filtered = response.data.filter((tutor) => {
      const normalizedQuery = query.toLowerCase();
      return (
        tutor.name.toLowerCase().includes(normalizedQuery) ||
        tutor.specialization.toLowerCase().includes(normalizedQuery) ||
        tutor.location?.toLowerCase().includes(normalizedQuery) ||
        tutor.description?.toLowerCase().includes(normalizedQuery)
      );
    });
    return paginate(filtered, page, limit);
  },
};
