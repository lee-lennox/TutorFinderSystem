import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@styles/theme';

// Auth Screens
import { LoginScreen } from '@screens/LoginScreen';
import { RegisterScreen } from '@screens/RegisterScreen';
import { ForgotPasswordScreen } from '@screens/ForgotPasswordScreen';

// App Screens
import { HomeScreen } from '@screens/HomeScreen';
import { TutorsScreen } from '@screens/TutorsScreen';
import { TutorDetailScreen } from '@screens/TutorDetailScreen';
import { CoursesScreen } from '@screens/CoursesScreen';
import { BookingsScreen } from '@screens/BookingsScreen';
import { ProfileScreen } from '@screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeTab" component={HomeScreen} />
      <Stack.Screen name="Tutors" component={TutorsScreen} />
      <Stack.Screen name="TutorDetail" component={TutorDetailScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
    </Stack.Navigator>
  );
}

function TutorsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TutorsTab" component={TutorsScreen} />
      <Stack.Screen name="TutorDetail" component={TutorDetailScreen} />
    </Stack.Navigator>
  );
}

function CoursesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CoursesTab" component={CoursesScreen} />
    </Stack.Navigator>
  );
}

function BookingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BookingsTab" component={BookingsScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileTab" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: any = 'circle';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'TutorsStack') {
            iconName = focused ? 'people' : 'people';
          } else if (route.name === 'CoursesStack') {
            iconName = focused ? 'school' : 'school';
          } else if (route.name === 'BookingsStack') {
            iconName = focused ? 'calendar-today' : 'calendar-today';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'person' : 'person';
          }

          return (
            <MaterialIcons name={iconName} size={24} color={color} />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          paddingBottom: 8,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="TutorsStack"
        component={TutorsStack}
        options={{
          title: 'Tutors',
        }}
      />
      <Tab.Screen
        name="CoursesStack"
        component={CoursesStack}
        options={{
          title: 'Courses',
        }}
      />
      <Tab.Screen
        name="BookingsStack"
        component={BookingsStack}
        options={{
          title: 'Bookings',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
