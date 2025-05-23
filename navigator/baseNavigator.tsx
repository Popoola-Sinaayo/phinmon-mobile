import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeAnimation from "../screens/WelcomeAnimation";
import { RootStackParamList } from "../types/navigator";
import GetStarted from "../screens/GetStarted";

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
      {/* Add your screens here */}
    </Stack.Navigator>
  );
};
export default BaseNavigator;