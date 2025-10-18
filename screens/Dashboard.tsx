import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import Typography from "@/components/Typography";
import QuickTips from "@/components/QuickTips";
import { getLocalName } from "@/utils/storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserSpendingClass, syncTransactions, updatePushToken } from "@/requests/dashboard";
import TransactionItem from "@/components/TransactionItem";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { useNavigation } from "@react-navigation/native";
import registerForPushNotificationsAsync from "@/utils/generatePushNotificationToken";
import { showMessage } from "react-native-flash-message";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    const getUserName = async () => {
      const name = await getLocalName();
      if (name) {
        setName(name);
      }
    };
    getUserName();
  }, []);

  const {
    data,
    isLoading,
    error,
    refetch: refetchUserClass,
  } = useQuery({
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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchUserClass(), refetchSyncTransaction()]);
    } finally {
      setRefreshing(false);
    }
  };

  const updatePushTokenMutation = useMutation({
    mutationFn: updatePushToken,
    onSuccess: (data) => {
      // console.log("Push token updated:", data);
    },
    onError: (error) => {
      console.error("Bank connection error:", error);
      showMessage({
        message: "Error updating push token",
        type: "danger",
      });
    },
  });

  useEffect(() => {
    console.log("Registering token");
    const registerToken = async () => {
      const token = await registerForPushNotificationsAsync();
      // console.log("Token registered:", token);
      updatePushTokenMutation.mutate(token as string);
    };
    registerToken();
  }, [])

  return (
    <SafeAreaContainer>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#8C78F2"]}
            tintColor="#8C78F2"
          />
        }
      >
        <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
          <Typography weight={500} size={24}>
            Welcome {name}
          </Typography>
          <Typography weight={400} size={12} color="#8C78F2" marginTop={4}>
            Pull down to refresh your data
          </Typography>
        </View>
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <View style={{ position: "relative", marginBottom: 30 }}>
              {!isLoading && <View style={styles.topContainerOverlay} />}

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
                  {data?.class?.type}
                </Typography>
                <View
                  style={{
                    // flexDirection: "row",
                    // alignItems: "center",
                    // gap: 3,
                    // width: "65%",
                  }}
                >
                  <Typography color="#FFFFFF" size={12}>
                    {data?.class?.desc}
                  </Typography>
                </View>
              </View>
            </View>
            <QuickTips description={data?.advice} />
            <View style={styles.historyContainer}>
              <View style={styles.historyItemHeader}>
                <Typography weight={600}>History</Typography>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TransactionHistory" as any)
                  }
                >
                  <Typography color="#8C78F2" weight={500}>
                    See All
                  </Typography>
                </TouchableOpacity>
              </View>
              {data?.transactions?.length > 0 ? (
                <View style={{ flex: 1, width: "90%", alignSelf: "center"
                 }}>
                  {data?.transactions?.map((t: any, index: number) => {
                    return (
                      <TransactionItem
                        key={index}
                        category={t.category}
                        description={t.description}
                        amount={t.amount}
                        currencyCode={t.currency}
                        date={t.date}
                        type={t.type}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={styles.noTransactionsContainer}>
                  <Typography weight={400} size={14} align="center">
                    No transactions yet — your wallet's chilling 😎
                  </Typography>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
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
    // paddingBottom: 100,
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
  noTransactionsContainer: {
    // flex: 1,
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
