import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useGetColor from "../hooks/useGetColor";
import FlyingMoneyBills from "../assets/svg/FlyingMoneyBills";
import PaperMoney from "../assets/svg/PaperMoney";
import Money from "../assets/svg/Money";
import BundlesOfMoney from "../assets/svg/BundlesOfMoney";
import Button from "../components/Button";
import Typography from "../components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";

const GetStarted = () => {
  return (
    <SafeAreaView
      style={[{ backgroundColor: useGetColor("primary") }, styles.container]}
    >
      <View style={{ flex: 1, height: "50%" }}>
        <View style={styles.flyingBills}>
          <FlyingMoneyBills />
        </View>
        <View style={styles.paperMoney}>
          <PaperMoney />
        </View>
        <View style={styles.money}>
          <Money />
        </View>
        <View style={styles.bundlesOfMoney}>
          <BundlesOfMoney />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Typography
          text="Making sense of your spend"
          color="#fff"
          weight={700}
          size={40}
        />
        <Typography
          text="Stay on top of your money moves"
          marginTop={10}
          marginBottom={30}
          color="#fff"
          size={18}
        />
        <Button
          text="Get Started"
          paddingBottom={15}
          paddingTop={15}
          borderRadius={100}
        />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    position: "relative",
  },
  flyingBills: {
    position: "absolute",
    top: "10%",
  },
  bundlesOfMoney: {
    position: "absolute",
    top: "20%",
  },
  paperMoney: {
    position: "absolute",
    top: "5%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  money: {
    top: "3%",
    left: "50%",
    transform: [{ translateX: -50 }],
    position: "absolute",
  },
    bottomContainer: {
        width: "90%",
        alignSelf: "center",
        // marginBottom: 20,
  },
});
