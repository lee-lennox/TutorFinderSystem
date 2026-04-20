import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { colors, spacing, borderRadius, fontSizes } from '@styles/theme';

interface TextInputComponentProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  variant?: 'default' | 'filled';
}

export const TextInput: React.FC<TextInputComponentProps> = ({
  label,
  error,
  containerStyle,
  icon,
  variant = 'default',
  ...props
}) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          styles[`variant_${variant}`],
          error && styles.error,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <RNTextInput
          {...props}
          style={[styles.input, icon && styles.inputWithIcon]}
          placeholderTextColor={colors.gray[400]}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  variant_default: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    backgroundColor: colors.white,
  },
  variant_filled: {
    backgroundColor: colors.gray[100],
    borderWidth: 0,
  },
  error: {
    borderColor: colors.error,
  },
  iconContainer: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: fontSizes.md,
    color: colors.black,
    paddingVertical: spacing.md,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSizes.xs,
    marginTop: spacing.xs,
  },
});
