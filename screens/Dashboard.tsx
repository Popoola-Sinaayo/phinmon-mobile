import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/components/Typography";
import QuickTips from "@/components/QuickTips";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomHeader />
        <View style={{ position: "relative", marginBottom: 30 }}>
          <View style={styles.topContainerOverlay} />
          <View style={styles.topContainer}>
            <View style={styles.medalContainer}>
              <Image
                source={require("@/assets/medal.png")}
                style={{ width: 125, height: 170 }}
              />
            </View>
            <Typography
              text="⚡ Money Vibe Score"
              size={12}
              weight={800}
              color="#FFFFFF"
              align="left"
            />
            <Typography
              weight={800}
              color="#FFFFFF"
              size={60}
              align="left"
              marginTop={10}
            >
              88
            </Typography>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Typography color="#FFFFFF">Zen Spender 🌿</Typography>
              <TouchableOpacity>
                <Image
                  source={require("@/assets/question-mark-green.png")}
                  style={{ width: 10, height: 10 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                bottom: 8,
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Image
                  source={require("@/assets/sync.png")}
                  style={{ width: 36, height: 36 }}
                />
              </TouchableOpacity>
              <Typography color="#ffffff">Tap to Sync ⚡</Typography>
            </View>
          </View>
        </View>
        <QuickTips />
        <View style={styles.historyContainer}>
          <View style={styles.historyItemHeader}>
            <Typography weight={600}>History</Typography>
            <TouchableOpacity>
              <Typography color="#8C78F2" weight={500}>See All</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // paddingBottom: 100,
    // backgroundColor: "red"
  },
  topContainer: {
    backgroundColor: "#8C78F2",
    borderRadius: 21,
    width: "90%",
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 20,
    position: "relative",
  },
  medalContainer: {
    position: "absolute",
    right: "20%",
    top: 0,
  },
  topContainerOverlay: {
    position: "absolute",
    backgroundColor: "#8C78F285",
    width: "80%",
    height: "50%",
    alignSelf: "center",
    bottom: -15,
    borderRadius: 21,
  },
  historyContainer: {
    backgroundColor: "#ECE8FF",
    height: "100%",
    paddingBottom: 100,
    marginTop: 30,
    borderTopLeftRadius: 21,
  },
  historyItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
});
