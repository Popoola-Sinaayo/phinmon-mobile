import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const WelcomeStarted = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstOverlayContainer} />
      <View style={styles.secondOverlayContainer} />
      <View style={styles.contentContainer}>
        <Typography
          text="Hey spender 👋"
          weight={500}
          color="#000000"
          size={38}
          align="center"
        />
        <View style={styles.subTitleContainer}>
        <Image
          source={require("@/assets/financial-literacy.png")}
          style={styles.imageItem}
        />
          <Typography
            text="Get ready to spend 🚀 wisely and learn your income."
            align="center"
            size={20}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Get Started"
            width={"60%"}
            backgroundColor="#8C78F2"
            borderRadius={10}
            onPress={() => navigation.navigate("EnterMail")}
          />
        </View>
        <View style={styles.privacyTextContainer}>
          <Typography
            text="By tapping 'Get Started' you're accepting the Terms of Use and Privacy Policy"
            align="center"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeStarted;

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
    height: "93%",
    borderTopLeftRadius: 133,
    borderTopRightRadius: 139,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    // left: 0,
    // right: 0,
    height: "91%",
    width: "100%",
    paddingTop: 100,
    backgroundColor: "#ffffff",
    // justifyContent: "center",
    // alignItems: "center",
    borderTopLeftRadius: 227,
    borderTopRightRadius: 138,
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
    position: "absolute",
  },

  imageItem: {
    alignSelf: "center",
    width: 250,
    height: 250,
    marginBottom: 20,
  },
});
