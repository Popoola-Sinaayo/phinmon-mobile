import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Typography from "./Typography";
import { CountryInputProps } from "@/types/component";
import { CountryPicker } from "react-native-country-codes-picker";

const CountryInput: React.FC<CountryInputProps> = ({
  label,
  placeHolder,
  marginVertical = 10,
  borderColor = "#737373",
  value,
  setValue,
  backgroundColor,
  style,
  placeHolderColor = "#B9B9B9",
  labelColor = "#000000",
  height,
}) => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
      <View style={{ marginVertical, width: "100%" }}>
        <View style={{ position: "relative" }}>
          <View style={styles.placeholderContainer}>
            <Typography align="left" color={labelColor} weight="600">
              {label}
            </Typography>
          </View>
          <Pressable style={[styles.input]} onPress={() => setShowModal(true)}>
            <Typography
              align="left"
              color={!value ? placeHolderColor : "#000"}
              weight="400"
            >
              {value || placeHolder}
            </Typography>
          </Pressable>
        </View>
      </View>
      <CountryPicker
              show={showModal}
              style={{modal: {marginTop: 60}}}
              lang="en"
              searchMessage=""
            //   showOnly={["NG"]}
        // when picker button press you will get the country object with dial code
              pickerButtonOnPress={(item) => {
            setShowModal(false)
          // setCountryCode(item.dial_code);
          // setShow(false);
        }}
      />
    </>
  );
};

export default CountryInput;

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
    borderColor: "#E5E5E5",
    padding: 10,
    paddingVertical: Platform.OS === "ios" ? 13 : 8,
      borderRadius: 10,
      height: 45,
    justifyContent: "center",
  },
});
