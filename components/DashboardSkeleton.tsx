import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function DashboardSkeleton() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={styles.container}>
        <View style={styles.avatar} />
        <View style={styles.textWrapper}>
          <View style={styles.line} />
          <View style={[styles.line, { width: 150 }]} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textWrapper: {
    marginLeft: 20,
  },
  line: {
    width: 200,
    height: 20,
    marginBottom: 6,
  },
});
