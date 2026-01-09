import SubscriptionForm from '@/components/subscription-form';
import { Subscription } from '@/redux/slices/subscription-slice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function EditSubscriptionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const subscriptions = useSelector((state: any) => state.subscriptions.subscriptions);

  const subscription = subscriptions.find((sub: Subscription) => sub.id === id);

  const handleClose = () => {
    router.replace('/(tabs)');
  };

  if (!subscription) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subscription Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SubscriptionForm
        mode="edit"
        subscription={subscription}
        isBottomSheet={false}
        onClose={handleClose}
        onSave={handleClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

