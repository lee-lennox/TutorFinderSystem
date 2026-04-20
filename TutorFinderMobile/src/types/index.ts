// User and authentication types
export interface User {
  id?: string;
  username: string;
  email: string;
  role: 'USER' | 'TUTOR' | 'ADMIN';
  createdAt?: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  email?: string;
  role?: 'USER' | 'TUTOR' | 'ADMIN';
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: 'USER' | 'TUTOR';
}

// Course/Subject types
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  imageUrl?: string;
  tutors?: Tutor[];
}

// Tutor types
export interface Tutor {
  id: string;
  name: string;
  specialization: string;
  description?: string;
  location?: string;
  availableTime?: string;
  imageUrl?: string;
  course?: Course;
}

// Booking types
export interface Booking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  yearOfStudy: string;
  campus: string;
  level: string;
  bookingDate: string;
  createdAt: string;
  tutorName: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
