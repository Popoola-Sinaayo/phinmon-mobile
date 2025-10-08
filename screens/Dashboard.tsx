import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Typography from "@/components/Typography";
import QuickTips from "@/components/QuickTips";
import { getLocalName } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import { getUserSpendingClass, syncTransactions } from "@/requests/dashboard";
import TransactionItem from "@/components/TransactionItem";
import DashboardSkeleton from "@/components/DashboardSkeleton";

const Dashboard = () => {
  const [name, setName] = useState("");
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000, // 1s per full spin
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => spinAnimation.stop();
  }, []);

  // interpolate 0 → 360 degrees
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useLayoutEffect(() => {
    const getUserName = async () => {
      const name = await getLocalName();
      if (name) {
        setName(name);
      }
    };
    getUserName();
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["userClass"],
    queryFn: getUserSpendingClass,
  });

  const { isLoading: isSyncLoading, refetch: refetchSyncTransaction } =
    useQuery({
      queryKey: ["syncTransactions"],
      queryFn: syncTransactions,
      enabled: false,
      // onSuccess: () => { }
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <CustomHeader /> */}
        <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
          <Typography weight={500} size={24}>
            Welcome {name}
          </Typography>
        </View>
        <View style={{ position: "relative", marginBottom: 30 }}>
          {!isLoading && <View style={styles.topContainerOverlay} />}
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            // <DashboardSkeleton />
            <View style={styles.topContainer}>
              <Typography
                text="Spending Aura ✨"
                size={12}
                weight={800}
                color="#FFFFFF"
                align="left"
              />
              <Typography
                weight={800}
                color="#FFFFFF"
                size={26}
                align="left"
                marginTop={10}
              >
                {data.type}
              </Typography>
              <View
                style={{
                  // flexDirection: "row",
                  // alignItems: "center",
                  // gap: 3,
                  width: "65%",
                }}
              >
                <Typography color="#FFFFFF" size={12}>
                  {data.desc}
                </Typography>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 20,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={() => refetchSyncTransaction()}>
                  <Animated.View
                    style={[
                      isSyncLoading && {
                        transform: [{ rotate }],
                      },
                    ]}
                  >
                    <Animated.Image
                      source={require("@/assets/sync.png")}
                      style={{ width: 36, height: 36 }}
                    />
                  </Animated.View>
                </TouchableOpacity>
                <Typography color="#ffffff">Tap to Sync ⚡</Typography>
              </View>
            </View>
          )}
        </View>
        <QuickTips />
        <View style={styles.historyContainer}>
          <View style={styles.historyItemHeader}>
            <Typography weight={600}>History</Typography>
            <TouchableOpacity>
              <Typography color="#8C78F2" weight={500}>
                See All
              </Typography>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, paddingBottom: 220 }}>
            <ScrollView
              style={{ width: "90%", alignSelf: "center", flexGrow: 1 }}
            >
              <TransactionItem category="food" />
              <TransactionItem category="savings" />
              <TransactionItem category="transport" />
              <TransactionItem category="donations" />
              <TransactionItem category="income" />
              <TransactionItem category="home" />
              <TransactionItem category="giftings" />
              <TransactionItem category="subscriptions" />
              <TransactionItem category="health" />
              <TransactionItem category="bills" />
              <TransactionItem category="entertainment" />
              <TransactionItem category="shopping" />
            </ScrollView>
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
    backgroundColor: "#f7f7f7",
  },
  topContainer: {
    backgroundColor: "#8C78F2",
    borderRadius: 21,
    width: "90%",
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 20,
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
    backgroundColor: "#ffffff",
    height: "100%",
    flexGrow: 1,
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
