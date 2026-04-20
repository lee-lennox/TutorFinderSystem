import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Button, Loading } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { useAuthStore } from '@utils/authStore';
import { authService } from '@services/authService';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await authService.logout();
          logout();
        },
      },
    ]);
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading fullScreen message="Loading profile..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" showBackButton={false} />
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarPlaceholder}>
            <MaterialIcons name="person" size={50} color={colors.white} />
          </View>
          <Text style={styles.userName}>{user.username || user.email}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Account Type</Text>
          <Text style={styles.infoValue}>{user.role}</Text>
        </View>

        <Button title="Logout" variant="danger" onPress={handleLogout} fullWidth style={styles.logoutButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userName: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.black,
  },
  userRole: {
    fontSize: fontSizes.md,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  infoCard: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  infoLabel: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    color: colors.black,
  },
  logoutButton: {
    marginTop: spacing.xl,
  },
});
