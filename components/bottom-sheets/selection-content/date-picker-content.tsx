import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parseISO, startOfToday } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface DatePickerContentProps {
  selectedDate?: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

const DatePickerContent: React.FC<DatePickerContentProps> = ({
  selectedDate,
  onSelect,
  onClose,
}) => {
  // Get today's date (start of day, no time) - memoized to avoid recalculation
  const today = useMemo(() => startOfToday(), []);
  
  // Parse selected date or use today as default
  const getInitialDate = (): Date => {
    if (selectedDate) {
      try {
        // Try parsing as ISO string first
        const parsed = parseISO(selectedDate);
        // If parsed date is valid and not before today, use it
        if (!isNaN(parsed.getTime()) && parsed >= today) {
          return parsed;
        }
      } catch {
        // If parsing fails, try regular Date constructor
        const parsed = new Date(selectedDate);
        if (!isNaN(parsed.getTime()) && parsed >= today) {
          return parsed;
        }
      }
    }
    // Default to today if no valid date or date is in the past
    return today;
  };

  const [currentDate, setCurrentDate] = useState<Date>(getInitialDate());

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      // Ensure date is not before today
      const validDate = date >= today ? date : today;
      setCurrentDate(validDate);
      
      // Update parent immediately as user selects
      const dateString = format(validDate, 'yyyy-MM-dd');
      onSelect(dateString);
    }
  };

  // Update state when selectedDate prop changes
  useEffect(() => {
    if (selectedDate) {
      try {
        const parsed = parseISO(selectedDate);
        if (!isNaN(parsed.getTime()) && parsed >= today) {
          setCurrentDate(parsed);
        } else {
          // If date is invalid or in the past, set to today
          const todayString = format(today, 'yyyy-MM-dd');
          setCurrentDate(today);
          onSelect(todayString);
        }
      } catch {
        // If parsing fails, try regular Date constructor
        const parsed = new Date(selectedDate);
        if (!isNaN(parsed.getTime()) && parsed >= today) {
          setCurrentDate(parsed);
        } else {
          const todayString = format(today, 'yyyy-MM-dd');
          setCurrentDate(today);
          onSelect(todayString);
        }
      }
    } else {
      // If no selectedDate, default to today
      const todayString = format(today, 'yyyy-MM-dd');
      setCurrentDate(today);
      onSelect(todayString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={currentDate}
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={handleDateChange}
        themeVariant="light"
        minimumDate={today}
        style={styles.picker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 32,
  },
  picker: {
    width: '100%',
  },
});

export default DatePickerContent;

