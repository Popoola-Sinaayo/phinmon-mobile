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
import HashIcon from "@/assets/svg/HashIcon";
import PlusIcon from "@/assets/svg/PlusIcon";
import XIcon from "@/assets/svg/XIcon";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateKeywordPreferences } from "@/requests/authentication";
import { showMessage } from "react-native-flash-message";
import { useUserData } from "@/hooks/useUserData";

interface UserMappedKeyWords {
  food: string[];
  transport: string[];
  shopping: string[];
  bills: string[];
  entertainment: string[];
  savings: string[];
  health: string[];
  education: string[];
  subscriptions: string[];
  gifting: string[];
  home: string[];
  income: string[];
  bank_charges: string[];
  donations: string[];
}

const KeywordPreferences = () => {
  const { data: userData, isLoading } = useUserData();
  const queryClient = useQueryClient();
  const [userMappedKeyWords, setUserMappedKeyWords] =
    useState<UserMappedKeyWords>({
      food: [],
      transport: [],
      shopping: [],
      bills: [],
      entertainment: [],
      savings: [],
      health: [],
      education: [],
      subscriptions: [],
      gifting: [],
      home: [],
      income: [],
      bank_charges: [],
      donations: [],
    });

  // Update keywords when userData loads
  useEffect(() => {
    if (userData?.preferences?.userMappedKeyWords) {
      setUserMappedKeyWords({
        food: userData.preferences.userMappedKeyWords.food || [],
        transport: userData.preferences.userMappedKeyWords.transport || [],
        shopping: userData.preferences.userMappedKeyWords.shopping || [],
        bills: userData.preferences.userMappedKeyWords.bills || [],
        entertainment:
          userData.preferences.userMappedKeyWords.entertainment || [],
        savings: userData.preferences.userMappedKeyWords.savings || [],
        health: userData.preferences.userMappedKeyWords.health || [],
        education: userData.preferences.userMappedKeyWords.education || [],
        subscriptions:
          userData.preferences.userMappedKeyWords.subscriptions || [],
        gifting: userData.preferences.userMappedKeyWords.gifting || [],
        home: userData.preferences.userMappedKeyWords.home || [],
        income: userData.preferences.userMappedKeyWords.income || [],
        bank_charges:
          userData.preferences.userMappedKeyWords.bank_charges || [],
        donations: userData.preferences.userMappedKeyWords.donations || [],
      });
    }
  }, [userData]);

  const updateKeywordsMutation = useMutation({
    mutationFn: updateKeywordPreferences,
    onSuccess: (data) => {
      console.log("Keywords updated:", data);
      showMessage({
        message: "Keyword preferences updated successfully!",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      console.error("Keywords update error:", error);
      showMessage({
        message: "Failed to update keywords. Please try again.",
        type: "danger",
      });
    },
  });

  const categories = [
    { key: "food", label: "Food & Dining", icon: "🍽️" },
    { key: "transport", label: "Transportation", icon: "🚗" },
    { key: "shopping", label: "Shopping", icon: "🛍️" },
    { key: "bills", label: "Bills & Utilities", icon: "💡" },
    { key: "entertainment", label: "Entertainment", icon: "🎬" },
    { key: "savings", label: "Savings", icon: "💰" },
    { key: "health", label: "Health & Medical", icon: "🏥" },
    { key: "education", label: "Education", icon: "📚" },
    { key: "subscriptions", label: "Subscriptions", icon: "📱" },
    { key: "gifting", label: "Gifting", icon: "🎁" },
    { key: "home", label: "Home & Rent", icon: "🏠" },
    { key: "income", label: "Income", icon: "💼" },
    { key: "bank_charges", label: "Bank Charges", icon: "🏦" },
    { key: "donations", label: "Donations", icon: "❤️" },
  ];

  const handleSave = () => {
    updateKeywordsMutation.mutate({
      userMappedKeyWords: {
        food: userMappedKeyWords.food,
        transport: userMappedKeyWords.transport,
        shopping: userMappedKeyWords.shopping,
        bills: userMappedKeyWords.bills,
        entertainment: userMappedKeyWords.entertainment,
        savings: userMappedKeyWords.savings,
        health: userMappedKeyWords.health,
        education: userMappedKeyWords.education,
        subscriptions: userMappedKeyWords.subscriptions,
        gifting: userMappedKeyWords.gifting,
        home: userMappedKeyWords.home,
        income: userMappedKeyWords.income,
        bank_charges: userMappedKeyWords.bank_charges,
        donations: userMappedKeyWords.donations,
      },
    });
  };

  const addKeyword = (category: string, keyword: string) => {
    if (keyword.trim()) {
      setUserMappedKeyWords((prev) => ({
        ...prev,
        [category]: [...prev[category as keyof typeof prev], keyword.trim()],
      }));
    }
  };

  const removeKeyword = (category: string, index: number) => {
    setUserMappedKeyWords((prev) => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].filter(
        (_, i) => i !== index
      ),
    }));
  };

  const renderKeywordSection = (category: any) => {
    const keywords =
      userMappedKeyWords[category.key as keyof typeof userMappedKeyWords];
    const [newKeyword, setNewKeyword] = useState("");

    return (
      <View key={category.key} style={styles.keywordSection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <Typography weight={600} size={16} color="#212121">
            {category.label}
          </Typography>
        </View>

        <View style={styles.keywordInputContainer}>
          <TextInput
            style={styles.keywordInput}
            value={newKeyword}
            onChangeText={setNewKeyword}
            placeholder="Add keyword..."
            placeholderTextColor="#BDBDBD"
            onSubmitEditing={() => {
              addKeyword(category.key, newKeyword);
              setNewKeyword("");
            }}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              addKeyword(category.key, newKeyword);
              setNewKeyword("");
            }}
          >
            <PlusIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.keywordsList}>
          {keywords.map((keyword, index) => (
            <View key={index} style={styles.keywordTag}>
              <Typography size={14} color="#8C78F2">
                {keyword}
              </Typography>
              <TouchableOpacity
                onPress={() => removeKeyword(category.key, index)}
                style={styles.removeButton}
              >
                <XIcon />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    );
  };

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
            <HashIcon />
            <Typography weight={600} size={24} marginTop={12}>
              Keyword Preferences
            </Typography>
            <Typography
              weight={400}
              size={14}
              color="#666"
              marginTop={8}
              align="center"
            >
              Add keywords to help categorize your transactions automatically
            </Typography>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Typography weight={500} size={16} color="#666">
                Loading keywords...
              </Typography>
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Typography
                  weight={600}
                  size={16}
                  color="#8C78F2"
                  marginBottom={12}
                >
                  Category Keywords
                </Typography>
                <Typography
                  weight={400}
                  size={14}
                  color="#666"
                  marginBottom={16}
                >
                  Add keywords for each category to improve transaction
                  categorization
                </Typography>

                {categories.map(renderKeywordSection)}
              </View>

              <Button
                backgroundColor="#8C78F2"
                text={
                  updateKeywordsMutation.isPending
                    ? "Updating..."
                    : "Update Preferences"
                }
                onPress={handleSave}
                width="100%"
                isLoading={updateKeywordsMutation.isPending}
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
  keywordSection: {
    marginBottom: 24,
    paddingBottom: 26,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  keywordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  keywordInput: {
    flex: 1,
    backgroundColor: "#F8F7FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#8C78F2",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  keywordsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  keywordTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0EDFF",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#8C78F2",
  },
  removeButton: {
    marginLeft: 6,
    padding: 2,
  },
});

export default KeywordPreferences;
