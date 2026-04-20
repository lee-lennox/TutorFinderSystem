import { create } from 'zustand';
import { Tutor, Course, Booking } from '@types/index';

interface DataState {
  tutors: Tutor[];
  courses: Course[];
  bookings: Booking[];
  selectedTutor: Tutor | null;
  selectedCourse: Course | null;
  setTutors: (tutors: Tutor[]) => void;
  setCourses: (courses: Course[]) => void;
  setBookings: (bookings: Booking[]) => void;
  setSelectedTutor: (tutor: Tutor | null) => void;
  setSelectedCourse: (course: Course | null) => void;
}

export const useDataStore = create<DataState>((set) => ({
  tutors: [],
  courses: [],
  bookings: [],
  selectedTutor: null,
  selectedCourse: null,
  setTutors: (tutors) => set({ tutors }),
  setCourses: (courses) => set({ courses }),
  setBookings: (bookings) => set({ bookings }),
  setSelectedTutor: (tutor) => set({ selectedTutor: tutor }),
  setSelectedCourse: (course) => set({ selectedCourse: course }),
}));
