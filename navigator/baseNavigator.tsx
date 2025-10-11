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
import { useLayoutEffect } from "react";
import AccountDetails from "@/screens/AccountDetails";
import NotificationPreferences from "@/screens/NotificationPreferences";
import KeywordPreferences from "@/screens/KeywordPreferences";
import ConnectedAccounts from "@/screens/ConnectedAccounts";

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
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen
        name="NotificationPreferences"
        component={NotificationPreferences}
      />
      <Stack.Screen name="KeywordPreferences" component={KeywordPreferences} />
      <Stack.Screen name="ConnectedAccounts" component={ConnectedAccounts} />

      {/* Add your screens here */}
    </Stack.Navigator>
  );
};
export default BaseNavigator;