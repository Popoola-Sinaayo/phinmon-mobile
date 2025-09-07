import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import OnboardingSlider from "../components/OnboardingSlider";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "../components/Typography";
import OnboardingNextArrow from "../assets/svg/OnboardingNextArrow";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigation = useNavigation();
  const items = [
    {
      id: "1",
      title: "Track your money mood 💵",
      description:
        "We turn your bank data into real insights, so you always know how your cash is vibing.",
    },
    {
      id: "2",
      title: "Real advice, not boring tips 🧠",
      description:
        "Get money tea brewed just for you AI-powered tips based on your actual spending.",
    },
    {
      id: "3",
      title: "See where your money goes 🎯",
      description:
        "Charts, tags, and breakdowns that actually make sense. No finance degree needed.",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState<"1" | "2" | "3">("1");
  return (
    <ImageBackground
      style={{ flex: 1,  }}
      source={
        currentIndex === "1"
          ? require("@/assets/demo-1.png")
          : currentIndex === "2"
          ? require("@/assets/demo-2.png")
          : require("@/assets/demo-3.png")
      }
    >
      <SafeAreaView style={styles.container}>
        <OnboardingSlider active={currentIndex} />
        <View
          style={[
            styles.bottomOverlayContainer,
            {
              borderTopLeftRadius:
                currentIndex === "1" ? 175 : currentIndex === "2" ? 34 : 122,
              borderTopRightRadius:
                currentIndex === "1" ? 34 : currentIndex === "2" ? 175 : 137,
            },
          ]}
        ></View>
        <View style={styles.bottomContainer}>
          <Typography
            weight={600}
            color="#4F35CE"
            size={30}
            text={items[Number(currentIndex) - 1].title}
          />
          <View style={{ marginTop: 10 }}>
            <Typography
              text={items[Number(currentIndex) - 1].description}
              color="#313030"
              size={24}
              weight={300}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 60,
              width: "100%",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={styles.bottomItemContainer}>
              <Pressable>
                <Typography text="Skip" size={18} />
              </Pressable>
              <Pressable
                style={styles.arrowContainer}
                onPress={() => {
                  if (currentIndex === "1") {
                    setCurrentIndex("2");
                  } else if (currentIndex === "2") {
                    setCurrentIndex("3");
                  } else {
                    navigation.navigate("WelcomeStarted");
                  }
                }}
              >
                <OnboardingNextArrow />
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    // backgroundColor: "#8C78F2",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    //   right: 0,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "43%",
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 30,
    //   padding: 16,
  },
  bottomOverlayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    //   right: 0,
    backgroundColor: "#DCDCDC",
    width: "100%",
    height: "45%",

    //   padding: 16,
  },
  arrowContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: "#856DFD",
  },
  bottomItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
});
