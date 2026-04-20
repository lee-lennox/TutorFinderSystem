import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { CoursesList } from './pages/CoursesList';
import { CourseDetail } from './pages/CourseDetail';
import { TutorsList } from './pages/TutorsList';
import { TutorDetail } from './pages/TutorDetail';
import { MyBookings } from './pages/MyBookings';
import { Reviews } from './pages/Reviews';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { UsersList } from './pages/UsersList';
import { UserDetail } from './pages/UserDetail';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'forgot-password', Component: ForgotPassword },
      { path: 'reset-password', Component: ResetPassword },
      { path: 'courses', Component: CoursesList },
      { path: 'courses/:id', Component: CourseDetail },
      { path: 'tutors', Component: TutorsList },
      { path: 'tutors/:id', Component: TutorDetail },
      { path: 'bookings', Component: MyBookings },
      { path: 'reviews', Component: Reviews },
      { path: 'profile', Component: Profile },
      { path: 'admin', Component: Admin },
      { path: 'users', Component: UsersList },
      { path: 'users/:id', Component: UserDetail },
      { path: '*', Component: NotFound },
    ],
  },
]);
