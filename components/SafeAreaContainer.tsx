import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "@/contexts/ThemeContext";

interface SafeAreaContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  style?: any;
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  backgroundColor,
  statusBarColor,
  style,
}) => {
  const { theme } = useTheme();

  const finalBackgroundColor = backgroundColor || theme.background;
  const finalStatusBarColor = statusBarColor || theme.statusBar;

  return (
    <View
      style={[styles.outerContainer, { backgroundColor: finalStatusBarColor }]}
    >
      <SafeAreaView
        style={styles.safeAreaContainer}
        edges={["top", "left", "right"]}
      >
        <View
          style={[
            styles.innerContainer,
            { backgroundColor: finalBackgroundColor },
            style,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    height: 500
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    // height: 500
  },
});

export default SafeAreaContainer;
