import Icon from '@/components/icon';
import { Colors, FREQUENCIES, Frequency } from '@/constants';
import { UI_ICONS } from '@/constants/icon-mappings';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FrequencySelectionContentProps {
  selectedFrequency?: string;
  onSelect: (frequency: string) => void;
  onClose: () => void;
}

const FrequencySelectionContent: React.FC<FrequencySelectionContentProps> = ({
  selectedFrequency = '',
  onSelect,
  onClose,
}) => {
  const handleSelect = (frequencyName: string) => {
    onSelect(frequencyName);
    onClose();
  };

  const renderFrequencyItem = ({ item }: { item: Frequency }) => {
    const isSelected = item.name === selectedFrequency;
    return (
      <TouchableOpacity
        style={styles.frequencyItem}
        onPress={() => handleSelect(item.name)}
        activeOpacity={0.7}>
        <Text style={styles.frequencyName}>{item.name}</Text>
        {isSelected && (
          <Icon
            name={UI_ICONS.checkmark.name}
            family={UI_ICONS.checkmark.family}
            size={20}
            color="#007AFF"
          />
        )}
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={FREQUENCIES}
      renderItem={renderFrequencyItem}
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
  frequencyItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  frequencyName: {
    fontSize: 16,
    color: Colors.text,
  },
  separator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default FrequencySelectionContent;

