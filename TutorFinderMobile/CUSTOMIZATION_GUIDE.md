# 🎨 TutorFinder Mobile - Customization Guide

## 2️⃣ Connect to Backend

The app is already configured to work with your Spring Boot backend. All API endpoints match the web app structure.

### API Endpoints Used:

```
POST   /auth/login
POST   /auth/register
POST   /auth/request-password-reset
POST   /auth/reset-password

GET    /tutors/all
GET    /tutors/read/:id
PUT    /tutors/update

GET    /courses/all
GET    /courses/read/:id

POST   /bookings/create
GET    /bookings/user/:email
DELETE /bookings/delete/:id

GET    /api/review/all
POST   /api/review/create
```

## 3️⃣ Customize Design & Branding

### Update App Colors

Edit `src/styles/theme.ts`:

```typescript
export const theme = {
  colors: {
    // Primary brand color (buttons, links, highlights)
    primary: '#007AFF',      // Change to your brand color
    
    // Secondary accent color
    secondary: '#5856D6',    // Change to complement primary
    
    // Success, warning, error states
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    
    // Neutral colors
    background: '#F2F2F7',   // App background
    surface: '#FFFFFF',      // Cards, modals
    text: '#000000',         // Primary text
    textSecondary: '#8E8E93', // Secondary text
    border: '#C6C6C8',       // Borders, dividers
  },
  
  // Update spacing, fonts, etc.
};
```

### Update App Name & Icon

**1. App Name:**

Edit `app.json`:
```json
{
  "expo": {
    "name": "TutorFinder",        // Change app name
    "slug": "tutorfinder-mobile",  // Change URL slug
    "version": "1.0.0"
  }
}
```

**2. App Icon:**

- Create a 1024x1024px PNG icon
- Save as `assets/icon.png`
- Update `app.json`:

```json
{
  "expo": {
    "icon": "./assets/icon.png"
  }
}
```

**3. Splash Screen:**

- Create a 1284x2778px PNG splash image
- Save as `assets/splash.png`
- Update `app.json`:

```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#007AFF"  // Match your brand
    }
  }
}
```

### Update Typography

Edit `src/styles/theme.ts`:

```typescript
export const theme = {
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
};
```

### Custom Fonts (Optional)

1. Add font files to `assets/fonts/`
2. Load in `App.tsx`:

```typescript
import * as Font from 'expo-font';

await Font.loadAsync({
  'CustomFont-Regular': require('./assets/fonts/CustomFont-Regular.ttf'),
  'CustomFont-Bold': require('./assets/fonts/CustomFont-Bold.ttf'),
});
```

### Update Component Styles

All components use the theme. Example customization:

**Button Component** (`src/components/Button.tsx`):
```typescript
// Change button height, border radius, etc.
const styles = StyleSheet.create({
  button: {
    height: 50,           // Change height
    borderRadius: 12,     // Change roundness
    // ... other styles
  },
});
```

**Card Component** (`src/components/Card.tsx`):
```typescript
const styles = StyleSheet.create({
  card: {
    borderRadius: 16,     // Change card roundness
    shadowRadius: 8,      // Change shadow
    // ... other styles
  },
});
```

## 4️⃣ Add New Features

### Add a New Screen

**1. Create screen file:**

`src/screens/NewFeatureScreen.tsx`:
```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../components';
import { theme } from '../styles/theme';

export const NewFeatureScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Header title="New Feature" onBack={() => navigation.goBack()} />
      <Text>Your new feature content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
```

**2. Add to navigation:**

Edit `src/navigation/RootNavigator.tsx`:
```typescript
import { NewFeatureScreen } from '../screens/NewFeatureScreen';

// Add to stack
<Stack.Screen name="NewFeature" component={NewFeatureScreen} />
```

**3. Navigate to it:**
```typescript
navigation.navigate('NewFeature');
```

### Add a New API Service

**1. Create service file:**

`src/services/newService.ts`:
```typescript
import { apiClient } from './api';

export const newService = {
  async getData(): Promise<any[]> {
    const response = await apiClient.get<any[]>('/api/endpoint');
    return response.data;
  },
  
  async createData(data: any): Promise<any> {
    const response = await apiClient.post<any>('/api/endpoint', data);
    return response.data;
  },
};
```

**2. Use in component:**
```typescript
import { newService } from '../services/newService';

const fetchData = async () => {
  try {
    const data = await newService.getData();
    setData(data);
  } catch (error) {
    console.error(error);
  }
};
```

### Add Push Notifications

**1. Install expo-notifications:**
```bash
npx expo install expo-notifications
```

**2. Configure:**
```typescript
import * as Notifications from 'expo-notifications';

// Request permissions
const { status } = await Notifications.requestPermissionsAsync();

// Get push token
const token = await Notifications.getExpoPushTokenAsync();

// Send to backend
await apiClient.post('/users/push-token', { token: token.data });
```

### Add Image Picker

**1. Install expo-image-picker:**
```bash
npx expo install expo-image-picker
```

**2. Use in component:**
```typescript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });
  
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
```

### Add Maps Integration

**1. Install react-native-maps:**
```bash
npx expo install react-native-maps
```

**2. Use in component:**
```typescript
import MapView, { Marker } from 'react-native-maps';

<MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: -26.2041,
    longitude: 28.0473,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker
    coordinate={{ latitude: -26.2041, longitude: 28.0473 }}
    title="Tutor Location"
  />
</MapView>
```

## 5️⃣ Fix Issues & Optimize

### Common Issues

**Issue: Images not loading**
```typescript
// Use Image component with error handling
<Image
  source={{ uri: imageUrl }}
  defaultSource={require('../assets/placeholder.png')}
  onError={() => setImageError(true)}
/>
```

**Issue: Slow list rendering**
```typescript
// Use FlatList with optimization
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
/>
```

**Issue: Memory leaks**
```typescript
// Clean up subscriptions
useEffect(() => {
  const subscription = someObservable.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Performance Optimization

**1. Memoize expensive computations:**
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

**2. Prevent unnecessary re-renders:**
```typescript
const MemoizedComponent = React.memo(MyComponent);
```

**3. Optimize images:**
```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  contentFit="cover"
  transition={200}
  cachePolicy="memory-disk"
/>
```

**4. Use React Native Debugger:**
```bash
# Install
brew install react-native-debugger  # Mac
# Or download from GitHub releases

# Enable in app
// Shake device → Debug → Enable Remote JS Debugging
```

## 6️⃣ Production Build

See `PRODUCTION_BUILD.md` for complete deployment guide.

### Quick Build Commands

**Android APK (for testing):**
```bash
eas build --platform android --profile preview
```

**iOS Build (requires Apple Developer account):**
```bash
eas build --platform ios --profile production
```

**Submit to stores:**
```bash
eas submit --platform android
eas submit --platform ios
```

## Additional Resources

- **Expo Documentation:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org
- **Zustand State Management:** https://github.com/pmndrs/zustand

## Need More Help?

Check other guides:
- `SETUP_GUIDE.md` - Initial setup
- `MOBILE_APP_README.md` - Complete documentation
- `PRODUCTION_BUILD.md` - Deployment guide
- `IMPLEMENTATION_STATUS.md` - Feature checklist
