import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useGetColor from './hooks/useGetColor';
import { NavigationContainer } from "@react-navigation/native";
import BaseNavigator from "./navigator/baseNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const queryClient = new QueryClient();
  const color = useGetColor("primary");
  
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <BaseNavigator />
        <FlashMessage position="top" />
      </QueryClientProvider>
      <StatusBar style="auto" backgroundColor={color} />
    </NavigationContainer>
  );
}