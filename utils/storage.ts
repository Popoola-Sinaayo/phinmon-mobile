
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isOnboardingUI = async () => {
  try {
    const value = await AsyncStorage.getItem("isOnboarding");
    return value === "true";
  } catch (error) {
    console.error("Error reading isOnboarding value:", error);
    return false;
  }
};

export const setOnboardingUICompleted = async () => {
  try {
    await AsyncStorage.setItem("isOnboarding", JSON.stringify("true"));
  } catch (error) {
    console.error("Error setting isOnboarding value:", error);
  }
};

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error setting token:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const getLocalName = async () => {
  try {
    const value = await AsyncStorage.getItem("name");
    return value;
  } catch (error) {
    console.error("Error reading name value:", error);
    return null;
  }
};

export const setLocalName = async (name: string) => {
  try {
    await AsyncStorage.setItem("name", name);
  } catch (error) {
    console.error("Error setting name value:", error);
  }
};


