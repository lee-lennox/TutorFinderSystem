import { apiClient } from './api';
import { Booking } from '@types/index';

export const bookingService = {
  async getMyBookings(email: string): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>(`/bookings/user/${encodeURIComponent(email)}`);
    return response.data;
  },

  async getBookingById(id: string): Promise<Booking> {
    const response = await apiClient.get<Booking>(`/bookings/read/${id}`);
    return response.data;
  },

  async createBooking(data: {
    tutorId: string;
    firstName: string;
    lastName: string;
    email: string;
    yearOfStudy: string;
    campus: string;
    level: string;
  }): Promise<any> {
    const response = await apiClient.post<any>('/bookings/create', data);
    return response.data;
  },
};
