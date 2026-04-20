import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Loading, Error, EmptyState } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { bookingService } from '@services/bookingService';
import { Booking } from '@types/index';
import { useFocusEffect } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';

export const BookingsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadBookings(1);
    }, [])
  );

  const loadBookings = async (pageNum: number) => {
    try {
      setIsLoading(pageNum === 1);
      setError('');
      const result = await bookingService.getMyBookings(pageNum, 10);

      if (pageNum === 1) {
        setBookings(result.data);
      } else {
        setBookings((prev) => [...prev, ...result.data]);
      }
      setHasMore(result.hasMore);
      setPage(pageNum);
    } catch (err: any) {
      setError('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadBookings(page + 1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'completed':
        return colors.info;
      case 'cancelled':
        return colors.error;
      default:
        return colors.gray[500];
    }
  };

  if (error && bookings.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Bookings" showBackButton={false} />
        <Error message={error} onRetry={() => loadBookings(1)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Bookings" showBackButton={false} />

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BookingDetail', { id: item.id })
            }
            style={styles.bookingCard}
          >
            <View style={styles.bookingHeader}>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>Session Booking</Text>
                <Text style={styles.bookingDate}>
                  {formatDistanceToNow(new Date(item.startTime), {
                    addSuffix: true,
                  })}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.bookingDetails}>
              <View style={styles.detail}>
                <MaterialIcons
                  name="access-time"
                  size={18}
                  color={colors.gray[600]}
                />
                <Text style={styles.detailText}>
                  {new Date(item.startTime).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.detail}>
                <MaterialIcons
                  name="attach-money"
                  size={18}
                  color={colors.gray[600]}
                />
                <Text style={styles.detailText}>${item.totalPrice}</Text>
              </View>
            </View>

            <View style={styles.bookingActions}>
              {item.status === 'pending' && (
                <>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.cancelButton,
                    ]}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
              {item.status === 'completed' && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Leave Review</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          !isLoading ? <EmptyState message="No bookings yet" /> : null
        }
        ListFooterComponent={
          isLoading && bookings.length > 0 ? <Loading /> : null
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
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  bookingCard: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.black,
  },
  bookingDate: {
    fontSize: fontSizes.sm,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  statusText: {
    color: colors.white,
    fontSize: fontSizes.xs,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    fontSize: fontSizes.sm,
    color: colors.gray[700],
  },
  bookingActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});
