# 📱 Tutor Finder Mobile App

A cross-platform mobile application built with **React Native** (Expo) and **TypeScript** that allows students to discover, book, and rate tutors. The app connects to the **TutorFinder System Backend** for authentication, tutor discovery, course management, and booking functionality.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Features in Detail](#key-features-in-detail)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🎯 Overview

**Tutor Finder Mobile** is a React Native mobile application that enables students to:
- Browse and search for qualified tutors
- View tutor profiles and ratings
- Book tutoring sessions
- Manage bookings and schedule
- Access course information
- Maintain user profiles

The app supports **iOS**, **Android**, and **Web** platforms through Expo, with a modern UI built using React Navigation and custom styling.

---

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration system
- 🔍 **Tutor Discovery** - Search and filter tutors by subject, rating, and availability
- ⭐ **Ratings & Reviews** - View tutor ratings and student reviews
- 📅 **Booking System** - Schedule tutoring sessions with availability management
- 👤 **User Profiles** - Manage student information and preferences
- 📚 **Course Browsing** - Explore available courses and subjects
- 🎨 **Responsive Design** - Optimized for mobile and web platforms
- 🌓 **Theme Support** - Light and dark theme support
- 📱 **Cross-Platform** - Runs on iOS, Android, and Web

---

## 🛠 Technologies

**Frontend Framework:**
- React Native with Expo
- TypeScript for type safety
- React Navigation for routing

**State Management:**
- Zustand for global state management

**HTTP Client:**
- Axios with request/response interceptors

**UI & Styling:**
- Tailwind CSS (Web)
- Custom theme system with design tokens
- React Native default components

**Development Tools:**
- ESLint for code quality
- Expo Router for file-based navigation
- Expo CLI for development and building

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (install globally: `npm install -g expo-cli`)
- **Git** for version control
- For iOS development: Xcode on macOS
- For Android development: Android Studio

---

## 💾 Installation

1. **Clone the repository**
   ```bash
   cd "c:\Users\Admin\Desktop\TUTORFINDER MOBILE SYSTEM"
   ```

2. **Navigate to the mobile app directory**
   ```bash
   cd TutorFinderMobile
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g expo-cli
   ```

---

## ⚙️ Configuration

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your settings**
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:8080/TutorFinderSystem/api
   EXPO_PUBLIC_APP_ENV=development
   ```

3. **For production**, use your backend server URL:
   ```env
   EXPO_PUBLIC_API_URL=https://your-production-api.com/api
   ```

---

## 🚀 Running the App

### Development Mode

```bash
npm start
```

This will start the Expo development server. The terminal will show a QR code and options to open the app on different platforms.

### iOS Simulator (macOS only)
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Web Browser
```bash
npm run web
```

### Run on Physical Device
1. Download the **Expo Go** app on your iOS or Android device
2. In the terminal, press `w` for web or scan the QR code displayed
3. The app will load on your device

---

## 📁 Project Structure

```
TutorFinderMobile/
├── app/                      # Expo Router app directory (file-based routing)
│   ├── (tabs)/              # Tab-based navigation layout
│   │   ├── explore.tsx      # Tutors discovery screen
│   │   └── index.tsx        # Home/dashboard screen
│   ├── _layout.tsx          # Root layout
│   └── modal.tsx            # Modal wrapper
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx       # Button component
│   │   ├── Card.tsx         # Card component
│   │   ├── Header.tsx       # Header component
│   │   ├── TextInput.tsx    # Input field component
│   │   ├── Rating.tsx       # Rating display component
│   │   └── StateComponents.tsx  # Loading, Error, Empty states
│   ├── screens/             # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── TutorsScreen.tsx
│   │   ├── TutorDetailScreen.tsx
│   │   ├── CourseDetailScreen.tsx
│   │   ├── BookingsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── services/            # API services
│   │   ├── api.ts          # Axios instance with interceptors
│   │   ├── authService.ts
│   │   ├── tutorService.ts
│   │   ├── courseService.ts
│   │   ├── bookingService.ts
│   │   └── profileService.ts
│   ├── navigation/          # Navigation configuration
│   │   └── RootNavigator.tsx
│   ├── styles/              # Theme and styling
│   │   └── theme.ts
│   └── types/               # TypeScript type definitions
├── hooks/                   # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── components/              # Shared components
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── themed-text.tsx
│   └── parallax-scroll-view.tsx
├── assets/                  # Images and static assets
├── constants/               # App constants
├── app.json                 # Expo configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── eslint.config.js         # ESLint configuration
```

---

## 📜 Available Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web

# Reset project to initial state
npm run reset-project

# Lint code
npm lint
```

---

## 🎨 Key Features in Detail

### Authentication
- User registration with email validation
- Secure login with JWT token storage
- Password reset functionality
- Session management with auto-logout

### Tutor Discovery
- Browse all available tutors
- Search and filter by subject, name, or rating
- View tutor profiles with ratings and reviews
- Pagination for large datasets

### Booking System
- View available time slots
- Book tutoring sessions
- Manage active and past bookings
- Cancel bookings with confirmation

### User Profiles
- Update personal information
- Change password
- View booking history
- Manage preferences

---

## 🔗 API Integration

The app communicates with the **TutorFinder System Backend** via REST API endpoints:

- **Authentication**: `/api/auth/login`, `/api/auth/register`, `/api/auth/refresh`
- **Tutors**: `/api/tutors/all`, `/api/tutors/{id}`, `/api/tutors/search`
- **Courses**: `/api/courses/all`, `/api/courses/{id}`
- **Bookings**: `/api/bookings`, `/api/bookings/{id}`, `/api/bookings/{id}/cancel`
- **Profile**: `/api/user/profile`, `/api/user/profile/update`

See [API Documentation](../TutorFinderSystemBackend/API_DOCUMENTATION.md) for detailed endpoint specifications.

---

## 🐛 Troubleshooting

### Issue: Port 8081 already in use
```bash
# Kill the process using port 8081
# On macOS/Linux:
lsof -ti:8081 | xargs kill -9

# On Windows (PowerShell):
Get-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess | Stop-Process
```

### Issue: Dependencies not installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: App won't start
```bash
# Clear Expo cache and restart
npm start -- --clear
```

### Issue: API connection errors
- Verify backend is running on `http://localhost:8080`
- Check `.env` file has correct API URL
- Ensure device/emulator can reach the backend server

### Issue: Emulator/Simulator not working
- Restart the Android emulator or iOS simulator
- Clear Expo cache: `npm start -- --clear`
- Check device storage and RAM

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Guide](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 📖 Documentation

- [Quick Start Guide](./QUICK_START.md) - Get started in 5 minutes
- [Complete Guide](./COMPLETE_GUIDE.md) - In-depth project documentation
- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [Conversion Guide](./CONVERSION_GUIDE.md) - Web to mobile conversion details
- [Customization Guide](./CUSTOMIZATION_GUIDE.md) - How to customize the app
- [Implementation Status](./IMPLEMENTATION_STATUS.md) - Feature completion status
- [Test Plan](./TEST_PLAN.md) - Testing procedures
- [Production Build](./PRODUCTION_BUILD.md) - Building for production

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

## 📄 License

This project is part of the TutorFinder System. For licensing details, see the main project documentation.
