import { StyleSheet, Text, View } from "react-native";
import React, { use, useEffect, useState } from "react";
import Typography from "../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import {
  MonoProvider,
  useMonoConnect,
  MonoConnectButton,
} from "@mono.co/connect-react-native";
import { useMutation } from "@tanstack/react-query";
import { exhangeMonoCodeForToken } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";

const OnboardingBank = () => {
  const navigation = useNavigation();
  const { init, reauthorise } = useMonoConnect();
  const [institutionSelected, setInstitutionSelected] = useState("")
  const exhangeMonoCodeForTokenMutation = useMutation({
    mutationFn: exhangeMonoCodeForToken,
    onSuccess: (data) => {
      console.log("Details updated:", data);
      showMessage({
        message: "Bank Connected Successfully",
        type: "success",
      });

      setTimeout(() => {
        navigation.navigate("OnboardingBankSuccess");
      }, 2000);
    },

    onError: (error) => {
      console.error("Onboarding details error:", error);
      showMessage({
        message: "Bank Connection Failed, Try again",
        type: "danger",
      });
    },
  });

  const config = {
    publicKey: "test_pk_o0xzst25ptu1geuqq8qm",
    scope: "auth",
    // data: {
    //   customer: { id: "P015152" },
    // },
    // accountId: "P015152",
    onClose: () => alert("Widget closed"),
    onSuccess: (data: any) => {
      const code = data.getAuthCode();
      console.log("Access code", code);
    },
    onEvent: (eventName: string, data: any) => {
      // optional
      console.log(eventName);
      console.log(data);
      if (eventName === "INSTITUTION_SELECTED") {
        setInstitutionSelected(data.institution.name);
      }
      if (eventName === "SUCCESS") {
        console.log(data.code);
        exhangeMonoCodeForTokenMutation.mutate({ code: data.code, institution: institutionSelected });
      }
    },
  };
  useEffect(() => {
    if (exhangeMonoCodeForTokenMutation.isPending) {
      // console.log("Loading...");
      showMessage({
        message: "Connecting to bank...",
        type: "info",
        autoHide: false,
      });
    }
  }, [exhangeMonoCodeForTokenMutation.isPending]);
  return (
    <MonoProvider {...config}>
      <SafeAreaView style={styles.container}>
        <View style={styles.firstOverlayContainer} />
        <View style={styles.secondOverlayContainer} />
        <View style={styles.contentContainer}>
          <Typography
            text="Hook up your bank👨‍💼"
            weight={500}
            color="#000000"
            size={28}
            align="center"
          />

          <Typography align="center" color="#000000">
            So we can track your glow-up
          </Typography>

          <View style={styles.buttonBottomContainer}>
            {/* <Button
                text="Connect Account"
                width={"100%"}
                backgroundColor="#8C78F2"
                onPress={() => {
                  console.log("Pressed");
                  init();
                  // reauthorise("P015152");
                }}
              /> */}
            <MonoConnectButton />
          </View>
        </View>
      </SafeAreaView>
    </MonoProvider>
  );
};

export default OnboardingBank;

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
    // justifyContent: "flex-end",
    width: "90%",
    alignSelf: "center",
    marginTop: 60
    // flexDirection: "row"
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
