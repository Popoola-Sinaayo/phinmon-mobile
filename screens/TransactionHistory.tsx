import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "@/components/Typography";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionItem from "@/components/TransactionItem";
import CreditCardIcon from "@/assets/svg/CreditCard";

const TransactionHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Transaction History
        </Typography>
      </View>
      {false ? (
        <View>
          <ScrollView
            style={{
              width: "90%",
              alignSelf: "center",
              marginTop: 20,
              flexGrow: 1,
              // height: "100%",
            }}
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
      ) : (
        <View style={styles.noTransactionsContainer}>
          <Typography weight={400} size={14} align="center">
            No transactions yet — your wallet’s chilling 😎
          </Typography>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    // paddingVertical: 20,
    // backgroundColor: "red",
  },
  noTransactionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
