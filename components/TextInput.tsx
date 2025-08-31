import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import React from "react";
import Typography from "./Typography";
import { TextInputComponentProps } from "@/types/component";

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  label,
  placeHolder,
  marginVertical = 10,
  borderColor = "#737373",
  value,
  setValue,
  type = "text",
  backgroundColor,
  allowMultipleLine = false,
  numberOfLines,
  style,
  placeHolderColor = "#B9B9B9",
  labelColor = "#000000",
  height,
}) => {
  return (
    <View style={{ marginVertical, width: "100%" }}>
      <View style={{ position: "relative" }}>
        <View style={styles.placeholderContainer}>
          <Typography align="left" color={labelColor} weight="600">
            {label}
          </Typography>
        </View>
        <TextInput
          style={[
            styles.input,
            {
              borderColor,
              backgroundColor,
              height: height || (allowMultipleLine ? 150 : 50),
              ...(allowMultipleLine && {
                textAlignVertical: "top",
              }),
              fontFamily: "DarkerGrotesque_Regular",
              ...style,
            },
          ]}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderColor || "#3C3C3C"}
          value={value}
          onChangeText={(text) => setValue(text)}
          secureTextEntry={type === "password"}
          keyboardType={
            type === "email"
              ? "email-address"
              : type === "number"
              ? "number-pad"
              : type === "tel"
              ? "phone-pad"
              : "default"
          }
          autoCapitalize="none"
          multiline={allowMultipleLine}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  placeholderContainer: {
    // marginBottom: 5,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    top: -10,
    left: 15,
    paddingHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#737373",
    padding: 10,
    paddingVertical: Platform.OS === "ios" ? 13 : 8,
    borderRadius: 10,
  },
});
