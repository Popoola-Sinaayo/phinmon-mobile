import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { Ionicons } from "@expo/vector-icons";
import CreditCardIcon from "@/assets/svg/CreditCard";
import XIcon from "@/assets/svg/XIcon";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import {
  MonoProvider,
  useMonoConnect,
  MonoConnectButton,
} from "@mono.co/connect-react-native";
import { useMutation } from "@tanstack/react-query";
import { exhangeMonoCodeForToken } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";
import { useUserData } from "@/hooks/useUserData";

interface ConnectedAccount {
  id: string;
  institution: string;
}

const ConnectedAccountsContent = () => {
  const { data: userData, isLoading, error } = useUserData();
  const [institutionSelected, setInstitutionSelected] = useState("");
  const { init, reauthorise } = useMonoConnect();
  console.log(userData, "userData")
  console.log(isLoading, "isLoading")
  console.log(error, "error")
  // Get monoAccount data from userData
  const monoAccounts: ConnectedAccount[] = userData?.monoAccount || [];

  const exhangeMonoCodeForTokenMutation = useMutation({
    mutationFn: exhangeMonoCodeForToken,
    onSuccess: (data) => {
      console.log("Bank connected:", data);
      showMessage({
        message: "Bank Connected Successfully",
        type: "success",
      });
      // The monoAccount data will be updated via the useUserData hook
      // No need to manually update local state
    },
    onError: (error) => {
      console.error("Bank connection error:", error);
      showMessage({
        message: "Bank Connection Failed, Try again",
        type: "danger",
      });
    },
  });

  const handleDisconnect = (accountId: string, institutionName: string) => {
    Alert.alert(
      "Disconnect Account",
      `Are you sure you want to disconnect ${institutionName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Disconnect",
          style: "destructive",
          onPress: () => {
            // TODO: Implement API call to disconnect account
            // For now, just show success message
            Alert.alert(
              "Success",
              `${institutionName} has been disconnected successfully!`
            );
          },
        },
      ]
    );
  };

  const handleSave = () => {
    Alert.alert("Success", "Connected accounts updated successfully!");
  };

  const renderAccountCard = (account: ConnectedAccount, index: number) => (
    <View key={`${account.id}-${index}`} style={styles.accountCard}>
      <View style={styles.accountHeader}>
        <View style={styles.bankIconContainer}>
          <CreditCardIcon />
        </View>
        <View style={styles.accountInfo}>
          <Typography weight={600} size={16} color="#212121">
            {account.institution || "N/A"}
          </Typography>
          <Typography weight={400} size={12} color="#666" marginTop={2}>
            Account Type: {account.id}
          </Typography>
        </View>
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={() => handleDisconnect(account.id, account.institution)}
        >
          <XIcon color="#FF6B6B" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.connectionDetails}>
        <Typography weight={500} size={14} color="#8C78F2">
          ID: {account.id}
        </Typography>
      </View>
    </View>
  );

  return (
    <SafeAreaContainer backgroundColor="#F6F3FA">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <CreditCardIcon />
            <Typography weight={600} size={24} marginTop={12}>
              Connected Accounts
            </Typography>
            <Typography
              weight={400}
              size={14}
              color="#666"
              marginTop={8}
              align="center"
            >
              Manage your connected bank accounts
            </Typography>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Typography
                weight={600}
                size={16}
                color="#8C78F2"
                marginBottom={4}
              >
                Connected Accounts ({monoAccounts.length})
              </Typography>
              <Typography weight={400} size={14} color="#666" marginBottom={16}>
                View and manage your connected bank accounts
              </Typography>
            </View>

            {isLoading ? (
              <View style={styles.emptyState}>
                <Typography weight={500} size={16} color="#666">
                  Loading connected accounts...
                </Typography>
              </View>
            ) : error ? (
              <View style={styles.emptyState}>
                <Typography weight={500} size={16} color="#d43d49">
                  Failed to load accounts
                </Typography>
                <Typography
                  weight={400}
                  size={14}
                  color="#999"
                  marginTop={4}
                  align="center"
                >
                  Please try again later
                </Typography>
              </View>
            ) : monoAccounts.length > 0 ? (
              monoAccounts.map(renderAccountCard)
            ) : (
              <View style={styles.emptyState}>
                <CreditCardIcon />
                <Typography weight={500} size={16} color="#666" marginTop={12}>
                  No connected accounts
                </Typography>
                <Typography
                  weight={400}
                  size={14}
                  color="#999"
                  marginTop={4}
                  align="center"
                >
                  Connect your first bank account to get started
                </Typography>
              </View>
            )}

            <View style={styles.monoButtonContainer}>
              <MonoConnectButton />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const ConnectedAccounts = () => {
  const config = {
    publicKey: "test_pk_o0xzst25ptu1geuqq8qm",
    scope: "auth",
    onClose: () => console.log("Widget closed"),
    onSuccess: (data: any) => {
      const code = data.getAuthCode();
      console.log("Access code", code);
    },
    onEvent: (eventName: string, data: any) => {
      console.log(eventName);
      console.log(data);
      if (eventName === "INSTITUTION_SELECTED") {
        // Handle institution selection if needed
      }
      if (eventName === "SUCCESS") {
        console.log(data.code);
        // Handle success if needed
      }
    },
  };

  return (
    <MonoProvider {...config}>
      <ConnectedAccountsContent />
    </MonoProvider>
  );
};

const styles = StyleSheet.create({
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
  sectionHeader: {
    marginBottom: 16,
  },
  accountCard: {
    backgroundColor: "#F8F7FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bankIconContainer: {
    marginRight: 12,
  },
  accountInfo: {
    flex: 1,
  },
  disconnectButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FFE6E6",
  },
  connectionDetails: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  monoButtonContainer: {
    marginTop: 16,
    width: "100%",
  },
});

export default ConnectedAccounts;
