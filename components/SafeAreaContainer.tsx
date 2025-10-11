import React from 'react';
import { View, StyleSheet,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaContainerProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  style?: any;
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  backgroundColor = "#f7f7f7",
  statusBarColor = "#7A5FFF",
  style,
}) => {
  return (
    <View style={[styles.outerContainer, { backgroundColor: statusBarColor }]}>
      <SafeAreaView
        style={styles.safeAreaContainer}
        edges={["top", "left", "right"]}
      >
        <View style={[styles.innerContainer, { backgroundColor }, style]}>
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
