import { apiClient } from './api';

export interface Review {
  id: number;
  name: string;
  email?: string;
  tutorId?: number;
  tutorName?: string;
  feedback: string;
  rating?: number;
}

export interface CreateReviewRequest {
  name: string;
  email: string;
  tutorId: number;
  feedback: string;
  rating: number;
}

export const reviewService = {
  async getAllReviews(): Promise<Review[]> {
    const response = await apiClient.get<Review[]>('/api/review/all');
    return response.data;
  },

  async getReviewsByTutor(tutorId: number): Promise<Review[]> {
    const allReviews = await this.getAllReviews();
    return allReviews.filter((review) => review.tutorId === tutorId);
  },

  async createReview(data: CreateReviewRequest): Promise<Review> {
    const response = await apiClient.post<Review>('/api/review/create', data);
    return response.data;
  },

  async calculateAverageRating(tutorId: number): Promise<number> {
    const reviews = await this.getReviewsByTutor(tutorId);
    if (reviews.length === 0) return 0;
    
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return sum / reviews.length;
  },
};
