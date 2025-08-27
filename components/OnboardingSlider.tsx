import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OnboardingSlider: React.FC<{active: "1" | "2" | "3"}> = ({active}) => {
  return (
    <View style={styles.container}>
      <View style={active === "1" ? styles.activeItem : styles.item}></View>
      <View style={active === "2" ? styles.activeItem : styles.item}></View>
      <View style={active === "3" ? styles.activeItem : styles.item}></View>
    </View>
  );
};

export default OnboardingSlider;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 16,
    paddingTop: 20,
  },
  item: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    height: 10,
    width: 10,
  },
  activeItem: {
    backgroundColor: "#D9D9D9",
    borderRadius: 999,
    height: 10,
    width: 35,
  },
});
