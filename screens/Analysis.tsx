import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
  function randomNumber() {
    return Math.floor(Math.random() * 26) + 125;
  }
  function generateRandomColor(): string {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff);
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, "0")}`;
  }
  const DATA = (numberPoints = 10) =>
    Array.from({ length: numberPoints }, (_, index) => ({
      value: randomNumber(),
      color: generateRandomColor(),
      label: `Label ${index + 1}`,
    }));


  return (
    <SafeAreaContainer>
      <View style={styles.topContainer}>
        <Typography weight={600} size={24}>
          Analysis
        </Typography>
      </View>
      <View style={styles.dateRangeSelectorContainer}>
        {/* <DatePicker />
        <DatePicker /> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="Get Analysis"
          backgroundColor="#7A5FFF"
          paddingTop={5}
          paddingBottom={5}
          width={"100%"}
        />
      </View>
      {false ? (
        <>
          <View
            style={{
              // alignItems: "center",
              // paddingVertical: 20,
              marginTop: 20,
              justifyContent: "center",
              height: 300,
              width: "100%",
            }}
          >
            <PolarChart
              data={DATA()} // 👈 specify your data
              labelKey={"label"} // 👈 specify data key for labels
              valueKey={"value"} // 👈 specify data key for values
              colorKey={"color"} // 👈 specify data key for color
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
                    {item.label}
                  </Typography>
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <View style={styles.noAnalysisContainer}>
          <Typography weight={400} size={14} align="center">
            No analysis yet — your wallet's chilling 😎
          </Typography>
        </View>
      )}
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
    // paddingVertical: 20,
    // backgroundColor: "red",
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
});