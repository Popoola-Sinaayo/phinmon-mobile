import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeAnimation from "../screens/WelcomeAnimation";
import { RootStackParamList } from "../types/navigator";
import GetStarted from "../screens/GetStarted";
import Onboarding from "../screens/Onboarding";
import WelcomeStarted from "../screens/WelcomeStarted";
import EnterMail from "../screens/EnterMail";
import EnterOtp from "@/screens/EnterOtp";
import OnboardingDetails from "@/screens/OnboardingDetails";
import OnboardingBank from "@/screens/OnboardingBank";
import OnboardingBankSuccess from "@/screens/OnboardingBankSuccess";
import BottomNavigator from "./BottomNavigator";
import { getToken } from "@/utils/storage";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

// SplashScreen.preventAutoHideAsync();

const BaseNavigator = () => {
  // const navigation = useNavigation();
  // const navigateToDashboard = async () => {
  //   const token = await getToken();
  //   console.log(token);
  //   navigation.navigate(token ? "NavigatorTab" : "WelcomeAnimation");
  //   SplashScreen.hideAsync();
  // };

  useLayoutEffect(() => {
    // navigateToDashboard();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="WelcomeAnimation" component={WelcomeAnimation} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="WelcomeStarted" component={WelcomeStarted} />
      <Stack.Screen name="EnterMail" component={EnterMail} />
      <Stack.Screen name="EmailOtp" component={EnterOtp} />
      <Stack.Screen name="OnboardingDetails" component={OnboardingDetails} />
      <Stack.Screen name="OnboardingBank" component={OnboardingBank} />
      <Stack.Screen
        name="OnboardingBankSuccess"
        component={OnboardingBankSuccess}
      />
      <Stack.Screen name="NavigatorTab" component={BottomNavigator} />

      {/* Add your screens here */}
    </Stack.Navigator>
  );
};
export default BaseNavigator;