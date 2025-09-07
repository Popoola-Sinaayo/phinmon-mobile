import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const OnboardingBankSuccess = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstOverlayContainer} />
      <View style={styles.secondOverlayContainer} />
      <View style={styles.contentContainer}>
        <Image source={require("@/assets/connect-success.png")} style={styles.image} />
        <Typography color="#4EBA44" weight={700} size={30} align="center">
          Success
        </Typography>

        <View style={{marginTop: 15}}>

        <Typography align="center" color="#000000">
          Now lets get your spending Tracked 😎
        </Typography>
        </View>

        <View style={styles.buttonBottomContainer}>
          <Button
            text="Proceed to Dashboard"
            width={"60%"}
            backgroundColor="#8C78F2"
            onPress={() => navigation.navigate("NavigatorTab")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingBankSuccess;

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
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 120,
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
    marginTop: 60,
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
  image: {
    width: 228,
    height: 200
  },
});
