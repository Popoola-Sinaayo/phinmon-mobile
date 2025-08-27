import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const OnboardingDetails = () => {
    const navigation = useNavigation();
  return (
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
      
       
      </View>
    </SafeAreaView>
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
  buttonContainer: {
    position: "absolute",
    bottom: 110,
    left: 0,
    width: "100%",
    // right: 0,
    alignSelf: "center",
  },
    subTitleContainer: {
        width: "60%",
        alignSelf: "center",
        bottom: 180,
        position: "absolute"
  },
});
