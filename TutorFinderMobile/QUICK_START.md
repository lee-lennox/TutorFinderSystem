# Quick Start Guide - TutorFinder Mobile

## Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd TutorFinderMobile
npm install
```

### 2. Configure Environment
Create `.env` file:
```env
EXPO_PUBLIC_API_URL=http://localhost:8080/api
```

### 3. Start Dev Server
```bash
npm start
```

### 4. Run on Device/Emulator

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

## Troubleshooting

### Port already in use
```bash
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

## Project Structure Quick Reference

```
src/
├── screens/       - App screens (pages)
├── components/    - Reusable UI components
├── navigation/    - Navigation setup
├── services/      - API and business logic
├── types/         - TypeScript definitions
├── utils/         - Stores and utilities
├── styles/        - Theme and styling
└── App.tsx        - Main component
```

## Key Technologies

- **React Native** - Mobile UI framework
- **Expo** - Development and deployment
- **React Navigation** - Navigation routing
- **TypeScript** - Type safety
- **Zustand** - State management
- **Axios** - API client
- **React Native StyleSheet** - Styling

## Login Credentials for Testing

Create test account via Register screen or use:
```
Email: test@example.com
Password: password123
```

## Common Commands

```bash
# Start development
npm start

# Run iOS
npm run ios

# Run Android
npm run android

# Run Web
npm run web

# Type checking
npm run type-check

# Linting
npm run lint
```

## Next Steps

1. ✅ Project setup complete
2. 📱 Start the dev server: `npm start`
3. 🧪 Test on simulator/device
4. 📝 Configure backend API URL
5. 🔄 Implement remaining features
6. 🚀 Build and deploy

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)

Need help? Check `MOBILE_APP_README.md` and `CONVERSION_GUIDE.md`
