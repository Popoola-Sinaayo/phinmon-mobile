import Dashboard from "@/screens/Dashboard";
import { RootTabParamList } from "@/types/navigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import Typography from "@/components/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeBottomNavigator from "@/assets/svg/HomeBottomNavigator";
import ChatAI from "@/screens/ChatAI";
import BottomNavigatorChat from "@/assets/svg/BottomNavigatorChat";
import TransactionHistory from "@/screens/TransactionHistory";
import BottomNavigatorHistory from "@/assets/svg/BottomNavigatorHistory";
import Analysis from "@/screens/Analysis";
import BottomNavigatorAnalyze from "@/assets/svg/BottomNavigatorAnalyze";
import Settings from "@/screens/Settings";
import BottomNavigationSettings from "@/assets/svg/BottomNavigationSettings";

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        // tabBarStyle: {
        //   //   backgroundColor: "red",
        //   //   backgroundColor: "#D6D6D67D",
        //   borderRadius: 30,
        //   height: 60,
        //   bottom: insets.bottom,
        //   width: "90%",
        //   paddingBottom: 0,

        //   alignSelf: "center",
        //   paddingTop: 4,
        // },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: (focused) => (
            <HomeBottomNavigator
              color={focused.focused ? "#8C78F2" : "#818181"}
            />
          ),
          tabBarLabel: (focused) => (
            <Typography color={focused.focused ? "#8C78F2" : "#818181"}>
              Home
            </Typography>
          ),
        }}
      />
      <Tab.Screen
        name="ChatWithAI"
        component={ChatAI}
        options={{
          tabBarIcon: (focused) => (
            <BottomNavigatorChat
              color={focused.focused ? "#8C78F2" : "#818181"}
            />
          ),
          tabBarLabel: (focused) => (
            <Typography color={focused.focused ? "#8C78F2" : "#818181"}>
              Chat AI
            </Typography>
          ),
        }}
      />
      <Tab.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          tabBarIcon: (focused) => (
            <BottomNavigatorHistory
              color={focused.focused ? "#8C78F2" : "#818181"}
            />
          ),
          tabBarLabel: (focused) => (
            <Typography color={focused.focused ? "#8C78F2" : "#818181"}>
              History
            </Typography>
          ),
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarIcon: (focused) => (
            <BottomNavigatorAnalyze
              color={focused.focused ? "#8C78F2" : "#818181"}
            />
          ),
          tabBarLabel: (focused) => {
            return (
              <Typography color={focused.focused ? "#8C78F2" : "#818181"}>
                Analysis
              </Typography>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: (focused) => (
            <BottomNavigationSettings
              color={focused.focused ? "#8C78F2" : "#818181"}
            />
          ),
          tabBarLabel: (focused) => {
            return (
              <Typography color={focused.focused ? "#8C78F2" : "#818181"}>
                Settings
              </Typography>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
