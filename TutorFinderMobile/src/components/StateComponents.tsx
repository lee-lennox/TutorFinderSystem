import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useThemeColor } from '../hooks/use-theme-color';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'large';
}

export const Loading: React.FC<LoadingProps> = React.memo(({
  fullScreen = false,
  message = 'Loading...',
  size = 'large'
}) => {
  const themeColor = useThemeColor();

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={themeColor.primary} />
      <Text style={[styles.message, { color: themeColor.text }]}>{message}</Text>
    </View>
  );
});

interface ErrorProps {
  message: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export const Error: React.FC<ErrorProps> = React.memo(({
  message,
  onRetry,
  fullScreen = false
}) => {
  const themeColor = useThemeColor();

  return (
    <View style={[styles.errorContainer, fullScreen && styles.fullScreen]}>
      <Text style={[styles.errorText, { color: themeColor.error || '#ff4444' }]}>
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: themeColor.primary }]}>
            Tap to retry
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

interface EmptyStateProps {
  message: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
  fullScreen?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  message,
  icon,
  actionText,
  onAction,
  fullScreen = false
}) => {
  const themeColor = useThemeColor();

  return (
    <View style={[styles.emptyContainer, fullScreen && styles.fullScreen]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.emptyText, { color: themeColor.textSecondary || '#666' }]}>
        {message}
      </Text>
      {actionText && onAction && (
        <TouchableOpacity onPress={onAction} style={styles.actionButton}>
          <Text style={[styles.actionText, { color: themeColor.primary }]}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
  fullScreen: {
    flex: 1,
  },
  message: {
    marginTop: spacing.md,
    fontSize: fontSizes.md,
    color: colors.gray[600],
  },
  errorContainer: {
    padding: spacing.lg,
    backgroundColor: colors.error,
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: colors.white,
    fontSize: fontSizes.md,
    textAlign: 'center',
  },
  retryText: {
    marginTop: spacing.md,
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: fontSizes.md,
    color: colors.gray[500],
    textAlign: 'center',
  },
});
