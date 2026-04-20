import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, spacing, borderRadius, fontSizes } from '@styles/theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  fullWidth = false,
}) => {
  const isDisabledState = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabledState}
      style={[
        styles.button,
        styles[variant],
        styles[`size_${size}`],
        isDisabledState && styles.disabled,
        fullWidth && { width: '100%' },
        style,
      ]}
    >
      <View style={styles.buttonContent}>
        {isLoading ? (
          <ActivityIndicator
            color={variant === 'outline' ? colors.primary : colors.white}
            size="small"
          />
        ) : (
          <>
            {icon}
            <Text
              style={[
                styles[`text_${variant}`],
                styles[`textSize_${size}`],
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
  size_small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  size_medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  size_large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  text_primary: {
    color: colors.white,
    fontWeight: '600',
  },
  text_secondary: {
    color: colors.white,
    fontWeight: '600',
  },
  text_outline: {
    color: colors.primary,
    fontWeight: '600',
  },
  text_danger: {
    color: colors.white,
    fontWeight: '600',
  },
  textSize_small: {
    fontSize: fontSizes.sm,
  },
  textSize_medium: {
    fontSize: fontSizes.md,
  },
  textSize_large: {
    fontSize: fontSizes.lg,
  },
});
