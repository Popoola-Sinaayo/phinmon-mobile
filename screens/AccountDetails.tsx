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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccountDetails } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";
import { useUserData } from "@/hooks/useUserData";
import { setLocalName } from "@/utils/storage";

const fakeCountry = "United States"; // Just a placeholder, can be replaced by user country

const AccountDetails = () => {
  const { data: userData, isLoading } = useUserData();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempNumber, setTempNumber] = useState("");
  const [tempCountry, setTempCountry] = useState("");

  // Update fields when userData loads
  useEffect(() => {
    if (userData) {
      const fullName = userData.fullName || "";
      const phoneNumber = userData.phoneNumber || "";
      const userCountry = userData.country || "United States";

      setName(fullName);
      setNumber(phoneNumber);
      setCountry(userCountry);
      setTempName(fullName);
      setTempNumber(phoneNumber);
      setTempCountry(userCountry);
    }
  }, [userData]);

  const updateAccountDetailsMutation = useMutation({
    mutationFn: updateAccountDetails,
    onSuccess: (data) => {
      console.log("Account details updated:", data);
      showMessage({
        message: "Account details updated successfully!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setLocalName(tempName?.split(" ")[0] || "");
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Account details update error:", error);
      showMessage({
        message: "Failed to update account details. Please try again.",
        type: "danger",
      });
    },
  });

  const handleSave = () => {
    updateAccountDetailsMutation.mutate({
      fullName: tempName,
      phoneNumber: tempNumber,
      country: tempCountry,
    });
  };

  const handleCancel = () => {
    setTempName(name);
    setTempNumber(number);
    setTempCountry(country);
    setIsEditing(false);
  };

  return (
    <SafeAreaContainer backgroundColor="#F6F3FA">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <ProfileIcon />
            <Typography weight={600} size={24}>
              Account Details
            </Typography>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Typography weight={500} size={16} color="#666">
                Loading account details...
              </Typography>
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={styles.label}>Name</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Enter your name"
                    placeholderTextColor="#BDBDBD"
                  />
                ) : (
                  <Text style={styles.value}>{name}</Text>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Number</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={tempNumber}
                    onChangeText={setTempNumber}
                    placeholder="Phone number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#BDBDBD"
                  />
                ) : (
                  <Text style={styles.value}>{number}</Text>
                )}
              </View>

              <View style={styles.section}>
                <Text style={styles.label}>Country</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={tempCountry}
                    onChangeText={setTempCountry}
                    placeholder="Enter your country"
                    placeholderTextColor="#BDBDBD"
                  />
                ) : (
                  <Text style={styles.value}>{country}</Text>
                )}
              </View>

              {isEditing && (
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    disabled={updateAccountDetailsMutation.isPending}
                  >
                    <Text style={styles.saveButtonText}>
                      {updateAccountDetailsMutation.isPending
                        ? "Saving..."
                        : "Save"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancel}
                    disabled={updateAccountDetailsMutation.isPending}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
              {!isEditing && (
                <Button
                  backgroundColor="#8C78F2"
                  text="Update Profile"
                  onPress={() => setIsEditing(true)}
                />
              )}
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: "center",
    minHeight: "100%",
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    // paddingVertical: 20,
    // backgroundColor: "red",
  },
  header: {
    alignItems: "center",
    marginBottom: 35,
    marginTop: 22,
    width: "100%",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  avatarShadow: {
    marginBottom: 8,
    shadowColor: "#8C78F2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: "#e5e4ee",
    borderRadius: 60,
    padding: 4,
  },
  //   title: {
  //     fontSize: 24,
  //     color: "#3A265E",
  //     fontWeight: "700",
  //     letterSpacing: 0.5,
  //     marginBottom: 8,
  //   },
  section: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#bfb4f9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#8C78F2",
    marginBottom: 6,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    color: "#212121",
    fontWeight: "500",
    paddingBottom: 2,
  },
  input: {
    fontSize: 18,
    color: "#3A265E",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE9F9",
    backgroundColor: "#F5F0FF",
    borderRadius: 8,
    marginBottom: 2,
    marginTop: -4,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6DEFF",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 7,
    alignSelf: "center",
  },
  editButtonText: {
    color: "#8C78F2",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "center",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#8C78F2",
    paddingHorizontal: 38,
    paddingVertical: 13,
    borderRadius: 8,
    marginRight: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
  cancelButton: {
    backgroundColor: "#F3F2FD",
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
  },
  cancelButtonText: {
    color: "#8C78F2",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default AccountDetails;
