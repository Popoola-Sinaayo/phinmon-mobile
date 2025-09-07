import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import TextInputComponent from "@/components/TextInput";
import Typography from "@/components/Typography";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { showMessage, hideMessage } from "react-native-flash-message";
import { authenticateUser } from "@/requests/authentication";

const EnterMail = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const authenticateUserMutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: async (data) => {
      // ✅ invalidate cache to refresh GET request after POST
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User authenticated:", data);
      navigation.navigate("EmailOtp", { email });
    },
    onError: (error) => {
      console.error("Authentication error:", error);
      showMessage({
        message: "Authentication Failed",
        type: "danger",
      });
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={require("@/assets/enter-email.png")}
          style={styles.image}
        />
        <TextInputComponent
          label="Email"
          borderColor="#E5E5E5"
          placeHolderColor="#B9B9B9"
          labelColor="#717171"
          placeHolder="example@mail.com"
          marginVertical={5}
          style={{ paddingVertical: 8 }}
          value={email}
          setValue={setEmail}
          height={40}
        />
        <View style={{ width: "100%", marginTop: 10 }}>
          <Button
            text="Let's go"
            textWeight={600}
            textSize={18}
            width={"100%"}
            backgroundColor="#8C78F2"
            borderRadius={10}
            isLoading={authenticateUserMutation.isPending}
            onPress={() => {
              authenticateUserMutation.mutate(email);
              // navigation.navigate("EmailOtp");
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
    paddingVertical: 15,
    //   marginVertical: 8,
    width: "90%",
    // height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 100,
    marginBottom: 20,
    borderRadius: 10
  },
});
