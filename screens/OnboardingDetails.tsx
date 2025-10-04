import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Typography from "../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import TextInputComponent from "@/components/TextInput";
import CountryInput from "@/components/CountryInput";
import { useMutation } from "@tanstack/react-query";
import { onboardUser } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";
import { setLocalName } from "@/utils/storage";

const OnboardingDetails = () => {
  const navigation = useNavigation();
  const [details, setDetails] = useState({
    fullName: "",
    phoneNumber: "",
    country: "",
  });
  const onboardingDetailsMutation = useMutation({
    mutationFn: onboardUser,
    onSuccess: (data) => {
      console.log("Details updated:", data);
      showMessage({
        message: "Details Updated Successfully",
        type: "success",
      });
      setLocalName(details.fullName?.split(" ")[0]);
      setTimeout(() => {
        navigation.navigate("OnboardingBank");
      }, 2000);
    },
    onError: (error) => {
      console.error("Onboarding details error:", error);
      showMessage({
        message: "Onboarding Details Update Failed",
        type: "danger",
      });
    },
  });
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView style={styles.container}>
        <View style={styles.firstOverlayContainer} />
        <View style={styles.secondOverlayContainer} />
        <View style={styles.contentContainer}>
          <Typography
            text="Let’s get to know you 😎"
            weight={500}
            color="#000000"
            size={28}
            align="center"
          />
          <View style={styles.formContainer}>
            <TextInputComponent
              label="Full Name"
              placeHolder="What should we call you?"
              value={details.fullName}
              setValue={(data) => {
                setDetails((prev) => ({ ...prev, fullName: data }));
              }}
              borderColor="#E5E5E5"
              placeHolderColor="#B9B9B9"
              labelColor="#484848"
              height={45}
            />
            <TextInputComponent
              label="Phone Number"
              placeHolder="Digits we can text starting with country code"
              value={details.phoneNumber}
              setValue={(data) => {
                setDetails((prev) => ({ ...prev, phoneNumber: data }));
              }}
              borderColor="#E5E5E5"
              placeHolderColor="#B9B9B9"
              labelColor="#484848"
              height={45}
              type="tel"
            />
            <CountryInput
              label="Country"
              placeHolder="Where you at?"
              setValue={(data) => {
                console.log(data);
                setDetails((prev) => ({ ...prev, country: data }));
              }}
              value={details.country}
            />
          </View>
          <View style={styles.buttonBottomContainer}>
            <Button
              text="Next"
              width={120}
              isLoading={onboardingDetailsMutation.isPending}
              backgroundColor="#8C78F2"
              onPress={() => {
                onboardingDetailsMutation.mutate(details);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OnboardingDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8C78F2",
    flex: 1,
    position: "relative",
  },
  firstOverlayContainer: {
    backgroundColor: "#C2B5FF",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "95%",
    borderTopRightRadius: 207,
    borderTopLeftRadius: 71,
  },
  secondOverlayContainer: {
    backgroundColor: "#D6CEFF",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 121,
    borderTopRightRadius: 49,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    // left: 0,
    // right: 0,
    height: "86%",
    width: "100%",
    paddingTop: 120,
    backgroundColor: "#ffffff",
    // justifyContent: "center",
    // alignItems: "center",
    borderTopLeftRadius: 51,
    borderTopRightRadius: 49,
    borderBottomLeftRadius: 171,
    borderBottomRightRadius: 86,
  },
  privacyTextContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    alignSelf: "center",
    // right: 0,
    padding: 16,
  },
  buttonBottomContainer: {
    justifyContent: "flex-end",
    width: "95%",
    flexDirection: "row",
    marginTop: 40,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 110,
    left: 0,
    width: "100%",
    // right: 0,
    alignSelf: "center",
  },
  formContainer: {
    marginTop: 30,
    width: "90%",
    alignSelf: "center",
    gap: 10,
  },
  subTitleContainer: {
    width: "60%",
    alignSelf: "center",
    bottom: 180,
    position: "absolute",
  },
});
