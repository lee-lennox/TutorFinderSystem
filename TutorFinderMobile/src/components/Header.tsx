import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '@styles/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: () => void;
  rightIcon?: string;
  showBackButton?: boolean;
  centerTitle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  rightAction,
  rightIcon,
  showBackButton = true,
  centerTitle = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {showBackButton && onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}

        <Text
          style={[
            styles.title,
            centerTitle && { flex: 1, textAlign: 'center' },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {rightIcon && rightAction ? (
          <TouchableOpacity onPress={rightAction} style={styles.rightButton}>
            <MaterialIcons
              name={rightIcon as any}
              size={24}
              color={colors.black}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.rightButton} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.black,
    marginLeft: spacing.md,
  },
});
