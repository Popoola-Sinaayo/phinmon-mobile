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
import SafeAreaContainer from "@/components/SafeAreaContainer";
import { Ionicons } from "@expo/vector-icons";
import HashIcon from "@/assets/svg/HashIcon";
import PlusIcon from "@/assets/svg/PlusIcon";
import XIcon from "@/assets/svg/XIcon";
import Typography from "@/components/Typography";
import Button from "@/components/Button";

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
  const [userMappedKeyWords, setUserMappedKeyWords] =
    useState<UserMappedKeyWords>({
      food: ["dominos", "kfc", "eat", "snack", "restaurant", "cold stone"],
      transport: ["uber", "bolt", "ride", "taxi", "bus", "train"],
      shopping: ["order", "shop", "jumia", "cap", "drip", "shein"],
      bills: ["electricity", "data", "airtime", "dstv", "phcn"],
      entertainment: ["netflix", "spotify", "showmax", "movie", "cinema"],
      savings: ["piggyvest", "save", "stash", "vault", "deposit", "cowrywise"],
      health: ["pharmacy", "clinic", "gym", "fitness", "medicine"],
      education: ["school", "tuition", "jamb", "lesson", "exam"],
      subscriptions: ["subscription", "renewal", "apple", "google"],
      gifting: ["gift", "dash", "to mum", "to dad", "allowance"],
      home: ["rent", "house", "furniture", "appliance"],
      income: ["salary", "payment", "credit", "earnings"],
      bank_charges: ["charge", "sms", "fee", "vat", "stamp"],
      donations: ["tithe", "offering", "church", "mosque", "donation"],
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
    Alert.alert("Success", "Keyword preferences updated successfully!");
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

          <View style={styles.section}>
            <Typography
              weight={600}
              size={16}
              color="#8C78F2"
              marginBottom={12}
            >
              Category Keywords
            </Typography>
            <Typography weight={400} size={14} color="#666" marginBottom={16}>
              Add keywords for each category to improve transaction
              categorization
            </Typography>

            {categories.map(renderKeywordSection)}
          </View>

          <Button
            backgroundColor="#8C78F2"
            text="Update Preferences"
            onPress={handleSave}
            width="100%"
          />
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
