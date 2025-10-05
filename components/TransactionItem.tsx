import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FoodTransaction from '@/assets/svg/FoodTransaction'
import Typography from './Typography';
import getCategoryElement from '@/utils/getCategoryElement';
import capitalizeFirstWord from '@/utils/capitalizeFirstWord';

const TransactionItem: React.FC<{ category: string }> = ({ category }) => {
    const details = getCategoryElement(category);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: details.backgroundColor },
          ]}
        >
          {details.elem}
        </View>
        <View>
          <Typography color="#414141" size={16} weight={500}>
            {capitalizeFirstWord(category)}
          </Typography>
          <Typography size={12} color="#9b9ea2">
            Money sent out for food
          </Typography>
        </View>
      </View>
      <View>
        <Typography
          color={
            category === "savings" || category === "income"
              ? "#58a97d"
              : "#d43d49"
          }
          size={16}
          weight={500}
        >
          {category === "savings" || category === "income" ? "+" : "-"} $24.00
        </Typography>
        <Typography size={12} color="#9b9ea2">
          20 Aug, 2023
        </Typography>
      </View>
    </View>
  );
}

export default TransactionItem

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        // padding: 16,
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: 1,
        paddingVertical: 12,
        // paddingHorizontal: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    }
})