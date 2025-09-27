import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "./Typography";

const ChatCard: React.FC<{ mode: "user" | "ai" }> = ({ mode }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: mode === "user" ? "#8C78F2" : "#9F9D9D",
          alignSelf: mode === "user" ? "flex-end" : "flex-start",
          borderBottomRightRadius: mode === "user" ? 0 : 16,
          borderBottomLeftRadius: mode === "user" ? 16 : 0,
        },
      ]}
    >
      <Typography color="#FFFFFF">
        Hello, how can I assist you today?
      </Typography>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    width: 240,
    borderRadius: 16,
    padding: 16,
        marginVertical: 8,
    marginHorizontal: 10,
  },
});
