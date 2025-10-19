import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from './Typography';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ThemeToggleProps {
  style?: any;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const { theme, themeMode, setThemeMode } = useTheme();

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      case 'system':
        return 'phone-portrait-outline';
      default:
        return 'phone-portrait-outline';
    }
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return 'System Theme';
      default:
        return 'System Theme';
    }
  };

  const cycleTheme = () => {
    switch (themeMode) {
      case 'system':
        setThemeMode('light');
        break;
      case 'light':
        setThemeMode('dark');
        break;
      case 'dark':
        setThemeMode('system');
        break;
      default:
        setThemeMode('system');
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        { backgroundColor: theme.surface, borderColor: theme.border },
        style
      ]} 
      onPress={cycleTheme}
      activeOpacity={0.7}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name={getThemeIcon()} size={24} color={theme.text} />
        </View>
        <Typography weight={500} color={theme.text}>
          {getThemeLabel()}
        </Typography>
      </View>
      <View style={[styles.indicator, { backgroundColor: theme.backgroundSecondary }]}>
        <Typography size={12} color={theme.textSecondary}>
          {themeMode === 'system' ? 'Auto' : themeMode === 'light' ? 'Light' : 'Dark'}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});

export default ThemeToggle;
