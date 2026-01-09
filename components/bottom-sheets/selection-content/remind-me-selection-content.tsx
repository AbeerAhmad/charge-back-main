import Icon from '@/components/icon';
import { Colors, REMIND_ME_OPTIONS, RemindMeOption } from '@/constants';
import { UI_ICONS } from '@/constants/icon-mappings';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RemindMeSelectionContentProps {
  selectedRemindMe?: string;
  onSelect: (remindMe: string) => void;
  onClose: () => void;
}

const RemindMeSelectionContent: React.FC<RemindMeSelectionContentProps> = ({
  selectedRemindMe = '',
  onSelect,
  onClose,
}) => {
  const handleSelect = (remindMeName: string) => {
    onSelect(remindMeName);
    onClose();
  };

  const renderRemindMeItem = ({ item }: { item: RemindMeOption }) => {
    const isSelected = item.name === selectedRemindMe;
    return (
      <TouchableOpacity
        style={styles.remindMeItem}
        onPress={() => handleSelect(item.name)}
        activeOpacity={0.7}>
        <Text style={styles.remindMeName}>{item.name}</Text>
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
      data={REMIND_ME_OPTIONS}
      renderItem={renderRemindMeItem}
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
  remindMeItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remindMeName: {
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

export default RemindMeSelectionContent;

