import AmountInputContent from '@/components/bottom-sheets/selection-content/amount-input-content';
import AppSelectionContent from '@/components/bottom-sheets/selection-content/app-selection-content';
import CategorySelectionContent from '@/components/bottom-sheets/selection-content/category-selection-content';
import DatePickerContent from '@/components/bottom-sheets/selection-content/date-picker-content';
import FrequencySelectionContent from '@/components/bottom-sheets/selection-content/frequency-selection-content';
import RemindMeSelectionContent from '@/components/bottom-sheets/selection-content/remind-me-selection-content';
import { Colors, CommonStyles, SELECTION_TYPES, SelectionType } from '@/constants';
import withBottomSheet from '@/hoc/with-bottom-sheet';
import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SelectionBottomSheetProps {
  data?: {
    type: SelectionType;
    title?: string;
    selectedValue?: string | number;
    onSelect: (value: string | number) => void;
  };
}

const SELECTION_TITLES: Record<SelectionType, string> = {
  [SELECTION_TYPES.APP]: 'App',
  [SELECTION_TYPES.AMOUNT]: 'Amount',
  [SELECTION_TYPES.CATEGORY]: 'Category',
  [SELECTION_TYPES.DATE]: 'Start Date',
  [SELECTION_TYPES.FREQUENCY]: 'Frequency',
  [SELECTION_TYPES.REMIND_ME]: 'Remind Me',
};

const getSelectionTitle = (type: SelectionType): string => {
  return SELECTION_TITLES[type] || 'Select';
};

const SelectionBottomSheet: React.FC<SelectionBottomSheetProps> = ({ data }) => {
  const bottomSheet = useBottomSheet();
  const type = data?.type;
  const title = data?.title || (type ? getSelectionTitle(type) : 'Select');
  const selectedValue = data?.selectedValue;
  const onSelect = data?.onSelect;


  if (!type || !onSelect) {
    return null;
  }

  const handleClose = () => {
    bottomSheet.close();
  };

  const renderContent = () => {
    switch (type) {
      case SELECTION_TYPES.APP:
        return (
          <AppSelectionContent
            selectedApp={selectedValue as string}
            onSelect={(value) => onSelect(value)}
            onClose={handleClose}
          />
        );
      case SELECTION_TYPES.AMOUNT:
        return (
          <AmountInputContent
            amount={selectedValue as number || 0}
            onSelect={(value) => onSelect(value)}
            onClose={handleClose}
          />
        );
      case SELECTION_TYPES.CATEGORY:
        return (
          <CategorySelectionContent
            selectedCategory={selectedValue as string}
            onSelect={(value) => onSelect(value)}
            onClose={handleClose}
          />
        );
      case SELECTION_TYPES.DATE:
        return (
          <DatePickerContent
            selectedDate={selectedValue as string}
            onSelect={(value) => {
              onSelect(value);
              // Date picker updates as user scrolls, close when Done is pressed
            }}
            onClose={handleClose}
          />
        );
      case SELECTION_TYPES.FREQUENCY:
        return (
          <FrequencySelectionContent
            selectedFrequency={selectedValue as string}
            onSelect={(value) => onSelect(value)}
            onClose={handleClose}
          />
        );
      case SELECTION_TYPES.REMIND_ME:
        return (
          <RemindMeSelectionContent
            selectedRemindMe={selectedValue as string}
            onSelect={(value) => onSelect(value)}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  const showHeaderButton = type === SELECTION_TYPES.APP;

  return (
    <BottomSheetView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          {showHeaderButton ? (
            <View style={styles.headerButton}>
              <Text style={styles.headerButtonText}>{title}</Text>
            </View>
          ) : (
            <Text style={styles.headerTitle}>{title}</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    ...CommonStyles.header,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerButtonText: {
    ...CommonStyles.textPrimary,
    fontWeight: '600',
  },
  headerTitle: {
    ...CommonStyles.headerTitle,
  },
  doneButton: {
    ...CommonStyles.primaryButton,
  },
  doneButtonText: {
    ...CommonStyles.primaryButtonText,
  },
});

export default withBottomSheet(SelectionBottomSheet, {
  snapPoints: (props: SelectionBottomSheetProps) => {
    // Only apply 60% snap point for AMOUNT type
    if (props.data?.type === SELECTION_TYPES.AMOUNT) {
      return ['60%'];
    }
    return undefined; // Use dynamic sizing for other types
  },
});

