import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import useGetColor from "./hooks/useGetColor";
import { NavigationContainer } from "@react-navigation/native";
import BaseNavigator from "./navigator/baseNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlashMessage from "react-native-flash-message";
import {
  StatusBar as ExpoStatusBar,
  setStatusBarBackgroundColor,
} from "expo-status-bar";
import { useEffect } from "react";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <BaseNavigator />
        <FlashMessage position="top" />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
