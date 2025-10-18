import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import SafeAreaContainer from "@/components/SafeAreaContainer";
import Typography from "@/components/Typography";
import { Pie, PolarChart } from "victory-native";
import DatePicker from "@/components/DatePicker";
import Button from "@/components/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTransactions, getTransactionsByDate } from "@/requests/dashboard";
import { showMessage } from "react-native-flash-message";
import { formatCurrency } from "@/utils/currencyFormatter";

type VisualizerType = "pie" | "bar" | "line" | "area" | "polar";

const Analysis = () => {
  const [transactionType, setTransactionType] = useState<"credit" | "debit">(
    "debit"
  );
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentVisualizer, setCurrentVisualizer] =
    useState<VisualizerType>("pie");

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

  const visualizerOptions: {
    key: VisualizerType;
    label: string;
    icon: string;
  }[] = [
    { key: "pie", label: "Pie Chart", icon: "🥧" },
    // { key: "bar", label: "Bar Chart", icon: "📊" },
    // { key: "line", label: "Line Chart", icon: "📈" },
    // { key: "area", label: "Area Chart", icon: "📉" },
    { key: "polar", label: "Polar Chart", icon: "🎯" },
  ];

  const switchVisualizer = (type: VisualizerType) => {
    setCurrentVisualizer(type);
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

  const DATA = useMemo(() => {
    if (!displayData || displayData.length === 0) {
      return [];
    }

    // Group transactions by category and sum their amounts
    const categoryAmounts: {
      [key: string]: { total: number; currencyCode: string };
    } = {};

    displayData
      ?.filter((t: any) => t.type === transactionType)
      .forEach((transaction: any) => {
        const category = transaction.category || "miscellaneous";
        const amount = parseFloat(transaction.amount || "0");
        const currencyCode = transaction.currency || "USD";

        if (!categoryAmounts[category]) {
          categoryAmounts[category] = { total: 0, currencyCode };
        }
        categoryAmounts[category].total += amount;
      });

    // Convert to array format for the chart
    return Object.entries(categoryAmounts).map(([category, data], index) => ({
      x: category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
      y: data.total,
      value: data.total,
      currencyCode: data.currencyCode,
      color: categoryColors[category] || generateRandomColor(),
      label:
        category.charAt(0).toUpperCase() + category.slice(1).replace("_", " "),
      index: index,
    }));
  }, [transactionType, displayData]);

  // Enhanced Pie Chart Component
  const renderPieChart = () => {
    const data = DATA;
    if (data.length === 0) return null;

    return (
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          height: 300,
          width: "100%",
        }}
      >
        <PolarChart
          data={data}
          labelKey="label"
          valueKey="value"
          colorKey="color"
        >
          <Pie.Chart />
        </PolarChart>
      </View>
    );
  };

  // Polar Chart Component (Enhanced)
  const renderPolarChart = () => {
    const data = DATA;
    if (data.length === 0) return null;

    return (
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          height: 300,
          width: "100%",
        }}
      >
        <PolarChart
          data={data}
          labelKey="label"
          valueKey="value"
          colorKey="color"
        >
          <Pie.Chart innerRadius={"90%"} />
        </PolarChart>
      </View>
    );
  };

  // Main Chart Renderer
  const renderChart = () => {
    switch (currentVisualizer) {
      case "pie":
        return renderPieChart();

      case "polar":
        return renderPolarChart();
      default:
        return renderPieChart();
    }
  };

  return (
    <SafeAreaContainer>
      <ScrollView>
        <View style={styles.topContainer}>
          <Typography weight={600} size={24}>
            Analysis
          </Typography>
          <Typography size={12} color="#8C78F2" weight={500} marginTop={4}>
            Filter by date range to analyze specific periods
          </Typography>
        </View>

        {/* Filter Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.visualizerScrollView, { marginTop: 8, marginLeft: 4 }]}
        >
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
          <TouchableOpacity
            style={[
              styles.visualizerButton,
              transactionType === "debit" && styles.visualizerButtonActive,
            ]}
            onPress={() => setTransactionType("debit")}
          >
            <Typography
              size={12}
              weight={500}
              color={transactionType === "debit" ? "#fff" : "#8C78F2"}
            >
              Expenses
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.visualizerButton,
              transactionType === "credit" && styles.visualizerButtonActive,
            ]}
            onPress={() => setTransactionType("credit")}
          >
            <Typography
              size={12}
              weight={500}
              color={transactionType === "credit" ? "#fff" : "#8C78F2"}
            >
              Income
            </Typography>
          </TouchableOpacity>
        </ScrollView>

        {/* Visualizer Switcher */}
        <View style={styles.visualizerContainer}>
          <Typography weight={500} size={16} marginBottom={10}>
            Choose Visualization:
          </Typography>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.visualizerScrollView}
          >
            {visualizerOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.visualizerButton,
                  currentVisualizer === option.key &&
                    styles.visualizerButtonActive,
                ]}
                onPress={() => switchVisualizer(option.key)}
              >
                <Typography
                  size={12}
                  weight={500}
                  color={currentVisualizer === option.key ? "#fff" : "#8C78F2"}
                >
                  {option.icon} {option.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {displayData && displayData.length > 0 && DATA.length > 0 ? (
          <>
            <View style={styles.chartContainer}>{renderChart()}</View>
            <View style={styles.legendContainer}>
              <Typography
                weight={600}
                size={18}
                marginBottom={20}
                align="center"
                color="#2D3748"
              >
                Category Breakdown
              </Typography>
              <View style={styles.legendList}>
                {DATA.sort((a, b) => b.value - a.value).map((item, index) => {
                  const percentage =
                    (item.value / DATA.reduce((sum, d) => sum + d.value, 0)) *
                    100;
                  return (
                    <View key={item.label} style={styles.legendItem}>
                      <View style={styles.legendItemLeft}>
                        <View
                          style={[
                            styles.legendColorIndicator,
                            { backgroundColor: item.color },
                          ]}
                        />
                        <View style={styles.legendItemInfo}>
                          <Typography weight={600} size={15} color="#2D3748">
                            {item.label}
                          </Typography>
                          <Typography weight={500} size={12} color="#718096">
                            {percentage.toFixed(1)}% of total
                          </Typography>
                        </View>
                      </View>
                      <View style={styles.legendItemRight}>
                        <Typography
                          weight={700}
                          size={16}
                          color="#1A202C"
                          align="right"
                        >
                          {formatCurrency(item.value, {
                            currencyCode: item.currencyCode,
                          })}
                        </Typography>
                        <View
                          style={[styles.legendProgressBar, { width: "100%" }]}
                        >
                          <View
                            style={[
                              styles.legendProgressFill,
                              {
                                width: `${Math.min(percentage, 100)}%`,
                                backgroundColor: item.color,
                              },
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
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
      </ScrollView>
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
    marginHorizontal: 8,
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
    width: "90%",
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  legendList: {
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  legendItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  legendItemInfo: {
    flex: 1,
  },
  legendItemRight: {
    alignItems: "flex-end",
    minWidth: 100,
  },
  legendColorIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  legendProgressBar: {
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    marginTop: 6,
    overflow: "hidden",
  },
  legendProgressFill: {
    height: "100%",
    borderRadius: 2,
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
  visualizerContainer: {
    width: "90%",
    alignSelf: "center",
    // marginTop: 20,
    marginBottom: 10,
  },
  visualizerScrollView: {
    flexDirection: "row",
  },
  visualizerButton: {
    backgroundColor: "#F0EDFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#8C78F2",
    marginRight: 8,
    minWidth: 100,
    alignItems: "center",
  },
  visualizerButtonActive: {
    backgroundColor: "#8C78F2",
    borderColor: "#8C78F2",
  },
  chartContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 320,
    width: "100%",
  },
  simpleChartContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  barItem: {
    marginBottom: 12,
  },
  barLabel: {
    marginBottom: 4,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    height: 20,
    borderRadius: 10,
    minWidth: 4,
  },
  lineChartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  lineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "48%",
  },
  lineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  areaChartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 120,
    paddingHorizontal: 10,
  },
  areaItem: {
    alignItems: "center",
    flex: 1,
  },
  areaBar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
});
