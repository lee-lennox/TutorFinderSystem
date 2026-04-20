import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Button, Loading, Error } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { tutorService } from '@services/tutorService';
import { Tutor } from '@types/index';

export const TutorDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    loadTutorDetail();
  }, [id]);

  const loadTutorDetail = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await tutorService.getTutorById(id);
      setTutor(data);
    } catch (err: any) {
      setError('Failed to load tutor details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = () => {
    setIsBooking(true);
    // Navigate to booking screen
    navigation.navigate('BookingFlow', { tutorId: id });
  };

  if (isLoading) return <Loading fullScreen />;
  if (error || !tutor) return <Error message={error} onRetry={loadTutorDetail} />;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tutor Profile" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        {tutor.imageUrl && (
          <Image
            source={{ uri: tutor.imageUrl }}
            style={styles.profileImage}
          />
        )}

        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{tutor.name}</Text>
            <Text style={styles.role}>{tutor.specialization}</Text>
            <Text style={styles.subtitle}>{[tutor.location, tutor.availableTime].filter(Boolean).join(' • ')}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={20} color={colors.warning} />
            <Text style={styles.ratingText}>{tutor.rating?.toFixed(1) ?? '0.0'}</Text>
            <Text style={styles.reviewText}>({tutor.reviewCount ?? 0})</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{tutor.bio || 'No biography provided yet.'}</Text>
        </View>

        {tutor.specialization && (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Specialization</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tutor.specialization}</Text>
            </View>
          </View>
        )}

        {tutor.courses && tutor.courses.length > 0 && (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Courses</Text>
            {tutor.courses.map((course) => (
              <TouchableOpacity
                key={course.id}
                onPress={() =>
                  navigation.navigate('CourseDetail', { id: course.id })
                }
                style={styles.courseItem}
              >
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseLevel}>{course.code}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Hourly Rate</Text>
          <Text style={styles.price}>${tutor.hourlyRate}/hour</Text>
        </View>

        <Button
          title="Book Session"
          onPress={handleBooking}
          isLoading={isBooking}
          fullWidth
          style={styles.bookButton}
        />
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
  profileImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: spacing.lg,
    backgroundColor: colors.gray[200],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  name: {
    fontSize: fontSizes.xxl,
    fontWeight: '700',
    color: colors.black,
  },
  role: {
    fontSize: fontSizes.md,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  ratingBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.white,
  },
  reviewText: {
    fontSize: fontSizes.sm,
    color: colors.white,
  },
  infoCard: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.md,
  },
  bio: {
    fontSize: fontSizes.sm,
    color: colors.gray[700],
    lineHeight: 22,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  tagText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  courseName: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    color: colors.black,
  },
  courseLevel: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  priceLabel: {
    color: colors.white,
    fontSize: fontSizes.sm,
    opacity: 0.9,
  },
  price: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  bookButton: {
    marginBottom: spacing.lg,
  },
});
