import Icon from '@/components/icon';
import { APPS, Colors, CommonStyles } from '@/constants';
import { Subscription } from '@/redux/slices/subscription-slice';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SubscriptionItemProps {
  subscription: Subscription;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ subscription }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/subscription/${subscription.id}`);
  };

  const app = APPS.find(a => a.name === subscription.app);
  const backgroundColor = app?.color || Colors.black;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.logoContainer}>
        <View style={[styles.logoPlaceholder, { backgroundColor }]}>
          {app?.iconConfig ? (
            <Icon
              name={app.iconConfig.name}
              family={app.iconConfig.family}
              size={24}
              color={Colors.textWhite}
            />
          ) : (
            <Text style={styles.logoText}>{subscription.app.charAt(0)}</Text>
          )}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.appName}>{subscription.app}</Text>
        <Text style={styles.amount}>${subscription.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, subscription.active ? styles.statusActive : styles.statusInactive]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.cardWithShadow,
    flexDirection: 'row',
    marginBottom: 12,
  },
  logoContainer: {
    marginRight: 12,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: Colors.textWhite,
    fontSize: 22,
    fontWeight: '900',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  appName: {
    ...CommonStyles.textPrimary,
    color: Colors.textAppName,
    fontWeight: '600',
    marginBottom: 4,
  },
  amount: {
    ...CommonStyles.textXLarge,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusActive: {
    backgroundColor: Colors.success,
  },
  statusInactive: {
    backgroundColor: Colors.error,
  },
});

export default SubscriptionItem;

