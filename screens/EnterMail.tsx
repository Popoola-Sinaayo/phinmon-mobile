import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import TextInputComponent from "@/components/TextInput";
import Typography from "@/components/Typography";
import { useNavigation } from "@react-navigation/native";

const EnterMail = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Typography weight={600} size={20} color="#6B6B6B">
          Get Started
        </Typography>
        <TextInputComponent
          label=""
          placeHolder="example@mail.com"
          marginVertical={5}
          style={{ paddingVertical: 8 }}
          value={email}
          setValue={setEmail}
        />
        <View style={{ width: "100%", marginTop: 10 }}>
          <Button
            text="Let's go"
            textWeight={600}
            textSize={18}
            width={"100%"}
            backgroundColor="#8C78F2"
            borderRadius={10}
            onPress={() => {
              navigation.navigate("EmailOtp");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EnterMail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8C78F2",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    //   marginVertical: 8,
    width: "90%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
