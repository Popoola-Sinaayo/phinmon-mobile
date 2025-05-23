import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ButtonProps } from "../types/component";
import Typography from "./Typography";

const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor = "#000",
  textColor = "#fff",
  textSize = 14,
  textWeight = "400",
    borderRadius = 5,
  paddingTop = 10,
  paddingBottom = 10,
}) => {
  return (
    <Pressable
      style={{
        width: "100%",
        backgroundColor,
        borderRadius,
        paddingTop,
        paddingBottom,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        text={text}
        weight={textWeight}
        size={textSize}
        color={textColor}
      />
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
