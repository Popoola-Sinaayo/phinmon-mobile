import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "./Typography";
import ChevronRight from "@/assets/svg/ChevronRight";
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <Typography weight={500} color={theme.text}>
          {label}
        </Typography>
      </View>
      <ChevronRight color={theme.textSecondary} />
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
