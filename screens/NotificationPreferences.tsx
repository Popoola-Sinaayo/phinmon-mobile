import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import NotificationIcon from "@/assets/svg/NotificationIcon";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

interface NotificationPreferences {
  notifications: "all" | "over_set_amount" | "balance_below_amount" | "none";
  notificationSetAmount: number;
}

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    notifications: "all",
    notificationSetAmount: 100,
  });


  const notificationTypes = [
    { key: "all", label: "All Notifications", description: "Get notified for all transactions" },
    { key: "over_set_amount", label: "Over Set Amount", description: "Only when spending exceeds amount" },
    { key: "balance_below_amount", label: "Balance Below Amount", description: "When balance falls below amount" },
    { key: "none", label: "No Notifications", description: "Turn off all notifications" },
  ];


  const handleSave = () => {
    Alert.alert("Success", "Notification preferences updated successfully!");
  };


  const renderNotificationTypeSelector = () => (
    <View style={styles.section}>
      <Typography weight={600} size={16} color="#8C78F2" marginBottom={12}>
        Notification Type
      </Typography>
      {notificationTypes.map((type) => (
        <TouchableOpacity
          key={type.key}
          style={[
            styles.optionCard,
            preferences.notifications === type.key && styles.selectedOption
          ]}
          onPress={() => setPreferences(prev => ({ ...prev, notifications: type.key as any }))}
        >
          <View style={styles.optionContent}>
            <Typography weight={600} size={16} color={preferences.notifications === type.key ? "#8C78F2" : "#212121"}>
              {type.label}
            </Typography>
            <Typography weight={400} size={14} color="#666" marginTop={4}>
              {type.description}
            </Typography>
          </View>
          <View style={[
            styles.radioButton,
            preferences.notifications === type.key && styles.selectedRadio
          ]}>
            {preferences.notifications === type.key && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAmountInput = () => {
    if (preferences.notifications === "over_set_amount" || preferences.notifications === "balance_below_amount") {
      return (
        <View style={styles.section}>
          <Typography weight={600} size={16} color="#8C78F2" marginBottom={12}>
            Amount Threshold
          </Typography>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={preferences.notificationSetAmount.toString()}
              onChangeText={(text) => {
                const amount = parseFloat(text) || 0;
                setPreferences(prev => ({ ...prev, notificationSetAmount: amount }));
              }}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#BDBDBD"
            />
          </View>
        </View>
      );
    }
    return null;
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <NotificationIcon />
            <Typography weight={600} size={24} marginTop={12}>
              Notification Preferences
            </Typography>
            <Typography weight={400} size={14} color="#666" marginTop={8} align="center">
              Customize how and when you receive notifications
            </Typography>
          </View>

          {renderNotificationTypeSelector()}
          {renderAmountInput()}

          <Button
            backgroundColor="#8C78F2"
            text="Save Preferences"
            onPress={handleSave}
            width="100%"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F3FA",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#bfb4f9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F7FF",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedOption: {
    borderColor: "#8C78F2",
    backgroundColor: "#F0EDFF",
  },
  optionContent: {
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadio: {
    borderColor: "#8C78F2",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8C78F2",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F7FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  currencySymbol: {
    fontSize: 18,
    color: "#8C78F2",
    fontWeight: "600",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    color: "#212121",
    paddingVertical: 12,
  },
});

export default NotificationPreferences;
