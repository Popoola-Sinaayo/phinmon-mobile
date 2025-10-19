import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TypographyProps } from '../types/component'
import { useTheme } from "@/contexts/ThemeContext";

const Typography: React.FC<TypographyProps> = ({
  text,
  color,
  size,
  weight,
  children,
  marginBottom,
  marginTop,
  align,
  variant = "body",
}) => {
  const { theme } = useTheme();

  // Default colors based on variant if no color is provided
  const getDefaultColor = () => {
    if (color) return color;

    switch (variant) {
      case "heading":
        return theme.text;
      case "subheading":
        return theme.textSecondary;
      case "body":
        return theme.text;
      case "caption":
        return theme.textTertiary;
      case "inverse":
        return theme.textInverse;
      default:
        return theme.text;
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: size ?? 14,
          fontWeight: weight ?? "400",
          color: getDefaultColor(),
          marginTop,
          marginBottom,
          textAlign: align,
        }}
      >
        {text ?? children}
      </Text>
    </View>
  );
};

export default Typography

const styles = StyleSheet.create({})