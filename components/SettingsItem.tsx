import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "./Typography";
import ChevronRight from "@/assets/svg/ChevronRight";

type SettingsItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Typography weight={500}>{label}</Typography>
      </View>
      <ChevronRight />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  iconContainer: {
    // marginRight: 10,
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  chevron: {
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default SettingsItem;
