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
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Typography weight={600} size={18}>
              Select Category
            </Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Typography color="#8C78F2" weight={500}>
                Cancel
              </Typography>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.categoriesList} showsVerticalScrollIndicator={false}>
            {categories.map((category) => {
              const details = getCategoryElement(category);
              const isSelected = category === currentCategory;
              
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryItem,
                    isSelected && styles.selectedCategoryItem,
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
                      color={isSelected ? "#8C78F2" : "#414141"}
                    >
                      {category === "others"
                        ? "Miscellaneous"
                        : capitalizeFirstWord(category)}
                    </Typography>
                  </View>
                  {isSelected && (
                    <View style={styles.selectedIndicator}>
                      <Typography color="#8C78F2" weight={600}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedCategoryItem: {
    backgroundColor: '#F8F7FF',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0EDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryPickerModal;
