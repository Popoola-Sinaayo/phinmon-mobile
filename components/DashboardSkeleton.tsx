import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function DashboardSkeleton() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 400],
  });
  return (
    <View style={styles.skeleton}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    width: "90%",
    height: 150,
    backgroundColor: "#8C78F2",
    // overflow: "hidden",
    borderRadius: 4,
    marginVertical: 10,
    alignSelf: "center",
  },
  shimmer: {
    width: "90%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});
