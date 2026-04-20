import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, TextInput } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { authService } from '@services/authService';

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER' as 'USER' | 'TUTOR',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      if (response.success) {
        Alert.alert('Success', 'Account created successfully. Please log in.');
        navigation.navigate('Login');
      } else {
        setError(response.message || 'Registration failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join TutorFinder</Text>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={formData.username}
          onChangeText={(value) => setFormData({ ...formData, username: value })}
          editable={!isLoading}
          containerStyle={styles.input}
        />

        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
          keyboardType="email-address"
          editable={!isLoading}
          containerStyle={styles.input}
        />

        <View style={styles.input}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(value) => setFormData({ ...formData, password: value })}
              secureTextEntry={!showPassword}
              editable={!isLoading}
              containerStyle={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
            >
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={colors.gray[500]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.input}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
              secureTextEntry={!showConfirmPassword}
              editable={!isLoading}
              containerStyle={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.toggleButton}
            >
              <MaterialIcons
                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={colors.gray[500]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.roleContainer}>
          <Text style={styles.label}>I am a:</Text>
          <View style={styles.roleButtons}>
            <TouchableOpacity
              onPress={() => setFormData({ ...formData, role: 'USER' })}
              style={[
                styles.roleButton,
                formData.role === 'USER' && styles.roleButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  formData.role === 'USER' && styles.roleButtonTextActive,
                ]}
              >
                Student
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFormData({ ...formData, role: 'TUTOR' })}
              style={[
                styles.roleButton,
                formData.role === 'TUTOR' && styles.roleButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  formData.role === 'TUTOR' && styles.roleButtonTextActive,
                ]}
              >
                Tutor
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Create Account"
          onPress={handleRegister}
          isLoading={isLoading}
          disabled={isLoading}
          fullWidth
          style={styles.button}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.black,
  },
  subtitle: {
    fontSize: fontSizes.md,
    color: colors.gray[600],
    marginTop: spacing.sm,
  },
  input: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingRight: spacing.md,
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    padding: spacing.md,
  },
  roleContainer: {
    marginBottom: spacing.lg,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  roleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[300],
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    color: colors.gray[700],
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: colors.white,
  },
  button: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  errorBox: {
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  errorText: {
    color: colors.white,
    fontSize: fontSizes.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.gray[600],
    fontSize: fontSizes.sm,
  },
  linkText: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});

  label: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingRight: spacing.md,
  },
  passwordInput: {
    flex: 1,
  },
  toggleButton: {
    padding: spacing.md,
  },
  roleContainer: {
    marginBottom: spacing.lg,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  roleButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.gray[600],
  },
  roleButtonTextActive: {
    color: colors.white,
  },
  button: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  errorBox: {
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  errorText: {
    color: colors.white,
    fontSize: fontSizes.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.gray[600],
    fontSize: fontSizes.sm,
  },
  linkText: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});
