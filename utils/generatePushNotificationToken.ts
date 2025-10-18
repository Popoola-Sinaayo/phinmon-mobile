
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
// import Device from "expo-device";
import Constants from "expo-constants";

export default async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  // console.log("Device.isDevice", Device.isDevice);

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    //   handleRegistrationError(
    //     "Permission not granted to get push token for push notification!"
    //   );
    console.warn(
      "Permission not granted to get push token for push notification!"
    );
    return;
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) {
    //   handleRegistrationError("Project ID not found");
    console.warn("Project ID not found");
  }
  console.log("projectId", projectId);
  try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log(pushTokenString);
    return pushTokenString;
  } catch (e: unknown) {
    //   handleRegistrationError(`${e}`);
    console.warn(`${e}`);
  }
  // } else {
  //   // handleRegistrationError("Must use physical device for push notifications");
  //       console.warn("Must use physical device for push notifications");
  // }
}
