import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

interface SkeletonBoxProps {
  width: string | number | any;
  height: number;
  borderRadius?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width,
  height,
  borderRadius = 8,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View
      style={[
        styles.skeletonBox,
        {
          width,
          height,
          borderRadius,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          backgroundColor: theme.backgroundSecondary,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            opacity,
            backgroundColor: theme.surface,
          },
        ]}
      />
    </View>
  );
};

export default function DashboardSkeleton() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Main card skeleton */}
      <View style={[styles.mainCard, { backgroundColor: theme.primary }]}>
        {/* Header text skeleton */}
        <SkeletonBox width="40%" height={12} marginBottom={8} />

        {/* Main title skeleton */}
        <SkeletonBox width="70%" height={24} marginBottom={12} />

        {/* Description skeleton */}
        <SkeletonBox width="65%" height={14} marginBottom={20} />

        {/* Sync button skeleton */}
        <View style={styles.syncButtonContainer}>
          <SkeletonBox width={40} height={40} borderRadius={20} />
        </View>
      </View>

      {/* Quick tips skeleton */}
      <View style={styles.quickTipsContainer}>
        <SkeletonBox width="30%" height={16} marginBottom={12} />
        <View style={styles.quickTipsGrid}>
          <SkeletonBox
            width="48%"
            height={60}
            borderRadius={12}
            marginBottom={8}
          />
          <SkeletonBox
            width="48%"
            height={60}
            borderRadius={12}
            marginBottom={8}
          />
        </View>
      </View>

      {/* Transaction history skeleton */}
      <View
        style={[styles.historyContainer, { backgroundColor: theme.surface }]}
      >
        <SkeletonBox width="40%" height={18} marginBottom={16} />

        {/* Transaction items skeleton */}
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            style={[
              styles.transactionItem,
              { borderBottomColor: theme.border },
            ]}
          >
            <View style={styles.transactionLeft}>
              <SkeletonBox
                width={40}
                height={40}
                borderRadius={20}
                marginRight={12}
              />
              <View style={styles.transactionDetails}>
                <SkeletonBox width="70%" height={14} marginBottom={4} />
                <SkeletonBox width="50%" height={12} />
              </View>
            </View>
            <SkeletonBox width="25%" height={16} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "red",
    // height: 200,
  },
  mainCard: {
    width: "90%",
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    borderRadius: 21,
    position: "relative",
    minHeight: 150,
  },
  syncButtonContainer: {
    position: "absolute",
    right: 10,
    bottom: 20,
    alignItems: "center",
  },
  quickTipsContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  quickTipsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionDetails: {
    flex: 1,
  },
  skeletonBox: {
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
