import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header, Button, TextInput, Loading } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { authService } from '@services/authService';

export const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setIsSent(true);
      Alert.alert('Success', 'Password reset email sent. Check your inbox!');
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Password Reset" onBack={() => navigation.goBack()} />
        <View style={styles.content}>
          <View style={styles.successBox}>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successMessage}>
              We've sent password reset instructions to {email}
            </Text>
          </View>
          <Button
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
            fullWidth
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Forgot Password" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.description}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!isLoading}
          containerStyle={styles.input}
        />

        <Button
          title="Send Reset Link"
          onPress={handleSendReset}
          isLoading={isLoading}
          disabled={isLoading}
          fullWidth
          style={styles.button}
        />
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
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.black,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSizes.md,
    color: colors.gray[600],
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  input: {
    marginBottom: spacing.xl,
  },
  button: {
    marginTop: spacing.md,
  },
  successBox: {
    backgroundColor: colors.success,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  successTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  successMessage: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: 'center',
  },
});
