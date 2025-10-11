import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import CustomHeader from "@/components/CustomHeader";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Typography from "@/components/Typography";
import { Pie, PolarChart } from "victory-native";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTransactions, getTransactionsByDate } from "@/requests/dashboard";
import { showMessage } from "react-native-flash-message";

const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const Analysis = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const {
    data: allTransactions,
    isLoading,
    error,
  } = useQuery({
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
        message: "Analysis filtered successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Date filter error:", error);
      showMessage({
        message: "Failed to filter analysis. Please try again.",
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

  const displayData = isFiltered ? filteredData : allTransactions;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  function generateRandomColor(): string {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff);
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, "0")}`;
  }

  // Category colors mapping for consistent colors
  const categoryColors: { [key: string]: string } = {
    food: "#FF6B6B",
    transport: "#4ECDC4",
    shopping: "#45B7D1",
    bills: "#96CEB4",
    entertainment: "#FFEAA7",
    savings: "#DDA0DD",
    health: "#98D8C8",
    education: "#F7DC6F",
    subscriptions: "#BB8FCE",
    gifting: "#85C1E9",
    home: "#F8C471",
    income: "#82E0AA",
    bank_charges: "#F1948A",
    donations: "#85C1E9",
    miscellaneous: "#D5DBDB",
  };

  const DATA = () => {
    if (!displayData || displayData.length === 0) {
      return [];
    }

    // Group transactions by category and count them
    const categoryCounts: { [key: string]: number } = {};

    displayData.forEach((transaction: any) => {
      const category = transaction.category || "miscellaneous";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    // Convert to array format for the chart
    return Object.entries(categoryCounts).map(([category, count]) => ({
      value: count,
      color: categoryColors[category] || generateRandomColor(),
      label:
        category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
    }));
  };

  return (
    <SafeAreaContainer>
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Analysis
        </Typography>
        <Typography size={12} color="#8C78F2" weight={500} marginTop={4}>
          Filter by date range to analyze specific periods
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

      {/* <View style={styles.buttonContainer}>
        <Button
          text="Get Analysis"
          backgroundColor="#7A5FFF"
          paddingTop={5}
          paddingBottom={5}
          width={"100%"}
        />
      </View> */}
      {displayData && displayData.length > 0 && DATA().length > 0 ? (
        <>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              height: 300,
              width: "100%",
            }}
          >
            <PolarChart
              data={DATA()}
              labelKey={"label"}
              valueKey={"value"}
              colorKey={"color"}
            >
              <Pie.Chart />
            </PolarChart>
          </View>
          <View style={styles.legendContainer}>
            {DATA().map((item, index) => {
              return (
                <View
                  key={item.label}
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <View
                    style={{
                      backgroundColor: item.color,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}
                  />
                  <Typography key={index} weight={500}>
                    {item.label} ({item.value})
                  </Typography>
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <View style={styles.noAnalysisContainer}>
          <Typography weight={400} size={14} align="center">
            {isFiltered
              ? "No transactions found for selected date range"
              : "No analysis yet — your wallet's chilling 😎"}
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

export default Analysis;

const styles = StyleSheet.create({
  dateRangeSelectorContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
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
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  noAnalysisContainer: {
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
