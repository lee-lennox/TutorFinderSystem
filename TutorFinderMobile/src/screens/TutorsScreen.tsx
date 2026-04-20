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
import { Header, TutorCard, Loading, Error, EmptyState } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { tutorService } from '@services/tutorService';
import { Tutor, PaginatedResponse } from '@types/index';
import { useFocusEffect } from '@react-navigation/native';

export const TutorsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTutors(1, searchQuery);
    }, [])
  );

  const loadTutors = async (pageNum: number, query?: string) => {
    try {
      setIsLoading(pageNum === 1);
      setError('');
      const result = query
        ? await tutorService.searchTutors(query, pageNum, 10)
        : await tutorService.getTutors(pageNum, 10);

      if (pageNum === 1) {
        setTutors(result.data);
      } else {
        setTutors((prev) => [...prev, ...result.data]);
      }
      setHasMore(result.hasMore);
      setPage(pageNum);
    } catch (err: any) {
      setError('Failed to load tutors');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    loadTutors(1, query);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadTutors(page + 1, searchQuery);
    }
  };

  if (error && tutors.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Find Tutors"
          showBackButton={false}
          onBack={() => navigation.goBack()}
        />
        <Error message={error} onRetry={() => loadTutors(1, searchQuery)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Find Tutors" showBackButton={false} />
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={colors.gray[500]} />
        <RNTextInput
          style={styles.searchInput}
          placeholder="Search tutors..."
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

      <FlatList
        data={tutors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <TutorCard
              name={item.name}
              specialization={item.specialization || 'Tutor'}
              details={[item.location, item.availableTime].filter(Boolean).join(' • ')}
              imageUrl={item.imageUrl}
              onPress={() => navigation.navigate('TutorDetail', { id: item.id })}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          !isLoading ? <EmptyState message="No tutors found" /> : null
        }
        ListFooterComponent={
          isLoading && tutors.length > 0 ? <Loading /> : null
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
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  cardContainer: {
    marginBottom: spacing.md,
  },
});
