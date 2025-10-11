import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomHeader from "@/components/CustomHeader";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ChatCard from "@/components/ChatCard";
import Typography from "@/components/Typography";
import SendIcon from "@/assets/svg/SendIcon";
import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "@/requests/authentication";
import { getChatMessages, saveChatMessage } from "@/utils/storage";
import { showMessage } from "react-native-flash-message";

const ChatAI = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const sendMessageMutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: async (data) => {
      // Save AI response
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: data.answer || "I received your message!",
        timestamp: new Date().toISOString(),
      };

      // Save AI message to local storage
      await saveChatMessage(aiMessage);

      // Update local state with AI response
      setChatMessages((prev) => [...prev, aiMessage]);

      showMessage({
        message: "Message sent successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Chat error:", error);
      showMessage({
        message: "Failed to send message. Please try again.",
        type: "danger",
      });
    },
  });

  // Load existing chat messages on component mount
  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getChatMessages();
      setChatMessages(messages);
    };
    loadMessages();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        type: "user",
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      // Save user message to local storage first
      await saveChatMessage(userMessage);

      // Update local state with user message
      setChatMessages((prev) => [...prev, userMessage]);

      // Clear input immediately
      setMessage("");

      // Send request to AI
      sendMessageMutation.mutate(message.trim());
    }
  };
  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.topContainer}>
          <Typography weight={600} size={24}>
            Chat With Phinny{" "}
          </Typography>
        </View>

        <View style={styles.messagesContainer}>
          {chatMessages.length > 0 ? (
            <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ChatCard
                  key={item.id}
                  mode={item.type}
                  message={item.message}
                  // timestamp={item.timestamp}
                />
              )}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Typography color="#000000">
                No messages yet — your wallet's chilling 😎
              </Typography>
            </View>
          )}

          {/* Loading indicator */}
          {sendMessageMutation.isPending && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#8C78F2" />
              <Typography size={12} color="#8C78F2" marginTop={5}>
                Phinny is typing...
              </Typography>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input]}
            placeholder="Ready for some no-cap money advice?"
            multiline
            numberOfLines={3}
            placeholderTextColor={"#A3A3A3"}
            value={message}
            onChangeText={setMessage}
            editable={!sendMessageMutation.isPending}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!message.trim() || sendMessageMutation.isPending}
            style={[
              styles.sendButton,
              (!message.trim() || sendMessageMutation.isPending) &&
                styles.sendButtonDisabled,
            ]}
          >
            <SendIcon
              color={
                !message.trim() || sendMessageMutation.isPending
                  ? "#A3A3A3"
                  : "#8C78F2"
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default ChatAI;

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  inputContainer: {
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#F4F4F4",
    borderColor: "#CBCBCB",
    borderRadius: 14,
    color: "#000000",
    paddingHorizontal: 15,
    paddingVertical: 12,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
});
