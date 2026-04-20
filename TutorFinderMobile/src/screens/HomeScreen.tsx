import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, TutorCard, Loading, Error } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { tutorService } from '@services/tutorService';
import { courseService } from '@services/courseService';
import { useAuthStore } from '@utils/authStore';
import { Tutor, Course } from '@types/index';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const [tutorData, courseData] = await Promise.all([
        tutorService.getTutors(1, 5),
        courseService.getCourses(1, 5),
      ]);
      setTutors(tutorData.data);
      setCourses(courseData.data);
    } catch (err: any) {
      setError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading fullScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Welcome, ${user?.name}`} centerTitle={false} showBackButton={false} />
      <ScrollView contentContainerStyle={styles.content}>
        {error && <Error message={error} onRetry={loadData} />}

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color={colors.gray[500]} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Tutors')}
            style={styles.searchInput}
          >
            <Text style={styles.searchPlaceholder}>Find a tutor...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Tutors</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tutors')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {tutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              name={tutor.name}
              specialization={tutor.specialization || 'Tutor'}
              details={[tutor.location, tutor.availableTime].filter(Boolean).join(' • ')}
              imageUrl={tutor.imageUrl}
              onPress={() => navigation.navigate('TutorDetail', { id: tutor.id })}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Courses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={styles.seeAll}>See All →</Text>
            </TouchableOpacity>
          </View>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.id}
              onPress={() => navigation.navigate('CourseDetail', { id: course.id })}
              style={styles.courseCard}
            >
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.courseDescription} numberOfLines={2}>
                {course.code}
              </Text>
              <Text style={styles.courseCategory}>{course.tutorName}</Text>
            </TouchableOpacity>
          ))}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  searchInput: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  searchPlaceholder: {
    color: colors.gray[500],
    fontSize: fontSizes.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.black,
  },
  seeAll: {
    color: colors.primary,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  courseCard: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  courseName: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.xs,
  },
  courseDescription: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  courseCategory: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    fontWeight: '500',
  },
});
