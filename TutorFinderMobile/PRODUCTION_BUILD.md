# 📦 TutorFinder Mobile - Production Build & Deployment Guide

## Prerequisites

Before building for production:

- ✅ Expo account (create at https://expo.dev)
- ✅ EAS CLI installed: `npm install -g eas-cli`
- ✅ Apple Developer account ($99/year) for iOS
- ✅ Google Play Developer account ($25 one-time) for Android
- ✅ Production API endpoint (HTTPS required)

## Step 1: Configure EAS Build

### Initialize EAS

```bash
cd TutorFinderMobile
eas login
eas build:configure
```

This creates `eas.json` with build profiles.

### Update eas.json

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "env": {
        "EXPO_PUBLIC_API_URL": "https://api.tutorfinder.com"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## Step 2: Update App Configuration

### Update app.json for Production

```json
{
  "expo": {
    "name": "TutorFinder",
    "slug": "tutorfinder-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#007AFF"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.tutorfinder",
      "buildNumber": "1",
      "infoPlist": {
        "NSCameraUsageDescription": "Allow TutorFinder to access your camera to upload profile pictures.",
        "NSPhotoLibraryUsageDescription": "Allow TutorFinder to access your photos to upload profile pictures."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#007AFF"
      },
      "package": "com.yourcompany.tutorfinder",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id-here"
      }
    }
  }
}
```

### Create Production Environment

Create `.env.production`:
```env
EXPO_PUBLIC_API_URL=https://api.tutorfinder.com
EXPO_PUBLIC_ENABLE_ANALYTICS=true
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=true
EXPO_PUBLIC_DEBUG_MODE=false
```

## Step 3: Prepare Assets

### App Icon (Required)

Create `assets/icon.png`:
- Size: 1024x1024px
- Format: PNG with transparency
- No rounded corners (iOS adds automatically)

### Adaptive Icon for Android (Required)

Create `assets/adaptive-icon.png`:
- Size: 1024x1024px
- Safe zone: 512x512px centered
- Format: PNG with transparency

### Splash Screen (Required)

Create `assets/splash.png`:
- Size: 1284x2778px (iPhone 14 Pro Max)
- Format: PNG
- Center your logo/branding

### Favicon (Optional)

Create `assets/favicon.png`:
- Size: 48x48px
- Format: PNG

## Step 4: Build for Android

### Build APK (for testing)

```bash
eas build --platform android --profile preview
```

This creates an APK you can install directly on Android devices.

### Build AAB (for Google Play)

```bash
eas build --platform android --profile production
```

This creates an Android App Bundle (.aab) for Play Store submission.

### Download Build

```bash
# Build will be available at:
# https://expo.dev/accounts/[username]/projects/tutorfinder-mobile/builds

# Or download via CLI:
eas build:list
```

## Step 5: Build for iOS

### Build for TestFlight

```bash
eas build --platform ios --profile production
```

### Requirements:

- Apple Developer account
- App Store Connect app created
- Bundle identifier registered

### Create App in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - Platform: iOS
   - Name: TutorFinder
   - Primary Language: English
   - Bundle ID: com.yourcompany.tutorfinder
   - SKU: tutorfinder-mobile

## Step 6: Submit to App Stores

### Submit to Google Play Store

**1. Create Google Play Console account:**
- Go to https://play.google.com/console
- Pay $25 one-time fee

**2. Create app:**
- Click "Create app"
- Fill in app details
- Set up store listing

**3. Upload build:**

```bash
eas submit --platform android
```

Or manually:
- Download .aab from EAS
- Upload to Google Play Console
- Create release in "Production" track

**4. Complete store listing:**
- App name: TutorFinder
- Short description (80 chars)
- Full description (4000 chars)
- Screenshots (at least 2)
- Feature graphic (1024x500px)
- App icon (512x512px)
- Privacy policy URL
- Content rating questionnaire

**5. Pricing & distribution:**
- Free or paid
- Select countries
- Accept terms

**6. Submit for review:**
- Review takes 1-7 days

### Submit to Apple App Store

**1. Upload build to TestFlight:**

```bash
eas submit --platform ios
```

**2. Complete App Store Connect listing:**
- App name: TutorFinder
- Subtitle (30 chars)
- Description (4000 chars)
- Keywords (100 chars)
- Screenshots (required for all device sizes)
- App preview videos (optional)
- Privacy policy URL
- Support URL

**3. App Review Information:**
- Contact information
- Demo account (if login required)
- Notes for reviewer

**4. Submit for review:**
- Review takes 1-3 days

## Step 7: Update & Versioning

### Update Version Numbers

**For iOS:**
```json
{
  "expo": {
    "version": "1.0.1",
    "ios": {
      "buildNumber": "2"
    }
  }
}
```

**For Android:**
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

### Build Update

```bash
# Increment version in app.json first
eas build --platform all --profile production
```

### Over-The-Air (OTA) Updates

For minor updates without app store review:

```bash
# Install expo-updates
npx expo install expo-updates

# Publish update
eas update --branch production --message "Bug fixes"
```

Users get updates automatically on next app launch.

## Step 8: Monitoring & Analytics

### Add Sentry for Crash Reporting

```bash
npx expo install @sentry/react-native
```

Configure in `App.tsx`:
```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
  enableInExpoDevelopment: false,
  debug: false,
});
```

### Add Analytics

```bash
npx expo install expo-firebase-analytics
```

Or use Amplitude, Mixpanel, etc.

## Step 9: App Store Optimization (ASO)

### Keywords Research

- Research competitor apps
- Use tools like App Annie, Sensor Tower
- Target relevant keywords

### Screenshots Best Practices

- Show key features
- Use device frames
- Add captions
- Localize for different markets

### App Description

- Clear value proposition
- Feature list
- Social proof (reviews, ratings)
- Call to action

### Ratings & Reviews

- Prompt users at right time
- Respond to reviews
- Fix issues mentioned in reviews

## Checklist Before Launch

- [ ] Test on real devices (iOS & Android)
- [ ] Test all user flows
- [ ] Test with production API
- [ ] Verify all images load
- [ ] Test push notifications
- [ ] Test deep linking
- [ ] Check app permissions
- [ ] Verify privacy policy
- [ ] Test payment flows (if applicable)
- [ ] Check analytics tracking
- [ ] Test crash reporting
- [ ] Verify app icon & splash screen
- [ ] Test on different screen sizes
- [ ] Test offline functionality
- [ ] Security audit
- [ ] Performance testing
- [ ] Accessibility testing

## Post-Launch

### Monitor Metrics

- Daily active users (DAU)
- Monthly active users (MAU)
- Retention rate
- Crash-free rate
- App store ratings
- User feedback

### Iterate

- Fix critical bugs immediately
- Plan feature updates
- A/B test new features
- Improve based on user feedback

## Costs Summary

### One-Time Costs:
- Google Play Developer: $25
- Apple Developer: $99/year

### Ongoing Costs:
- EAS Build: Free tier (limited builds) or $29/month
- Backend hosting: Variable
- Push notifications: Free (Expo) or paid (OneSignal, etc.)
- Analytics: Free tier available
- Crash reporting: Free tier available

## Resources

- **EAS Build Docs:** https://docs.expo.dev/build/introduction/
- **EAS Submit Docs:** https://docs.expo.dev/submit/introduction/
- **App Store Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **Play Store Guidelines:** https://play.google.com/about/developer-content-policy/
- **ASO Guide:** https://www.apptamin.com/blog/app-store-optimization/

## Need Help?

- Expo Discord: https://chat.expo.dev
- Stack Overflow: Tag with `expo` and `react-native`
- GitHub Issues: https://github.com/expo/expo/issues

---

**Ready to launch? Good luck! 🚀**
