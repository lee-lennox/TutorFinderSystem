# 🧪 TutorFinder Mobile - Complete Test Plan

## Manual Testing Checklist

### 1. Authentication Flow

#### Registration
- [ ] Open app → Navigate to Register screen
- [ ] Test empty form submission (should show validation errors)
- [ ] Test invalid email format (should show error)
- [ ] Test password mismatch (should show error)
- [ ] Test weak password (should show error if validation exists)
- [ ] Select "Student" role → Submit
- [ ] Verify success message
- [ ] Verify navigation to Login screen
- [ ] Test duplicate email (should show error)

#### Login
- [ ] Test empty credentials (should show validation)
- [ ] Test invalid credentials (should show error from backend)
- [ ] Test valid credentials
- [ ] Verify navigation to Home screen
- [ ] Verify user data stored (check Profile screen)
- [ ] Close app and reopen (should stay logged in)

#### Forgot Password
- [ ] Click "Forgot Password?" link
- [ ] Test empty email (should show validation)
- [ ] Test invalid email format
- [ ] Test valid email
- [ ] Verify success message
- [ ] Check backend logs for reset code
- [ ] Enter reset code and new password
- [ ] Verify password reset successful
- [ ] Login with new password

#### Logout
- [ ] Navigate to Profile screen
- [ ] Click Logout button
- [ ] Verify navigation to Login screen
- [ ] Verify cannot access protected screens
- [ ] Verify user data cleared

### 2. Home Screen

- [ ] Verify featured tutors load
- [ ] Verify welcome message shows user name
- [ ] Test "View All Tutors" button
- [ ] Test "Browse Courses" button
- [ ] Verify quick stats display correctly
- [ ] Test pull-to-refresh
- [ ] Test loading states
- [ ] Test error states (disconnect internet)

### 3. Tutors Screen

#### List View
- [ ] Verify tutors load with pagination
- [ ] Verify tutor cards show: name, specialization, location, rating
- [ ] Test scroll to load more (pagination)
- [ ] Verify "Load More" button works
- [ ] Test pull-to-refresh

#### Search
- [ ] Test search by tutor name
- [ ] Test search by specialization
- [ ] Test search by location
- [ ] Test search with no results
- [ ] Test clearing search
- [ ] Verify search results update in real-time

#### Tutor Detail
- [ ] Click on tutor card
- [ ] Verify navigation to detail screen
- [ ] Verify all tutor info displays:
  - [ ] Profile image (or placeholder)
  - [ ] Name
  - [ ] Specialization
  - [ ] Description
  - [ ] Location
  - [ ] Available times
  - [ ] Rating
  - [ ] Course information
- [ ] Test "Book Session" button
- [ ] Test back navigation

### 4. Courses Screen

#### List View
- [ ] Verify courses load with pagination
- [ ] Verify course cards show: code, name, description, image
- [ ] Test scroll to load more
- [ ] Test pull-to-refresh

#### Category Filter
- [ ] Verify "All Courses" shows all
- [ ] Test filtering by category
- [ ] Verify filtered results correct
- [ ] Test switching between categories

#### Search
- [ ] Test search by course name
- [ ] Test search by course code
- [ ] Test search with no results
- [ ] Test clearing search

#### Course Detail
- [ ] Click on course card
- [ ] Verify navigation to detail screen
- [ ] Verify course information displays
- [ ] Test back navigation

### 5. Bookings Screen

#### List View
- [ ] Verify user's bookings load
- [ ] Verify booking cards show:
  - [ ] Tutor name
  - [ ] Date
  - [ ] Campus
  - [ ] Level
  - [ ] Year of study
- [ ] Test empty state (no bookings)
- [ ] Test pull-to-refresh

#### Create Booking
- [ ] Navigate to tutor detail
- [ ] Click "Book Session"
- [ ] Test empty form submission
- [ ] Fill all fields:
  - [ ] First name
  - [ ] Last name
  - [ ] Email (should auto-fill)
  - [ ] Year of study
  - [ ] Campus
  - [ ] Level
  - [ ] Date picker
- [ ] Submit booking
- [ ] Verify success message
- [ ] Verify booking appears in list
- [ ] Verify booking saved to backend

#### Cancel Booking
- [ ] Click cancel button on booking
- [ ] Verify confirmation dialog
- [ ] Confirm cancellation
- [ ] Verify booking removed from list
- [ ] Verify booking deleted from backend

### 6. Profile Screen

- [ ] Verify user information displays:
  - [ ] Username
  - [ ] Email
  - [ ] Role
- [ ] Test "Edit Profile" button (if implemented)
- [ ] Test "Settings" button (if implemented)
- [ ] Test "Logout" button
- [ ] Verify logout confirmation dialog

### 7. Navigation

#### Bottom Tabs
- [ ] Test Home tab
- [ ] Test Tutors tab
- [ ] Test Courses tab
- [ ] Test Bookings tab
- [ ] Test Profile tab
- [ ] Verify active tab highlighted
- [ ] Verify tab icons display correctly

#### Stack Navigation
- [ ] Test back button on all screens
- [ ] Test navigation from Home to Tutors
- [ ] Test navigation from Home to Courses
- [ ] Test navigation from Tutors to Tutor Detail
- [ ] Test navigation from Courses to Course Detail
- [ ] Test deep navigation (Home → Tutors → Detail → Booking)

### 8. Error Handling

#### Network Errors
- [ ] Disconnect internet
- [ ] Test loading tutors (should show error)
- [ ] Test loading courses (should show error)
- [ ] Test login (should show error)
- [ ] Verify error messages user-friendly
- [ ] Reconnect internet
- [ ] Test retry functionality

