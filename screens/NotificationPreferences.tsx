import React, { useState, useEffect } from "react";
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
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { Ionicons } from "@expo/vector-icons";
import NotificationIcon from "@/assets/svg/NotificationIcon";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationPreferences } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";
import { useUserData } from "@/hooks/useUserData";
import { useTheme } from "@/contexts/ThemeContext";

interface NotificationPreferences {
  notifications: "all" | "over_set_amount" | "balance_below_amount" | "none";
  notificationSetAmount: number;
}

const NotificationPreferences = () => {
  const { data: userData, isLoading } = useUserData();
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    notifications: "all",
    notificationSetAmount: 100,
  });

  // Update preferences when userData loads
  useEffect(() => {
    if (userData?.preferences) {
      setPreferences({
        notifications: userData.preferences.notifications || "all",
        notificationSetAmount:
          userData.preferences.notificationSetAmount || 100,
      });
    }
  }, [userData]);

  const updatePreferencesMutation = useMutation({
    mutationFn: updateNotificationPreferences,
    onSuccess: (data) => {
      console.log("Preferences updated:", data);
      showMessage({
        message: "Notification preferences updated successfully!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      console.error("Preferences update error:", error);
      showMessage({
        message: "Failed to update preferences. Please try again.",
        type: "danger",
      });
    },
  });

  const notificationTypes = [
    {
      key: "all",
      label: "All Notifications",
      description: "Get notified for all transactions",
    },
    {
      key: "over_set_amount",
      label: "Over Set Amount",
      description: "Only when spending exceeds amount",
    },
    {
      key: "balance_below_amount",
      label: "Balance Below Amount",
      description: "When balance falls below amount",
    },
    {
      key: "none",
      label: "No Notifications",
      description: "Turn off all notifications",
    },
  ];

  const handleSave = () => {
    updatePreferencesMutation.mutate({
      notifications: preferences.notifications,
      notificationSetAmount: preferences.notificationSetAmount,
    });
  };

  const renderNotificationTypeSelector = () => (
    <View
      style={[
        styles.section,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Typography
        weight={600}
        size={16}
        color={theme.primary}
        marginBottom={12}
      >
        Notification Type
      </Typography>
      {notificationTypes.map((type) => (
        <TouchableOpacity
          key={type.key}
          style={[
            styles.optionCard,
            {
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.border,
            },
            preferences.notifications === type.key && {
              backgroundColor: theme.primary + "20",
              borderColor: theme.primary,
            },
          ]}
          onPress={() =>
            setPreferences((prev) => ({
              ...prev,
              notifications: type.key as any,
            }))
          }
        >
          <View style={styles.optionContent}>
            <Typography
              weight={600}
              size={16}
              color={
                preferences.notifications === type.key
                  ? theme.primary
                  : theme.text
              }
            >
              {type.label}
            </Typography>
            <Typography
              weight={400}
              size={14}
              color={theme.textSecondary}
              marginTop={4}
            >
              {type.description}
            </Typography>
          </View>
          <View
            style={[
              styles.radioButton,
              preferences.notifications === type.key && styles.selectedRadio,
            ]}
          >
            {preferences.notifications === type.key && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAmountInput = () => {
    if (
      preferences.notifications === "over_set_amount" ||
      preferences.notifications === "balance_below_amount"
    ) {
      return (
        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Typography
            weight={600}
            size={16}
            color={theme.primary}
            marginBottom={12}
          >
            Amount Threshold
          </Typography>
          <View style={styles.amountInputContainer}>
            <TextInput
              style={[
                styles.amountInput,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.text,
                },
              ]}
              value={preferences.notificationSetAmount.toString()}
              onChangeText={(text) => {
                const amount = parseFloat(text) || 0;
                setPreferences((prev) => ({
                  ...prev,
                  notificationSetAmount: amount,
                }));
              }}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={theme.textTertiary}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <NotificationIcon color={theme.primary} />
            <Typography weight={600} size={24} marginTop={12} variant="heading">
              Notification Preferences
            </Typography>
            <Typography
              weight={400}
              size={14}
              color={theme.textSecondary}
              marginTop={8}
              align="center"
            >
              Customize how and when you receive notifications
            </Typography>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Typography weight={500} size={16} variant="body">
                Loading preferences...
              </Typography>
            </View>
          ) : (
            <>
              {renderNotificationTypeSelector()}
              {renderAmountInput()}

              <Button
                text={
                  updatePreferencesMutation.isPending
                    ? "Saving..."
                    : "Save Preferences"
                }
                onPress={handleSave}
                width="100%"
                isLoading={updatePreferencesMutation.isPending}
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  section: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#bfb4f9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  optionContent: {
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadio: {
    // borderColor will be set dynamically
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // backgroundColor will be set dynamically
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 12,
  },
});

export default NotificationPreferences;
