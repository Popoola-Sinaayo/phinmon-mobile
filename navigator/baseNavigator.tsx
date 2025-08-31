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

const Stack = createNativeStackNavigator<RootStackParamList>();

const BaseNavigator = () => {
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

      {/* Add your screens here */}
    </Stack.Navigator>
  );
};
export default BaseNavigator;