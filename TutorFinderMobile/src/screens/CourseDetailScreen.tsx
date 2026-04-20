import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Button, TextInput } from '@components/index';
import { colors, spacing, fontSizes } from '@styles/theme';
import { authService } from '@services/authService';

export const CourseDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      // TODO: Implement course enrollment
      Alert.alert('Success', 'Successfully enrolled in course!');
    } catch (err) {
      Alert.alert('Error', 'Failed to enroll in course');
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Course Details" onBack={() => navigation.goBack()} />
      <View style={styles.placeholder}>
        <MaterialIcons name="construction" size={48} color={colors.gray[400]} />
        <Text style={styles.placeholderText}>Course Details - Coming Soon</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          fullWidth
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  placeholderText: {
    fontSize: fontSizes.md,
    color: colors.gray[600],
    marginTop: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    width: '100%',
  },
});
