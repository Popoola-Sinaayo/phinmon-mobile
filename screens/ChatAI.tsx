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
import Typography from "@/components/Typography";
import SendIcon from "@/assets/svg/SendIcon";

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

      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Chat With Phinny{" "}
        </Typography>
      </View>
      <View style={{ display: "flex" }}>
        {/* <ChatCard mode="ai" />
      <ChatCard mode="user" /> */}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography color="#000000">No messages yet — your wallet’s chilling 😎</Typography>
      </View>
      <View style={[styles.inputContainer, { bottom: bottomContainer }]}>
        <TextInput
          style={[styles.input]}
          placeholder="Ready for some no-cap money advice?"
          multiline
          numberOfLines={6}
          placeholderTextColor={"#A3A3A3"}
        />
        <SendIcon color={"#8C78F2"} />
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
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    // paddingVertical: 20,
    // backgroundColor: "red",
  },
});
