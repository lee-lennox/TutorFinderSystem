import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing } from '@styles/theme';

interface BottomTabsProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const icons: { [key: string]: string } = {
    Home: 'home',
    Tutors: 'people',
    Courses: 'school',
    Bookings: 'calendar-today',
    Profile: 'person',
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            preventDefault: () => {},
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={route.key}
            style={[
              styles.tab,
              isFocused && styles.focusedTab,
            ]}
          >
            <MaterialIcons
              name={icons[label] || 'circle'}
              size={24}
              color={isFocused ? colors.primary : colors.gray[500]}
              onPress={onPress}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingBottom: spacing.md,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  focusedTab: {
    borderTopWidth: 3,
    borderTopColor: colors.primary,
  },
});
