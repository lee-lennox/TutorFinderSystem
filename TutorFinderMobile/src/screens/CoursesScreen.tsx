import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Loading, Error, EmptyState } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { courseService } from '@services/courseService';
import { Course, PaginatedResponse } from '@types/index';
import { useFocusEffect } from '@react-navigation/native';

export const CoursesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadCourses(1, searchQuery, selectedCategory);
      loadCategories();
    }, [])
  );

  const loadCourses = async (pageNum: number, query?: string, category?: string | null) => {
    try {
      setIsLoading(pageNum === 1);
      setError('');
      const result = query
        ? await courseService.searchCourses(query, pageNum, 10)
        : await courseService.getCourses(pageNum, 10, category || undefined);

      if (pageNum === 1) {
        setCourses(result.data);
      } else {
        setCourses((prev) => [...prev, ...result.data]);
      }
      setHasMore(result.hasMore);
      setPage(pageNum);
    } catch (err: any) {
      setError('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await courseService.getCategories();
      setCategories(data);
    } catch (err) {
      console.log('Failed to load categories');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    loadCourses(1, query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    setPage(1);
    loadCourses(1, searchQuery, newCategory);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadCourses(page + 1, searchQuery, selectedCategory);
    }
  };

  if (error && courses.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Courses" showBackButton={false} />
        <Error message={error} onRetry={() => loadCourses(1, searchQuery, selectedCategory)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Browse Courses" showBackButton={false} />
      
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={colors.gray[500]} />
        <RNTextInput
          style={styles.searchInput}
          placeholder="Search courses..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={colors.gray[500]}
        />
        {searchQuery && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <MaterialIcons name="close" size={20} color={colors.gray[500]} />
          </TouchableOpacity>
        )}
      </View>

      {categories.length > 0 && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryChange(item)}
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item && styles.categoryChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          contentContainerStyle={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CourseDetail', { id: item.id })}
            style={styles.courseCard}
          >
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseLevel}>{item.level}</Text>
            </View>
            <Text style={styles.courseDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.courseFooter}>
              <Text style={styles.courseCategory}>{item.category}</Text>
              <MaterialIcons
                name="arrow-forward"
                size={16}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          !isLoading ? <EmptyState message="No courses found" /> : null
        }
        ListFooterComponent={
          isLoading && courses.length > 0 ? <Loading /> : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: fontSizes.md,
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
    color: colors.black,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.gray[200],
    borderRadius: 20,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    color: colors.gray[600],
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  courseCard: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  courseTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.black,
    flex: 1,
  },
  courseLevel: {
    fontSize: fontSizes.xs,
    color: colors.primary,
    fontWeight: '600',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  courseDescription: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseCategory: {
    fontSize: fontSizes.xs,
    color: colors.gray[600],
    fontWeight: '500',
  },
});
