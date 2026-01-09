import Icon from '@/components/icon';
import { CATEGORIES, Category, Colors } from '@/constants';
import { UI_ICONS } from '@/constants/icon-mappings';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CategorySelectionContentProps {
  selectedCategory?: string;
  onSelect: (category: string) => void;
  onClose: () => void;
}

const CategorySelectionContent: React.FC<CategorySelectionContentProps> = ({
  selectedCategory = '',
  onSelect,
  onClose,
}) => {
  const handleSelect = (categoryName: string) => {
    onSelect(categoryName);
    onClose();
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = item.name === selectedCategory;
    const iconConfig = item.iconConfig;
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleSelect(item.name)}
        activeOpacity={0.7}>
        {iconConfig ? (
          <Icon
            name={iconConfig.name}
            family={iconConfig.family}
            size={24}
            color={Colors.text}
            style={styles.categoryIcon}
          />
        ) : (
          <Text style={styles.categoryIcon}>{item.icon}</Text>
        )}
        <Text style={styles.categoryName}>{item.name}</Text>
        {isSelected && (
          <Icon
            name={UI_ICONS.checkmark.name}
            family={UI_ICONS.checkmark.family}
            size={20}
            color="#007AFF"
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryIcon: {
    marginRight: 12,
    width: 32,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
});

export default CategorySelectionContent;

