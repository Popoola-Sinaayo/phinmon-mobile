import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useGetColor from "../hooks/useGetColor";
import Logo from "../assets/svg/Logo";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "@/utils/storage";

const WelcomeAnimation = () => {
  const navigation = useNavigation();
  const firstAnimation = useSharedValue(5000);
  const secondAnimation = useSharedValue(5000);
  const thirdAnimation = useSharedValue(5000);
  const fourthAnimation = useSharedValue(5000);
  const fifthAnimation = useSharedValue(5000);
  const sixthAnimation = useSharedValue(5000);
  const seventhAnimation = useSharedValue(5000);
  const [navigate, setNavigate] = useState(false);

  const firstAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: firstAnimation.value,
        },
      ],
    };
  });
  const secondAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: secondAnimation.value,
        },
      ],
    };
  });
  const thirdAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: thirdAnimation.value,
        },
      ],
    };
  });
  const fourthAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: fourthAnimation.value,
        },
      ],
    };
  });
  const fifthAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: fifthAnimation.value,
        },
      ],
    };
  });
  const sixthAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: sixthAnimation.value,
        },
      ],
    };
  });
  const seventhAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: seventhAnimation.value,
        },
      ],
    };
  });

  useEffect(() => {
    firstAnimation.value = withDelay(500, withTiming(0, { duration: 1000 }));
    secondAnimation.value = withDelay(600, withTiming(0, { duration: 1000 }));
    thirdAnimation.value = withDelay(700, withTiming(0, { duration: 1000 }));
    fourthAnimation.value = withDelay(800, withTiming(0, { duration: 1000 }));
    fifthAnimation.value = withDelay(900, withTiming(0, { duration: 1000 }));
    sixthAnimation.value = withDelay(1000, withTiming(0, { duration: 1000 }));
    seventhAnimation.value = withDelay(
      1100,
      withTiming(0, { duration: 1000 }, () => {
        console.log("Animation completed");
        runOnJS(setNavigate)(true);
      })
    );
  }, []);

  useEffect(() => {
    const navigateDetails = async () => {
      if (!navigate) return;
      const token = await getToken();
      console.log("Token found:", token);
      // navigation.navigate(token ? "NavigatorTab" : "WelcomeAnimation");
      navigation.reset({
        index: 0,
        // routes: [{ name: "GetStarted" }],
        routes: [{ name: !token ? "Onboarding" : "NavigatorTab" }],
      });
    };
    navigateDetails();
  }, [navigate]);

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: useGetColor("primary"),
      }}
    >
      <Logo />
      <Animated.View style={styles.textContainer}>
        {/* <Animated.Text> */}
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            firstAnimationStyle,
          ]}
        >
          W
        </Animated.Text>
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            secondAnimationStyle,
          ]}
        >
          e
        </Animated.Text>
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            thirdAnimationStyle,
          ]}
        >
          l
        </Animated.Text>
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            fourthAnimationStyle,
          ]}
        >
          c
        </Animated.Text>
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            fifthAnimationStyle,
          ]}
        >
          o
        </Animated.Text>
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            sixthAnimationStyle,
          ]}
        >
          m
        </Animated.Text>
        <Animated.Text
          style={[
            { color: "white", fontSize: 35, fontWeight: 600 },
            seventhAnimationStyle,
          ]}
        >
          e
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeAnimation;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
});
