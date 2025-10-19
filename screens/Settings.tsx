import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeAreaContainer from "@/components/SafeAreaContainer";
import Typography from "@/components/Typography";
import SettingsItem from "@/components/SettingsItem";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import NotificationIcon from "@/assets/svg/NotificationIcon";
import HashIcon from "@/assets/svg/HashIcon";
import CreditCardIcon from "@/assets/svg/CreditCard";
import LogoutIcon from "@/assets/svg/LogoutIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "WelcomeAnimation" }],
    });
  };

  return (
    <SafeAreaContainer backgroundColor={theme.background}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.topContainer}>
          <Typography weight={600} size={24} variant="heading">
            Settings
          </Typography>
        </View>
        <View style={styles.settingsContainer}>
          <SettingsItem
            icon={<ProfileIcon color={theme.text} />}
            label="Account Details"
            onPress={() => {
              navigation.navigate("AccountDetails");
            }}
          />
          <SettingsItem
            icon={<NotificationIcon color={theme.text} />}
            label="Notification Preferences"
            onPress={() => {
              navigation.navigate("NotificationPreferences");
            }}
          />
          <SettingsItem
            icon={<HashIcon color={theme.text} />}
            label="Keyword Preferences"
            onPress={() => {
              navigation.navigate("KeywordPreferences");
            }}
          />
          <SettingsItem
            icon={<CreditCardIcon color={theme.text} />}
            label="Connected Accounts"
            onPress={() => {
              navigation.navigate("ConnectedAccounts");
            }}
          />
          <ThemeToggle />
          <SettingsItem
            icon={<LogoutIcon color={theme.text} />}
            label="Logout"
            onPress={logout}
          />
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  settingsContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});