import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
  showNumber?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  editable = false,
  onRatingChange,
  showNumber = false,
}) => {
  const handlePress = (index: number) => {
    if (editable && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(rating);
          const halfFilled = index < rating && index >= Math.floor(rating);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(index)}
              disabled={!editable}
              activeOpacity={editable ? 0.7 : 1}
            >
              <Ionicons
                name={filled ? 'star' : halfFilled ? 'star-half' : 'star-outline'}
                size={size}
                color={filled || halfFilled ? theme.colors.warning : theme.colors.border}
                style={styles.star}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {showNumber && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)} / {maxRating}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 2,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
});
