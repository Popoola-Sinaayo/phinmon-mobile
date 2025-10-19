import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import Typography from './Typography';
import getCategoryElement from '@/utils/getCategoryElement';
import capitalizeFirstWord from '@/utils/capitalizeFirstWord';
import { useTheme } from "@/contexts/ThemeContext";

interface CategoryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
  currentCategory?: string;
}

const categories = [
  'food',
  'transport', 
  'shopping',
  'bills',
  'entertainment',
  'savings',
  'health',
  'education',
  'subscriptions',
  'giftings',
  'home',
  'income',
  'bank charges',
  'donations',
  'others'
];

const CategoryPickerModal: React.FC<CategoryPickerModalProps> = ({
  visible,
  onClose,
  onSelectCategory,
  currentCategory,
}) => {
  const { theme } = useTheme();
  
  const handleCategorySelect = (category: string) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[styles.modalContainer, { backgroundColor: theme.surface }]}
        >
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Typography weight={600} size={18} variant="heading">
              Select Category
            </Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Typography color={theme.primary} weight={500}>
                Cancel
              </Typography>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.categoriesList}
            showsVerticalScrollIndicator={false}
          >
            {categories.map((category) => {
              const details = getCategoryElement(category);
              const isSelected = category === currentCategory;

              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryItem,
                    { borderBottomColor: theme.border },
                    isSelected && { backgroundColor: theme.primary + "20" },
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <View style={styles.categoryLeft}>
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: details.backgroundColor },
                      ]}
                    >
                      {details.elem}
                    </View>
                    <Typography
                      weight={isSelected ? 600 : 500}
                      size={16}
                      color={isSelected ? theme.primary : theme.text}
                    >
                      {category === "others"
                        ? "Miscellaneous"
                        : capitalizeFirstWord(category)}
                    </Typography>
                  </View>
                  {isSelected && (
                    <View
                      style={[
                        styles.selectedIndicator,
                        { backgroundColor: theme.primary + "30" },
                      ]}
                    >
                      <Typography color={theme.primary} weight={600}>
                        ✓
                      </Typography>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoryPickerModal;
