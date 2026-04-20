# 🚀 TutorFinder Mobile - Complete Setup Guide

## Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ Expo CLI (`npm install -g expo-cli`)
- ✅ For iOS: Xcode (Mac only) or Expo Go app
- ✅ For Android: Android Studio or Expo Go app
- ✅ Backend API running (Spring Boot server)

## Step 1: Install Dependencies

```bash
cd TutorFinderMobile
npm install
```

Or with yarn:
```bash
yarn install
```

## Step 2: Configure Environment

The `.env` file has been created with default settings:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

### Update for your setup:

**Android Emulator:**
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

**iOS Simulator:**
```env
EXPO_PUBLIC_API_URL=http://localhost:8080
```

**Physical Device (same WiFi network):**
```env
EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:8080
```
Find your IP:
- Windows: `ipconfig` (look for IPv4 Address)
- Mac/Linux: `ifconfig` or `ip addr`

**Production:**
```env
EXPO_PUBLIC_API_URL=https://api.tutorfinder.com
```

## Step 3: Start Backend Server

Ensure your Spring Boot backend is running on port 8080.

Test it's accessible:
```bash
curl http://localhost:8080/tutors/all
```

## Step 4: Start Expo Development Server

```bash
npm start
```

This will open Expo DevTools in your browser.

## Step 5: Run on Device/Emulator

### Option A: Expo Go App (Easiest)

1. Install Expo Go on your phone:
   - iOS: App Store
   - Android: Google Play Store

2. Scan the QR code from terminal/browser

3. App will load on your device

### Option B: iOS Simulator (Mac only)

```bash
npm run ios
```

### Option C: Android Emulator

```bash
npm run android
```

## Step 6: Test the App

### Test Authentication:

1. **Register a new account:**
   - Open app → Register
   - Fill in username, email, password
   - Select role (Student/Tutor)
   - Submit

2. **Login:**
   - Use registered credentials
   - Should navigate to Home screen

3. **Test Forgot Password:**
   - Click "Forgot Password?"
   - Enter email
   - Check backend logs for reset code

### Test Core Features:

1. **Browse Tutors:**
   - Navigate to Tutors tab
   - Search for tutors
   - View tutor details
   - Check ratings and reviews

2. **Browse Courses:**
   - Navigate to Courses tab
   - Filter by category
   - View course details

3. **Create Booking:**
   - Go to tutor detail
   - Click "Book Session"
   - Fill booking form
   - Submit

4. **View Bookings:**
   - Navigate to Bookings tab
   - See your booking history
   - Cancel bookings

5. **Profile:**
   - Navigate to Profile tab
   - View user info
   - Logout

## Troubleshooting

### Cannot connect to backend:

**Check 1: Backend is running**
```bash
curl http://localhost:8080/tutors/all
```

**Check 2: Correct IP for physical device**
- Use `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Update `.env` with your computer's IP
- Restart Expo: `npm start --clear`

**Check 3: Firewall**
- Allow port 8080 through firewall
- Windows: `netsh advfirewall firewall add rule name="Expo" dir=in action=allow protocol=TCP localport=8080`

### App crashes on startup:

**Clear cache:**
```bash
npm start --clear
```

**Reinstall dependencies:**
```bash
rm -rf node_modules
npm install
```

### TypeScript errors:

```bash
npm run lint
```

## Development Tips

### Hot Reload
- Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
- Enable "Fast Refresh" in dev menu

### Debug Menu
- iOS Simulator: `Cmd+D`
- Android Emulator: `Cmd+M` or `Ctrl+M`
- Physical Device: Shake device

### View Logs
```bash
npx react-native log-android  # Android
npx react-native log-ios      # iOS
```

### Network Debugging
- Enable "Debug Remote JS" in dev menu
- Open Chrome DevTools
- View Network tab

## Next Steps

Once the app is running:

1. ✅ Test all features
2. ✅ Customize branding (colors, logo)
3. ✅ Add additional features
4. ✅ Prepare for production build

See `CUSTOMIZATION_GUIDE.md` for branding and `PRODUCTION_BUILD.md` for deployment.

## Need Help?

- Check `MOBILE_APP_README.md` for detailed documentation
- Review `CONVERSION_GUIDE.md` for web→mobile mapping
- Check `IMPLEMENTATION_STATUS.md` for feature status
