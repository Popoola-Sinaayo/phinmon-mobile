
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

export const getChatMessages = async () => {
  try {
    const messages = await AsyncStorage.getItem("chatMessages");
    return messages ? JSON.parse(messages) : [];
  } catch (error) {
    console.error("Error getting chat messages:", error);
    return [];
  }
};

export const saveChatMessage = async (message: any) => {
  try {
    const existingMessages = await getChatMessages();
    const updatedMessages = [...existingMessages, message];
    await AsyncStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  } catch (error) {
    console.error("Error saving chat message:", error);
  }
};

export const clearChatMessages = async () => {
  try {
    await AsyncStorage.removeItem("chatMessages");
  } catch (error) {
    console.error("Error clearing chat messages:", error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};


