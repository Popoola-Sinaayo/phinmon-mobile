
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
