import SubscriptionForm from '@/components/subscription-form';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddSubscriptionScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }} edges={['top']}>
      <SubscriptionForm
        mode="add"
        isBottomSheet={false}
        onClose={handleClose}
        onSave={handleClose}
      />
    </SafeAreaView>
  );
}

