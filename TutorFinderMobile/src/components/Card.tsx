import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, fontSizes, shadows } from '@styles/theme';

interface CardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  onPress?: () => void;
  elevation?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  style,
  children,
  onPress,
  elevation = 'md',
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.card, shadows[elevation], style]}
    >
      {children}
    </Container>
  );
};

interface TutorCardProps {
  name: string;
  specialization: string;
  details?: string;
  imageUrl?: string;
  onPress?: () => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  name,
  specialization,
  details,
  imageUrl,
  onPress,
}) => {
  return (
    <Card onPress={onPress} style={styles.tutorCard}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.tutorImage}
        />
      )}
      <View style={styles.tutorContent}>
        <Text style={styles.tutorName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.specialization} numberOfLines={1}>
          {specialization}
        </Text>
        {details ? (
          <Text style={styles.details} numberOfLines={2}>
            {details}
          </Text>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  tutorCard: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
  },
  tutorImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.gray[200],
  },
  tutorContent: {
    padding: spacing.md,
  },
  tutorName: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.xs,
  },
  specialization: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  rating: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
    color: colors.warning,
    marginRight: spacing.xs,
  },
  reviewCount: {
    fontSize: fontSizes.sm,
    color: colors.gray[500],
  },
  price: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.primary,
  },
});
