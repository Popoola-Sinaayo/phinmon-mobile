import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Typography from "@/components/Typography";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import TransactionItem from "@/components/TransactionItem";
import TransactionHistorySkeleton from "@/components/TransactionHistorySkeleton";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/requests/dashboard";

const TransactionHistory = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  if (isLoading) {
    return <TransactionHistorySkeleton />;
  }

  if (error) {
    return (
      <SafeAreaContainer backgroundColor="#f7f7f7">
        <View style={styles.topContainer}>
          <Typography weight={600} size={24}>
            Transaction History
          </Typography>
          <Typography
            size={12}
            color="#8C78F2"
            weight={500}
            marginTop={4}
            // style={styles.infoText}
          >
            Tap any transaction to change its category
          </Typography>
        </View>
        <View style={styles.errorContainer}>
          <Typography weight={400} size={14} align="center" color="#d43d49">
            Failed to load transactions. Please try again.
          </Typography>
        </View>
      </SafeAreaContainer>
    );
  }

  return (
    <SafeAreaContainer backgroundColor="#f7f7f7">
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Transaction History
        </Typography>
        <Typography
          size={12}
          color="#8C78F2"
          weight={500}
          // style={styles.infoText}
        >
          Tap any transaction to change its category
        </Typography>
      </View>
      {data && data.length > 0 ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1, flexGrow: 1, height: "100%" }}
        >
          {data.map((transaction: any, index: number) => (
            <TransactionItem
              key={transaction._id}
              category={transaction.category}
              description={transaction.description}
              amount={transaction.amount}
              currencyCode={transaction.currency}
              date={transaction.date}
              transactionId={transaction.transactionId}
              type={transaction.type}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noTransactionsContainer}>
          <Typography weight={400} size={14} align="center">
            No transactions yet — your wallet's chilling 😎
          </Typography>
        </View>
      )}
    </SafeAreaContainer>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  infoText: {
    marginTop: 4,
  },
  scrollView: {
    width: "90%",
    alignSelf: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTransactionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
