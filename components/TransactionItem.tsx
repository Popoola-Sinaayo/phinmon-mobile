import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FoodTransaction from "@/assets/svg/FoodTransaction";
import Typography from "./Typography";
import getCategoryElement from "@/utils/getCategoryElement";
import capitalizeFirstWord from "@/utils/capitalizeFirstWord";
import { formatCurrency } from "@/utils/currencyFormatter";
import CategoryPickerModal from "./CategoryPickerModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionCategory } from "@/requests/dashboard";
import { showMessage } from "react-native-flash-message";
import { useTheme } from "@/contexts/ThemeContext";

const TransactionItem: React.FC<{
  category: string;
  description: string;
  amount: string;
  currencyCode: string;
  date: string;
  transactionId?: string;
  type: "credit" | "debit";
  onCategoryUpdate?: (transactionId: string, newCategory: string) => void;
}> = ({
  category,
  description,
  amount,
  currencyCode,
  date,
  transactionId,
  onCategoryUpdate,
  type,
}) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const queryClient = useQueryClient();
  const { theme } = useTheme();

  const updateCategoryMutation = useMutation({
    mutationFn: ({
      transactionId,
      category,
    }: {
      transactionId: string;
      category: string;
    }) => updateTransactionCategory(transactionId, category),
    onSuccess: (data, variables) => {
      // Update local state if callback provided
      if (onCategoryUpdate) {
        onCategoryUpdate(variables.transactionId, variables.category);
      }

      // Invalidate and refetch transactions
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["userClass"] });

      showMessage({
        message: "Category updated successfully!",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Category update error:", error);
      showMessage({
        message: "Failed to update category. Please try again.",
        type: "danger",
      });
    },
  });

  const handleCategorySelect = (newCategory: string) => {
    if (transactionId && newCategory !== category) {
      updateCategoryMutation.mutate({
        transactionId,
        category: newCategory,
      });
    }
  };

  const details = getCategoryElement(category);
  return (
    <>
      <TouchableOpacity
        style={[styles.container, { borderBottomColor: theme.border }]}
        onPress={() => transactionId && setShowCategoryModal(true)}
        disabled={!transactionId || updateCategoryMutation.isPending}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: details.backgroundColor },
            ]}
          >
            {details.elem}
          </View>
          <View style={{}}>
            <Typography color={theme.text} size={16} weight={500}>
              {category === "others"
                ? "Miscellaneous"
                : capitalizeFirstWord(category)}
            </Typography>
            <Typography size={12} color={theme.textSecondary}>
              {description
                ? description.length > 20
                  ? description.substring(0, 20) + "..."
                  : description
                : "Money sent out for food"}
            </Typography>
          </View>
        </View>
        <View>
          <Typography
            color={
              category === "savings" ||
              category === "income" ||
              type === "credit"
                ? theme.success
                : theme.error
            }
            size={16}
            weight={500}
          >
            {category === "savings" ||
            category === "income" ||
            type === "credit"
              ? "+"
              : "-"}{" "}
            {formatCurrency(parseFloat(amount || "0"), { currencyCode })}
          </Typography>
          <Typography size={12} color={theme.textSecondary} align="right">
            {new Date(date).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </View>
      </TouchableOpacity>

      <CategoryPickerModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSelectCategory={handleCategorySelect}
        currentCategory={category}
      />
    </>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 12,
    width: "100%",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
