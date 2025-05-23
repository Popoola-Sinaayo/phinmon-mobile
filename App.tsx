import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useGetColor from './hooks/useGetColor';
import { NavigationContainer } from "@react-navigation/native";
import BaseNavigator from "./navigator/baseNavigator";

export default function App() {
  const color = useGetColor("primary");
  return (
    <NavigationContainer>
      <BaseNavigator />
    </NavigationContainer>
  );
}