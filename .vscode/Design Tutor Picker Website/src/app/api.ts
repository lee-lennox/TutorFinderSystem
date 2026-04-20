// API base URL — set VITE_API_BASE_URL in your .env to point at your Spring Boot server
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? '';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, options);
  const isJson = (res.headers.get('content-type') || '').includes('application/json');
  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '');

  if (!res.ok) {
    const payloadObj = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : null;
    const messageCandidates = [
      payloadObj?.message,
      payloadObj?.error,
      payloadObj?.detail,
      payloadObj?.title,
      typeof payload === 'string' ? payload : undefined,
    ];

    const backendMessage =
      messageCandidates
        .map(v => (typeof v === 'string' ? v.trim() : ''))
        .find(v => v.length > 0) ||
      `${res.status} ${res.statusText || 'Request failed'}`;

    throw new Error(backendMessage);
  }

  return payload as T;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface AuthResponse {
  message: string;
  email?: string;
  role?: string;
}

export const login = (body: { identifier: string; password: string }) =>
  request<AuthResponse | ApiResponse>('/auth/login', {
    method: 'POST',
    headers: JSON_HEADERS,
    // Backend currently expects the key "username" for login identity.
    body: JSON.stringify({ username: body.identifier, password: body.password }),
  });

export const register = (body: { username: string; email: string; password: string }) =>
  request<ApiResponse<number> | AuthResponse>('/auth/register', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

export const requestPasswordReset = (body: { email: string }) =>
  request<ApiResponse>('/auth/request-password-reset', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

export const resetPassword = (body: { email: string; code: string; newPassword: string }) =>
  request<ApiResponse>('/auth/reset-password', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

// ─── Users ───────────────────────────────────────────────────────────────────
export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export const getAllUsers = () => request<User[]>('/user/all');
export const getUser = (id: number) => request<User>(`/user/read/${id}`);

export const createUser = (body: User) =>
  request<User>('/user/create', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

export const updateUser = (body: User) =>
  request<User>('/user/update', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

export const deleteUser = (id: number) =>
  fetch(`${API_BASE}/user/delete/${id}`, { method: 'DELETE' });

// ─── Courses ─────────────────────────────────────────────────────────────────
export interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  imageUrl: string;
}

export const getAllCourses = () => request<Course[]>('/courses/all');
export const getCourse = (id: number) => request<Course>(`/courses/read/${id}`);

// ─── Tutors ──────────────────────────────────────────────────────────────────
export interface Tutor {
  id: number;
  name: string;
  specialization: string;
  description: string;
  location: string;
  availableTime: string;
  imageUrl: string;
  approvedForAdvertising?: boolean;
  course?: Course | { id: number };
}

export const getAllTutors = () => request<Tutor[]>('/tutors/all');
export const getTutor = (id: number) => request<Tutor>(`/tutors/read/${id}`);
export const updateTutor = (body: Tutor) =>
  request<Tutor>('/tutors/update', {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

// ─── Bookings ────────────────────────────────────────────────────────────────
export interface Booking {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  yearOfStudy: string;
  campus: string;
  level: string;
  bookingDate: string;
  tutorName: string;
  tutorId?: number;
}

export interface BookingPayload {
  firstName: string;
  lastName: string;
  email: string;
  yearOfStudy: string;
  campus: string;
  level: string;
  bookingDate: string;
  tutorName: string;
  tutorId: number;
}

export const createBooking = (body: BookingPayload) =>
  request<Booking>('/bookings/create', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

export const getMyBookings = (email: string) =>
  request<Booking[]>(`/bookings/user/${email}`);

export const deleteBooking = (id: number) =>
  fetch(`${API_BASE}/bookings/delete/${id}`, { method: 'DELETE' });

// ─── Reviews ─────────────────────────────────────────────────────────────────
export interface Review {
  id: number;
  name: string;
  feedback: string;
  email?: string;
  tutorId?: number;
  tutorName?: string;
  rating?: number;
}

export const getAllReviews = () => request<Review[]>('/api/review/all');
export const createReview = (body: { name: string; email: string; tutorId: number; feedback: string; rating?: number }) =>
  request<Review>('/api/review/create', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });
