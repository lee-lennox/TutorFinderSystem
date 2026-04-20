# TutorFinder Mobile App - React Native Conversion

This is the React Native version of the TutorFinder web application, converted for iOS and Android platforms using Expo.

## Project Structure

```
src/
├── screens/              # Screen components for different pages
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── TutorsScreen.tsx
│   ├── TutorDetailScreen.tsx
│   ├── CoursesScreen.tsx
│   ├── BookingsScreen.tsx
│   └── ProfileScreen.tsx
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── TextInput.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── StateComponents.tsx
├── navigation/           # Navigation setup
│   └── RootNavigator.tsx
├── services/             # API services and business logic
│   ├── api.ts
│   ├── authService.ts
│   ├── tutorService.ts
│   ├── courseService.ts
│   └── bookingService.ts
├── types/                # TypeScript type definitions
│   └── index.ts
├── utils/                # Utility functions and stores
│   ├── authStore.ts
│   └── dataStore.ts
├── styles/               # Design tokens and themes
│   └── theme.ts
└── App.tsx               # Main app component
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- For iOS: Mac with Xcode
- For Android: Android Studio and Android SDK

### Installation

1. Install dependencies:
```bash
cd TutorFinderMobile
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```
EXPO_PUBLIC_API_URL=http://your-backend-api-url.com/api
```

3. Start the development server:
```bash
npm start
```

4. Run on specific platform:
```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## Key Features

- **Authentication**: Login, Register, Password Reset
- **Tutor Discovery**: Browse and search tutors with filters
- **Course Browsing**: View available courses and specializations
- **Bookings**: Schedule sessions with tutors
- **Reviews**: Rate and review tutors
- **Profile Management**: Edit profile and preferences
- **Responsive Design**: Optimized for all screen sizes

## Architecture

### State Management
Uses **Zustand** for simple and efficient state management:
- `useAuthStore`: Manages authentication state and user data
- `useDataStore`: Manages app data (tutors, courses, bookings)

### API Integration
Axios-based API client with:
- Automatic token injection in headers
- Request/response interceptors
- Error handling
- Refresh token support

### Navigation
- **React Navigation**: Tab-based navigation with stack navigators
- **Authentication Flow**: Separate auth stack before login
- **Deep Linking Ready**: Configured for future deep linking support

## Component Library

### Reusable Components
- **Button**: Primary, Secondary, Outline, Danger variants
- **TextInput**: With label, error state, and icon support
- **Card**: Generic card component with optional press handler
- **TutorCard**: Specialized card for tutor display
- **Header**: App header with back button and actions
- **Loading/Error/EmptyState**: State management components

### Theme System
Centralized theme with:
- Color palette (primary, secondary, status colors)
- Spacing scale (xs to xxxl)
- Font sizes
- Border radius presets
- Shadow definitions

## API Integration

The app connects to a REST API backend. Expected endpoints:

### Auth
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Reset password
- `PUT /auth/profile` - Update user profile

### Tutors
- `GET /tutors` - List tutors (with pagination)
- `GET /tutors/:id` - Get tutor details
- `GET /tutors/search` - Search tutors
- `GET /tutors/:id/availability` - Get tutor availability
- `POST /tutors/:id/reviews` - Rate tutor

### Courses
- `GET /courses` - List courses
- `GET /courses/:id` - Get course details
- `GET /courses/search` - Search courses
- `GET /courses/categories` - Get available categories

### Bookings
- `GET /bookings` - Get user's bookings
- `GET /bookings/:id` - Get booking details
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `POST /bookings/:id/cancel` - Cancel booking
- `POST /bookings/:id/complete` - Complete booking

## Building for Production

### iOS
```bash
npm run prebuild
eas build --platform ios
```

### Android
```bash
npm run prebuild
eas build --platform android
```

## Development Notes

- The app uses Expo for faster development and easier cross-platform compatibility
- All screens have loading and error states
- API requests include proper error handling
- Auth tokens are stored in AsyncStorage
- The app supports both light and dark modes (theme system ready)

## Future Enhancements

- [ ] Push notifications
- [ ] Offline support with local storage
- [ ] Real-time messaging/chat
- [ ] Video call integration
- [ ] Payment integration
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Analytics tracking

## Troubleshooting

### Port already in use
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
```

### Clear cache
```bash
npm start -- --clear
```

### Reset node_modules
```bash
rm -rf node_modules && npm install
```

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript React Native](https://reactnative.dev/docs/typescript)

## License

This project is part of the TutorFinder system.
