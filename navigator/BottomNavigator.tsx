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
import { useTheme } from "@/contexts/ThemeContext";

const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomNavigator = () => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: (focused) => (
            <HomeBottomNavigator
              color={focused.focused ? theme.primary : theme.textTertiary}
            />
          ),
          tabBarLabel: (focused) => (
            <Typography
              color={focused.focused ? theme.primary : theme.textTertiary}
            >
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
              color={focused.focused ? theme.primary : theme.textTertiary}
            />
          ),
          tabBarLabel: (focused) => (
            <Typography
              color={focused.focused ? theme.primary : theme.textTertiary}
            >
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
              color={focused.focused ? theme.primary : theme.textTertiary}
            />
          ),
          tabBarLabel: (focused) => (
            <Typography
              color={focused.focused ? theme.primary : theme.textTertiary}
            >
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
              color={focused.focused ? theme.primary : theme.textTertiary}
            />
          ),
          tabBarLabel: (focused) => {
            return (
              <Typography
                color={focused.focused ? theme.primary : theme.textTertiary}
              >
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
              color={focused.focused ? theme.primary : theme.textTertiary}
            />
          ),
          tabBarLabel: (focused) => {
            return (
              <Typography
                color={focused.focused ? theme.primary : theme.textTertiary}
              >
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
