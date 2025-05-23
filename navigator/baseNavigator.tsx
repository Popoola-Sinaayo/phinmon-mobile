import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeAnimation from "../screens/WelcomeAnimation";

const Stack = createNativeStackNavigator();

const BaseNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
          <Stack.Screen name="Home" component={WelcomeAnimation} />
      {/* Add your screens here */}
    </Stack.Navigator>
  );
}
export default BaseNavigator;