#### API Errors
- [ ] Test with invalid API URL
- [ ] Test with backend down
- [ ] Test with 404 endpoints
- [ ] Test with 500 server errors
- [ ] Verify error messages display

#### Validation Errors
- [ ] Test all forms with empty fields
- [ ] Test email fields with invalid format
- [ ] Test password fields with weak passwords
- [ ] Verify inline validation messages

### 9. Loading States

- [ ] Verify loading indicators on:
  - [ ] Login
  - [ ] Registration
  - [ ] Tutors list
  - [ ] Courses list
  - [ ] Bookings list
  - [ ] Tutor detail
  - [ ] Course detail
- [ ] Verify loading doesn't block UI unnecessarily
- [ ] Verify loading indicators dismiss on error

### 10. UI/UX

#### Responsiveness
- [ ] Test on small phone (iPhone SE)
- [ ] Test on large phone (iPhone 14 Pro Max)
- [ ] Test on tablet (iPad)
- [ ] Test landscape orientation
- [ ] Verify text readable on all sizes
- [ ] Verify buttons accessible on all sizes

#### Visual Design
- [ ] Verify colors consistent with theme
- [ ] Verify fonts consistent
- [ ] Verify spacing consistent
- [ ] Verify images load correctly
- [ ] Verify placeholder images work
- [ ] Verify icons display correctly

#### Interactions
- [ ] Test button press feedback
- [ ] Test input focus states
- [ ] Test scroll behavior
- [ ] Test pull-to-refresh animation
- [ ] Test modal animations
- [ ] Test screen transitions

### 11. Performance

- [ ] Test app launch time (< 3 seconds)
- [ ] Test screen navigation speed
- [ ] Test list scrolling smoothness
- [ ] Test image loading speed
- [ ] Test search responsiveness
- [ ] Monitor memory usage
- [ ] Monitor battery usage

### 12. Offline Functionality

- [ ] Test app behavior when offline
- [ ] Verify cached data displays
- [ ] Verify appropriate error messages
- [ ] Test reconnection behavior
- [ ] Verify data syncs when back online

### 13. Security

- [ ] Verify passwords not visible in logs
- [ ] Verify auth tokens stored securely
- [ ] Verify HTTPS used for API calls
- [ ] Verify sensitive data not cached
- [ ] Test session timeout (if implemented)

### 14. Accessibility

- [ ] Test with screen reader (VoiceOver/TalkBack)
- [ ] Verify all buttons have labels
- [ ] Verify all images have alt text
- [ ] Test with large text size
- [ ] Test color contrast
- [ ] Test keyboard navigation (if applicable)

## Automated Testing

### Unit Tests (To Implement)

Create `src/services/__tests__/authService.test.ts`:
```typescript
import { authService } from '../authService';

describe('authService', () => {
  it('should login successfully', async () => {
    const result = await authService.login({
      identifier: 'test@example.com',
      password: 'password123',
    });
    expect(result).toBeDefined();
  });
});
```

### Integration Tests (To Implement)

Create `src/screens/__tests__/LoginScreen.test.tsx`:
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';

describe('LoginScreen', () => {
  it('should render login form', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Email or Username')).toBeDefined();
  });
});
```

### E2E Tests (To Implement)

Using Detox or Maestro:
```yaml
# maestro/login-flow.yaml
appId: com.yourcompany.tutorfinder
---
- launchApp
- tapOn: "Login"
- inputText: "test@example.com"
- tapOn: "Password"
- inputText: "password123"
- tapOn: "Sign In"
- assertVisible: "Welcome"
```

## Test Environments

### Development
```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
EXPO_PUBLIC_DEBUG_MODE=true
```

### Staging
```env
EXPO_PUBLIC_API_URL=https://staging-api.tutorfinder.com
EXPO_PUBLIC_DEBUG_MODE=true
```

### Production
```env
EXPO_PUBLIC_API_URL=https://api.tutorfinder.com
EXPO_PUBLIC_DEBUG_MODE=false
```

## Bug Reporting Template

When you find a bug, report it with:

```markdown
**Bug Title:** [Short description]

**Environment:**
- Device: [iPhone 14 Pro / Samsung Galaxy S21]
- OS Version: [iOS 17.0 / Android 13]
- App Version: [1.0.0]
- Build: [Development / Production]

**Steps to Reproduce:**
1. Open app
2. Navigate to...
3. Click on...
4. Observe...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[Attach screenshots if applicable]

**Logs:**
[Attach relevant logs]

**Severity:**
- [ ] Critical (app crashes)
- [ ] High (feature broken)
- [ ] Medium (feature partially works)
- [ ] Low (cosmetic issue)
```

## Test Results Tracking

Create a spreadsheet with:
- Test case ID
- Test description
- Expected result
- Actual result
- Pass/Fail
- Notes
- Tester name
- Date tested

## Regression Testing

Before each release, run:
- [ ] All authentication flows
- [ ] All navigation paths
- [ ] All CRUD operations
- [ ] All error scenarios
- [ ] Performance benchmarks

## Beta Testing

### TestFlight (iOS)
1. Build with `eas build --platform ios --profile production`
2. Upload to TestFlight
3. Invite beta testers
4. Collect feedback

### Google Play Internal Testing (Android)
1. Build with `eas build --platform android --profile production`
2. Upload to Play Console
3. Create internal testing track
4. Invite beta testers
5. Collect feedback

## Test Metrics

Track:
- Test coverage %
- Pass rate %
- Critical bugs found
- Time to fix bugs
- User-reported issues

## Sign-Off

Before production release:
- [ ] All critical tests passed
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Security audit passed
- [ ] Accessibility audit passed
- [ ] Product owner approval
- [ ] QA team approval

---

**Happy Testing! 🧪**
