import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ChatCard from "@/components/ChatCard";

const ChatAI = () => {
  const [bottomContainer, setBottomContainer] = useState(5);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setBottomContainer(event.endCoordinates.height - 40);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setBottomContainer(5);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <CustomHeader />
      <View style={{display: "flex"}}>

      <ChatCard mode="ai" />
      <ChatCard mode="user" />

      </View>
      {/* <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", position: "relative" }}
        >
          <Image
            source={require("@/assets/robotics.png")}
            style={styles.emptyImage}
          />
        </View> */}
      <Feather name="send" size={24} color="red" />
      <FontAwesome name="send" size={24} color="black" />
      <View style={[styles.inputContainer, { bottom: bottomContainer }]}>
        <TextInput
          style={[styles.input]}
          placeholder="Type your message here..."
          multiline
          numberOfLines={6}
        />
        <Feather name="send" size={30} color="red" />
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default ChatAI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    position: "relative",
  },
  emptyImage: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    // marginTop: 50,
  },
  inputContainer: {
    position: "absolute",

    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    // width: "90%",
    flex: 1,
    alignSelf: "center",
    borderWidth: 1,
    backgroundColor: "#F4F4F4",
    borderColor: "#CBCBCB",
    borderRadius: 14,
    color: "#000000",
    // left: 0,
  },
});
