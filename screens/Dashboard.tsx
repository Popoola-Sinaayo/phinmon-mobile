import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/components/Typography";

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomHeader />
              <View style={styles.topContainer}>
                  <View style={styles.medalContainer}>
                      <Image source={require("@/assets/medal.png")} style={{width: 125, height: 170}} />
                  </View>
          <Typography
            text="⚡ Money Vibe Score"
            size={12}
            weight={800}
            color="#FFFFFF"
            align="left"
                  />
                  <Typography weight={800} color="#FFFFFF" size={80} align="left" marginTop={10}>
                      88
                  </Typography>
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
  },
  topContainer: {
    backgroundColor: "#8C78F285",
    borderRadius: 21,
    width: "90%",
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 25,
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
});
