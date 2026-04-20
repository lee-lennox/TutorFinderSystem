# React Web to React Native Conversion Guide

## Overview
The TutorFinder web application has been successfully converted from React (web) to React Native (mobile). This document outlines the key changes and migration strategy.

## Key Differences: Web vs React Native

### 1. Navigation
**Web**: React Router with browser history
```typescript
// Web version
import { createBrowserRouter } from 'react-router';
const router = createBrowserRouter([...]);
```

**Mobile**: React Navigation with native stack and tab navigation
```typescript
// Mobile version
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
```

### 2. UI Components
**Web**: HTML + CSS + Radix UI + Tailwind CSS
```typescript
// Web: <div>, <button>, <input>, etc.
// Radix UI components like <Dialog>, <Select>, etc.
```

**Mobile**: React Native components
```typescript
// Mobile: <View>, <TouchableOpacity>, <TextInput>, etc.
import { View, TouchableOpacity, TextInput } from 'react-native';
```

### 3. Styling
**Web**: Tailwind CSS + CSS modules + StyleSheet
```css
/* Web: Tailwind classes */
<div className="flex gap-4 p-4 rounded-lg">
```

**Mobile**: React Native StyleSheet
```typescript
// Mobile: StyleSheet.create()
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  }
});
```

### 4. State Management
**Web**: Zustand (same library)
```typescript
// Both use Zustand, but adapted for mobile context
```

**Mobile**: Zustand with AsyncStorage persistence
```typescript
// Mobile adds AsyncStorage for persistent state
await AsyncStorage.setItem('authToken', token);
```

### 5. Icons
**Web**: Lucide React
```typescript
// Web: <Heart />, <ChevronRight />, etc.
```

**Mobile**: Expo Vector Icons (Material Icons)
```typescript
// Mobile: MaterialIcons from @expo/vector-icons
import { MaterialIcons } from '@expo/vector-icons';
<MaterialIcons name="heart" size={24} color={color} />
```

## Component Mapping

### Layout Components

| Web | Mobile |
|-----|--------|
| `<div>` | `<View>` |
| `<span>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<input>` | `<TextInput>` |
| `<img>` | `<Image>` |
| `<ScrollView>` | `<ScrollView>` |
| `<FlatList>` | `<FlatList>` (for lists) |

### Dialog/Modal
```typescript
// Web: Radix Alert Dialog
<AlertDialog.Root>
  <AlertDialog.Content>...</AlertDialog.Content>
</AlertDialog.Root>

// Mobile: Built-in Alert
import { Alert } from 'react-native';
Alert.alert('Title', 'Message', [
  { text: 'Cancel', onPress: () => {} },
  { text: 'OK', onPress: () => {} }
]);
```

### Form Inputs
```typescript
// Web: Radix Form + TextInput component
<form>
  <input type="email" />
</form>

// Mobile: Custom TextInput component
<TextInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
/>
```

## File Structure Comparison

### Web
```
src/
├── app/
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── routes.tsx       # Route definitions
│   └── App.tsx
├── assets/
├── styles/
├── types/
└── utils/
```

### Mobile
```
src/
├── screens/             # Screen components (similar to pages)
├── components/          # Reusable UI components
├── navigation/          # Navigation setup
├── services/            # API services
├── types/
├── utils/               # Store and utilities
├── styles/              # Theme and styling
└── App.tsx
```

## API Integration - No Changes
The API service layer remains largely the same:
- Same axios configuration
- Same request/response handling
- Same error handling
- Token injection same method

```typescript
// Both web and mobile use similar API structure
import { apiClient } from '@services/api';
const data = await apiClient.get('/endpoint');
```

## Screen Conversion Example

### Home Page (Web)
```typescript
export const Home: React.FC = () => {
  return (
    <div className="container mx-auto">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Welcome</h1>
      </header>
      <section className="grid grid-cols-2 gap-4">
        {tutors.map(tutor => <TutorCard key={tutor.id} tutor={tutor} />)}
      </section>
    </div>
  );
};
```

### Home Screen (Mobile)
```typescript
export const HomeScreen: React.FC = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Welcome" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          {tutors.map(tutor => (
            <TutorCard
              key={tutor.id}
              {...tutor}
              onPress={() => navigation.navigate('TutorDetail', { id: tutor.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
```

## Theme/Styling Conversion

### Web: Tailwind CSS
```html
<div class="flex items-center justify-between bg-white rounded-lg p-4 shadow-md">
  <h3 class="text-xl font-bold text-gray-900">Title</h3>
  <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Action
  </button>
</div>
```

### Mobile: React Native StyleSheet
```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.4,
    elevation: 2,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.black,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
});
```

## Navigation Changes

### Web: Route-based
```typescript
const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/tutors', Component: TutorsList },
  { path: '/tutors/:id', Component: TutorDetail },
]);
```

### Mobile: Navigation-based
```typescript
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Tutors" component={TutorStackNavigator} />
</Tab.Navigator>

// Deep navigation
navigation.navigate('TutorDetail', { id: '123' });
```

## Platform-Specific Considerations

### Safe Area
```typescript
// Mobile needs SafeAreaView for notches and home indicators
import { SafeAreaView } from 'react-native-safe-area-context';
<SafeAreaView>Content</SafeAreaView>
```

### Keyboard Handling
```typescript
// Mobile needs to handle keyboard appearance
import { KeyboardAvoidingView } from 'react-native';
<KeyboardAvoidingView behavior="padding">
  {/* Form content */}
</KeyboardAvoidingView>
```

### Platform Differences
```typescript
import { Platform } from 'react-native';
if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
}
```

## Testing Strategy

### Web Testing Tools
- Jest, React Testing Library, Cypress

### Mobile Testing Tools
- Jest (still works)
- Detox (E2E testing)
- Maestro (mobile automation)

## Deployment

### Web
- Vercel, Netlify, or AWS S3 + CloudFront

### Mobile
- iOS App Store via Xcode and TestFlight
- Google Play Store via Android Studio
- EAS Build (Expo's build service)

## Gradual Migration Path

If you have more pages to convert:

1. **Identify patterns** in existing web code
2. **Create mobile equivalents** of components
3. **Map navigation** from React Router to React Navigation
4. **Replace styling** from Tailwind to React Native StyleSheet
5. **Test on simulators** (iOS and Android)
6. **Build and submit** to app stores

## Common Gotchas

1. **No CSS**: StyleSheet only - no Tailwind
2. **No HTML semantics**: Everything is components
3. **Scrolling**: Need explicit ScrollView/FlatList
4. **Touch vs Click**: Use onPress instead of onClick
5. **Flexbox differences**: Mobile Flexbox is different
6. **No :hover state**: Use activeOpacity or Pressable
7. **Performance**: FlatList for long lists, not ScrollView
8. **Images**: Must have explicit width and height

## Performance Tips

1. Use `FlatList` with `keyExtractor` for large lists
2. Memoize expensive components with `React.memo()`
3. Use `useCallback` for event handlers
4. Implement pagination instead of loading all data
5. Use `Image` from `expo-image` for better caching

## References

- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [React Native Design Patterns](https://reactnative.dev/docs/design-patterns)
