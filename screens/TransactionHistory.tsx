import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Typography from "@/components/Typography";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import TransactionItem from "@/components/TransactionItem";
import TransactionHistorySkeleton from "@/components/TransactionHistorySkeleton";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTransactions, getTransactionsByDate } from "@/requests/dashboard";
import DatePicker from "@/components/DatePicker";
import { showMessage } from "react-native-flash-message";

const TransactionHistory = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const filterByDateMutation = useMutation({
    mutationFn: ({
      startDate,
      endDate,
    }: {
      startDate: string;
      endDate: string;
    }) => getTransactionsByDate(startDate, endDate),
    onSuccess: (data) => {
      setFilteredData(data);
      setIsFiltered(true);
      setShowDateFilter(false);
      showMessage({
        message: "Transactions filtered successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Date filter error:", error);
      showMessage({
        message: "Failed to filter transactions. Please try again.",
        type: "danger",
      });
    },
  });

  const handleFilterByDate = () => {
    const startDateStr = startDate.toISOString().split("T")[0];
    const endDateStr = endDate.toISOString().split("T")[0];
    filterByDateMutation.mutate({
      startDate: startDateStr,
      endDate: endDateStr,
    });
  };

  const clearFilter = () => {
    setFilteredData([]);
    setIsFiltered(false);
    showMessage({
      message: "Filter cleared",
      type: "info",
    });
  };

  const displayData = isFiltered ? filteredData : data;

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
        <Typography size={12} color="#8C78F2" weight={500} marginTop={4}>
          Tap any transaction to change its category
        </Typography>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowDateFilter(true)}
        >
          <Typography color="#8C78F2" weight={500} size={14}>
            📅 Filter by Date
          </Typography>
        </TouchableOpacity>
        {isFiltered && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilter}>
            <Typography color="#d43d49" weight={500} size={14}>
              Clear Filter
            </Typography>
          </TouchableOpacity>
        )}
      </View>

      {displayData && displayData.length > 0 ? (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {displayData.map((transaction: any, index: number) => (
            <TransactionItem
              key={transaction._id || index}
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
            {isFiltered
              ? "No transactions found for selected date range"
              : "No transactions yet — your wallet's chilling 😎"}
          </Typography>
        </View>
      )}

      {/* Date Filter Modal */}
      <Modal
        visible={showDateFilter}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDateFilter(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Typography weight={600} size={18} marginBottom={20}>
              Filter by Date Range
            </Typography>

            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
            />

            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => setShowDateFilter(false)}
              >
                <Typography color="#666" weight={500}>
                  Cancel
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleFilterByDate}
                disabled={filterByDateMutation.isPending}
              >
                <Typography color="#fff" weight={500}>
                  {filterByDateMutation.isPending
                    ? "Filtering..."
                    : "Apply Filter"}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  filterButton: {
    backgroundColor: "#F0EDFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#8C78F2",
  },
  clearButton: {
    backgroundColor: "#FFE6E6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d43d49",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  cancelModalButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#8C78F2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
