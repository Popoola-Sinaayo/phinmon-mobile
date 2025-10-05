import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Typography from '@/components/Typography';

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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Analysis
        </Typography>
      </View>
      <View style={{ alignItems: "center", paddingVertical: 20 }}>
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={250}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"0"} // shift the pie toward the right
          center={[0, 0]} // keep pie centered vertically
          absolute
          hasLegend={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    position: "relative",
  },
  topContainer: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    // paddingVertical: 20,
    // backgroundColor: "red",
  },
});