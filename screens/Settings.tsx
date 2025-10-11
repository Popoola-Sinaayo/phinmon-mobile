import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Typography from '@/components/Typography';
import SettingsItem from "@/components/SettingsItem";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import NotificationIcon from "@/assets/svg/NotificationIcon";
import HashIcon from "@/assets/svg/HashIcon";
import CreditCardIcon from "@/assets/svg/CreditCard";
import LogoutIcon from "@/assets/svg/LogoutIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "WelcomeAnimation" }],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Settings
        </Typography>
      </View>
      <View style={styles.settingsContainer}>
        <SettingsItem
          icon={<ProfileIcon />}
          label="Account Details"
          onPress={() => {
            navigation.navigate("AccountDetails");
          }}
        />
        <SettingsItem
          icon={<NotificationIcon />}
          label="Notification Preferences"
          onPress={() => {
            navigation.navigate("NotificationPreferences");
          }}
        />
        <SettingsItem
          icon={<HashIcon />}
          label="Keyword Preferences"
          onPress={() => {
            navigation.navigate("KeywordPreferences");
          }}
        />
        <SettingsItem
          icon={<CreditCardIcon />}
          label="Connected Accounts"
          onPress={() => {
            navigation.navigate("ConnectedAccounts");
          }}
        />
        <SettingsItem icon={<LogoutIcon />} label="Logout" onPress={logout} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    position: "relative",
    backgroundColor: "#f9f9f9",
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    // paddingVertical: 20,
    // backgroundColor: "red",
  },
  settingsContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});