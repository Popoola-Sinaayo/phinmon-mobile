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
import { SafeAreaView } from "react-native-safe-area-context";
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

interface ConnectedAccount {
  id: string;
  bankName: string;
  connectionId: string;
  connectedDate: string;
}

const ConnectedAccountsContent = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<
    ConnectedAccount[]
  >([
    {
      id: "1",
      bankName: "Chase Bank",
      connectionId: "CHASE_123456789",
      connectedDate: "2024-01-15",
    },
    {
      id: "2",
      bankName: "Bank of America",
      connectionId: "BOA_987654321",
      connectedDate: "2024-02-20",
    },
  ]);

  const [institutionSelected, setInstitutionSelected] = useState("");
  const { init, reauthorise } = useMonoConnect();
  
  const exhangeMonoCodeForTokenMutation = useMutation({
    mutationFn: exhangeMonoCodeForToken,
    onSuccess: (data) => {
      console.log("Bank connected:", data);
      showMessage({
        message: "Bank Connected Successfully",
        type: "success",
      });
      
      // Add the new account to the list
      const newAccount: ConnectedAccount = {
        id: Date.now().toString(),
        bankName: institutionSelected || "Connected Bank",
        connectionId: `MONO_${Date.now()}`,
        connectedDate: new Date().toISOString().split('T')[0],
      };
      
      setConnectedAccounts(prev => [...prev, newAccount]);
    },
    onError: (error) => {
      console.error("Bank connection error:", error);
      showMessage({
        message: "Bank Connection Failed, Try again",
        type: "danger",
      });
    },
  });

  const handleDisconnect = (accountId: string, bankName: string) => {
    Alert.alert(
      "Disconnect Account",
      `Are you sure you want to disconnect ${bankName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Disconnect",
          style: "destructive",
          onPress: () => {
            setConnectedAccounts((prev) =>
              prev.filter((account) => account.id !== accountId)
            );
            Alert.alert(
              "Success",
              `${bankName} has been disconnected successfully!`
            );
          },
        },
      ]
    );
  };


  const handleSave = () => {
    Alert.alert("Success", "Connected accounts updated successfully!");
  };

  const renderAccountCard = (account: ConnectedAccount) => (
    <View key={account.id} style={styles.accountCard}>
      <View style={styles.accountHeader}>
        <View style={styles.bankIconContainer}>
          <CreditCardIcon />
        </View>
        <View style={styles.accountInfo}>
          <Typography weight={600} size={16} color="#212121">
            {account.bankName}
          </Typography>
          <Typography weight={400} size={12} color="#666" marginTop={2}>
            Connected: {account.connectedDate}
          </Typography>
        </View>
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={() => handleDisconnect(account.id, account.bankName)}
        >
          <XIcon color="#FF6B6B" size={20} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.connectionDetails}>
        <Typography weight={500} size={14} color="#8C78F2">
          Connection ID: {account.connectionId}
        </Typography>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={styles.container}>
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
            <Typography weight={400} size={14} color="#666" marginTop={8} align="center">
              Manage your connected bank accounts
            </Typography>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Typography weight={600} size={16} color="#8C78F2" marginBottom={4}>
                Connected Accounts ({connectedAccounts.length})
              </Typography>
              <Typography weight={400} size={14} color="#666" marginBottom={16}>
                View and manage your connected bank accounts
              </Typography>
            </View>
            
            {connectedAccounts.length > 0 ? (
              connectedAccounts.map(renderAccountCard)
            ) : (
              <View style={styles.emptyState}>
                <CreditCardIcon />
                <Typography weight={500} size={16} color="#666" marginTop={12}>
                  No connected accounts
                </Typography>
                <Typography weight={400} size={14} color="#999" marginTop={4} align="center">
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
    </SafeAreaView>
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
