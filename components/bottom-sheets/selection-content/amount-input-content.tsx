import { Colors } from '@/constants';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AmountInputContentProps {
  amount: number;
  onSelect: (amount: number) => void;
  onClose: () => void;
}

const AmountInputContent: React.FC<AmountInputContentProps> = ({
  amount,
  onSelect,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Initialize with empty string if amount is 0, otherwise show the full value
    if (amount === 0) {
      setInputValue('');
    } else {
      // Display the full amount value without removing trailing zeros
      // This ensures 50 shows as "50" not "5"
      const formatted = amount.toString();
      setInputValue(formatted);
    }
  }, [amount]);

  useEffect(() => {
    // Auto focus when component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTextChange = (text: string) => {
    // Only allow numbers and one decimal point
    let cleaned = text.replace(/[^0-9.]/g, '');
    
    // Handle multiple decimal points - keep only the first one
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length === 2 && parts[1].length > 2) {
      cleaned = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    setInputValue(cleaned);
    
    // Update parent with numeric value
    const numValue = parseFloat(cleaned) || 0;
    onSelect(numValue);
  };

  const handleBlur = () => {
    // Format the value on blur
    const numValue = parseFloat(inputValue) || 0;
    if (numValue > 0) {
      // Keep the value as user typed it, but ensure it's valid
      const formatted = numValue.toString().replace(/\.?0+$/, '');
      setInputValue(formatted);
    } else {
      setInputValue('');
    }
  };

  const handleClear = () => {
    setInputValue('');
    onSelect(0);
    inputRef.current?.focus();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={0}>
      <View style={styles.inputContainer}>
        <Text style={styles.dollarSign}>$</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={inputValue}
            onChangeText={handleTextChange}
            onBlur={handleBlur}
            keyboardType="decimal-pad"
            returnKeyType="done"
            placeholder="0.00"
            placeholderTextColor="#999"
          />
          {inputValue !== '' && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dollarSign: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    color: Colors.text,
    padding: 0,
    margin: 0,
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '600',
  },
});

export default AmountInputContent;

