import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;
const CURVE_SIZE = 60;

export const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={80} style={styles.svg}>
        <Path
          d={`
            M 0 0
            L ${state.index * TAB_WIDTH + (TAB_WIDTH - CURVE_SIZE) / 2} 0
            C ${state.index * TAB_WIDTH + (TAB_WIDTH - CURVE_SIZE) / 2 + 10} 0,
              ${state.index * TAB_WIDTH + (TAB_WIDTH - CURVE_SIZE) / 2 + 5} 40,
              ${state.index * TAB_WIDTH + TAB_WIDTH / 2} 40
            C ${state.index * TAB_WIDTH + (TAB_WIDTH + CURVE_SIZE) / 2 - 5} 40,
              ${state.index * TAB_WIDTH + (TAB_WIDTH+ CURVE_SIZE) / 2 - 10} 0,
              ${state.index * TAB_WIDTH + (TAB_WIDTH + CURVE_SIZE) / 2} 0
            L ${width} 0
            L ${width} 80
            L 0 80
            Z
          `}
          fill="#8A1C1C"
        />
      </Svg>

      <View style={styles.buttonsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
          if (route.name === 'index') iconName = isFocused ? 'home' : 'home-outline';
          else if (route.name === 'calendar') iconName = isFocused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'partner') iconName = isFocused ? 'person' : 'person-outline';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabButton,
                isFocused && styles.focusedButton
              ]}
            >
              <View style={isFocused ? styles.iconContainerActive : styles.iconContainer}>
                <Ionicons 
                  name={iconName} 
                  size={24} 
                  color={isFocused ? '#8A1C1C' : 'white'} 
                />
              </View>
              {/* Optional: The three purple dots from the image */}
              <View style={styles.dotsContainer}>
                 <View style={styles.dot} />
                 <View style={styles.dot} />
                 <View style={styles.dot} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
    backgroundColor: 'transparent',
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  focusedButton: {
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerActive: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF9E1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: -15,
    gap: 3,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#8B5CF6',
    opacity: 0.8,
  }
});
