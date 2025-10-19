import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ButtonProps } from "../types/component";
import Typography from "./Typography";
import { useTheme } from "@/contexts/ThemeContext";

const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor,
  textColor,
  textSize = 14,
  textWeight = "400",
  borderRadius = 5,
  paddingTop = 10,
  paddingBottom = 10,
  width = "100%",
  onPress,
  isLoading = false,
}) => {
  const { theme } = useTheme();

  const finalBackgroundColor = backgroundColor || theme.buttonPrimary;
  const finalTextColor = textColor || theme.buttonText;

  return (
    <Pressable
      style={{
        width,
        backgroundColor: isLoading ? theme.textTertiary : finalBackgroundColor,
        borderRadius,
        paddingTop,
        paddingBottom,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        gap: 10,
      }}
      onPress={!isLoading ? () => onPress?.() : undefined}
    >
      <Typography
        text={text}
        weight={textWeight}
        size={textSize}
        color={finalTextColor}
      />
      {isLoading && (
        <ActivityIndicator animating={isLoading} color={finalTextColor} />
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
