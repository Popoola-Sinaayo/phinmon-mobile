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

export default function TransactionHistorySkeleton() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header skeleton */}
      <View style={styles.headerContainer}>
        <SkeletonBox width="60%" height={24} />
      </View>

      {/* Transaction items skeleton */}
      <View style={styles.transactionsContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
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
                <SkeletonBox width="70%" height={16} marginBottom={4} />
                <SkeletonBox width="50%" height={12} />
              </View>
            </View>
            <View style={styles.transactionRight}>
              <SkeletonBox width="80%" height={16} marginBottom={4} />
              <SkeletonBox width="60%" height={12} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  transactionsContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
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
  transactionRight: {
    alignItems: "flex-end",
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
