import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Typography from "./Typography";

const QuickTips: React.FC<{ description: string }> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Character limit before showing "Read more"

  const shouldShowReadMore = description?.length > maxLength;
  const displayText =
    isExpanded || !shouldShowReadMore
      ? description
      : description?.substring(0, maxLength) + "...";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💡</Text>
        </View>
        <Typography weight={600} size={16} color="#2D3748">
          Quick Tips
        </Typography>
      </View>
      {/* <ScrollView> */}
        <Typography marginTop={8} size={14} color="#4A5568" align="left">
          {displayText}
        </Typography>
        {shouldShowReadMore && (
          <TouchableOpacity
            onPress={toggleExpanded}
            style={styles.readMoreButton}
          >
            <Typography size={14} color="#7A5FFF" weight={500}>
              {isExpanded ? "Read less" : "Read more"}
            </Typography>
          </TouchableOpacity>
        )}
      {/* </ScrollView> */}
    </View>
  );
};

export default QuickTips;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    marginTop: 16,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    // maxHeight: 200,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 16,
  },
  readMoreButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
});
