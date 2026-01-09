import Icon from '@/components/icon';
import { APPS, BOTTOM_SHEETS, Colors, CommonStyles, SELECTION_TYPES } from '@/constants';
import { addLayer } from '@/redux/slices/layer-slice';
import { addSubscription, deleteSubscription, Subscription, updateSubscription } from '@/redux/slices/subscription-slice';
import { mapFrequencyToDisplay, mapFrequencyToInternal } from '@/utils/frequency-utils';
import { SubscriptionFormValues, subscriptionValidationSchema } from '@/utils/validation-schema';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface SubscriptionFormProps {
  mode: 'add' | 'edit';
  subscription?: Subscription;
  isBottomSheet?: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

export default function SubscriptionForm({
  mode,
  subscription,
  isBottomSheet = false,
  onClose,
  onSave,
}: SubscriptionFormProps) {
  const dispatch = useDispatch();

  const formik = useFormik<SubscriptionFormValues>({
    initialValues: {
      app: subscription?.app || 'Netflix',
      amount: subscription?.amount || 0,
      category: subscription?.category || 'Loan',
      startDate: subscription?.startDate || format(new Date(), 'yyyy-MM-dd'),
      frequency: subscription?.frequency || 'Weekly',
      remindMe: subscription?.remindMe || '2 days before',
      active: subscription?.active ?? true,
    },
    validationSchema: subscriptionValidationSchema,
    onSubmit: (values) => {
      if (mode === 'add') {
        dispatch(addSubscription(values));
      } else if (subscription) {
        const updatedSubscription: Subscription = {
          ...subscription,
          ...values,
        };
        dispatch(updateSubscription(updatedSubscription));
      }
      onSave?.();
      onClose?.();
    },
  });

  const handleDelete = () => {
    if (!subscription) return;

    Alert.alert(
      'Delete Subscription',
      'Are you sure you want to delete this subscription?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteSubscription(subscription.id));
            onClose?.();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const handleBack = () => {
    onClose?.();
  };

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {mode === 'add' ? 'Add Subscription' : 'Edit Subscription'}
        </Text>
        <TouchableOpacity
          onPress={() => formik.handleSubmit()}
          style={styles.saveButton}
          disabled={!formik.isValid || formik.isSubmitting}>
          <Text
            style={[
              styles.saveButtonText,
              (!formik.isValid || formik.isSubmitting) && styles.saveButtonTextDisabled,
            ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={isBottomSheet ? styles.container : styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={isBottomSheet ? styles.scrollContent : undefined}>
        {/* Subscription Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.logoContainer}>
            {(() => {
              const app = APPS.find(a => a.name === formik.values.app);
              const backgroundColor = app?.color || Colors.black;
              
              return (
                <View style={[styles.logoPlaceholder, { backgroundColor }]}>
                  {app?.iconConfig ? (
                    <Icon
                      name={app.iconConfig.name}
                      family={app.iconConfig.family}
                      size={24}
                      color={Colors.textWhite}
                    />
                  ) : (
                    <Text style={styles.logoText}>{formik.values.app.charAt(0) || '?'}</Text>
                  )}
                </View>
              );
            })()}
          </View>
          <View style={styles.overviewContent}>
            <Text style={styles.overviewAppName}>{formik.values.app || 'App Name'}</Text>
            <Text style={styles.overviewAmount}>
              {formik.values.amount > 0 ? `$${formik.values.amount.toFixed(2)}` : '$0.00'}
            </Text>
          </View>
        </View>

        {/* Subscription Details */}
        <View style={styles.detailsCard}>
          {/* App Field */}
          <TouchableOpacity
            style={[styles.field, formik.errors.app && formik.touched.app && styles.fieldError]}
            onPress={() => {
              dispatch(
                addLayer({
                  id: BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION,
                  data: {
                    type: SELECTION_TYPES.APP,
                    selectedValue: formik.values.app,
                    onSelect: (selectedApp: string) => {
                      formik.setFieldValue('app', selectedApp);
                      formik.setFieldTouched('app', true);
                    },
                  },
                })
              );
            }}
            activeOpacity={0.7}>
            <Text style={styles.fieldLabel}>App</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{formik.values.app || 'App name'}</Text>
              <Text style={styles.arrow}>▼</Text>
            </View>
          </TouchableOpacity>
          {formik.errors.app && formik.touched.app && (
            <Text style={styles.errorText}>{formik.errors.app}</Text>
          )}

          {/* Amount Field */}
          <TouchableOpacity
            style={[styles.field, formik.errors.amount && formik.touched.amount && styles.fieldError]}
            onPress={() => {
              dispatch(
                addLayer({
                  id: BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION,
                  data: {
                    type: SELECTION_TYPES.AMOUNT,
                    selectedValue: formik.values.amount,
                    onSelect: (selectedAmount: number) => {
                      formik.setFieldValue('amount', selectedAmount);
                      formik.setFieldTouched('amount', true);
                    },
                  },
                })
              );
            }}
            activeOpacity={0.7}>
            <Text style={styles.fieldLabel}>Amount</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>
                {formik.values.amount > 0 ? `$${formik.values.amount.toFixed(2)}` : 'Amount'}
              </Text>
              <Text style={styles.arrow}>▼</Text>
            </View>
          </TouchableOpacity>
          {formik.errors.amount && formik.touched.amount && (
            <Text style={styles.errorText}>{formik.errors.amount}</Text>
          )}

          {/* Category Field */}
          <TouchableOpacity
            style={[
              styles.field,
              formik.errors.category && formik.touched.category && styles.fieldError,
            ]}
            onPress={() => {
              dispatch(
                addLayer({
                  id: BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION,
                  data: {
                    type: SELECTION_TYPES.CATEGORY,
                    selectedValue: formik.values.category,
                    onSelect: (selectedCategory: string) => {
                      formik.setFieldValue('category', selectedCategory);
                      formik.setFieldTouched('category', true);
                    },
                  },
                })
              );
            }}
            activeOpacity={0.7}>
            <Text style={styles.fieldLabel}>Category</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>💰 {formik.values.category}</Text>
              <Text style={styles.arrow}>▼</Text>
            </View>
          </TouchableOpacity>
          {formik.errors.category && formik.touched.category && (
            <Text style={styles.errorText}>{formik.errors.category}</Text>
          )}

          {/* Start Date Field */}
          <TouchableOpacity
            style={[
              styles.field,
              formik.errors.startDate && formik.touched.startDate && styles.fieldError,
            ]}
            onPress={() => {
              dispatch(
                addLayer({
                  id: BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION,
                  data: {
                    type: SELECTION_TYPES.DATE,
                    selectedValue: formik.values.startDate,
                    onSelect: (selectedDate: string) => {
                      formik.setFieldValue('startDate', selectedDate);
                      formik.setFieldTouched('startDate', true);
                    },
                  },
                })
              );
            }}
            activeOpacity={0.7}>
            <Text style={styles.fieldLabel}>Start Date</Text>
            <View style={styles.fieldValue}>
              <View style={styles.datePill}>
                <Text style={styles.datePillText}>{formatDate(formik.values.startDate)}</Text>
              </View>
              <Text style={styles.arrow}>▼</Text>
            </View>
          </TouchableOpacity>
          {formik.errors.startDate && formik.touched.startDate && (
            <Text style={styles.errorText}>{formik.errors.startDate}</Text>
          )}

          {/* Frequency Field */}
          <TouchableOpacity
            style={[
              styles.field,
              formik.errors.frequency && formik.touched.frequency && styles.fieldError,
            ]}
            onPress={() => {
              dispatch(
                addLayer({
                  id: BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION,
                  data: {
                    type: SELECTION_TYPES.FREQUENCY,
                    selectedValue: mapFrequencyToDisplay(formik.values.frequency),
                    onSelect: (selectedFrequency: string) => {
                      formik.setFieldValue('frequency', mapFrequencyToInternal(selectedFrequency));
                      formik.setFieldTouched('frequency', true);
                    },
                  },
                })
              );
            }}
            activeOpacity={0.7}>
            <Text style={styles.fieldLabel}>Frequency</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{mapFrequencyToDisplay(formik.values.frequency)}</Text>
              <Text style={styles.arrow}>▼</Text>
            </View>
          </TouchableOpacity>
          {formik.errors.frequency && formik.touched.frequency && (
            <Text style={styles.errorText}>{formik.errors.frequency}</Text>
          )}

          {/* Remind Me Field */}
          <TouchableOpacity
            style={[
              styles.field,
              formik.errors.remindMe && formik.touched.remindMe && styles.fieldError,
            ]}
            onPress={() => {
              dispatch(
                addLayer({
                  id: BOTTOM_SHEETS.SUBSCRIPTION_FIELD_SELECTION,
                  data: {
                    type: SELECTION_TYPES.REMIND_ME,
                    selectedValue: formik.values.remindMe,
                    onSelect: (selectedRemindMe: string) => {
                      formik.setFieldValue('remindMe', selectedRemindMe);
                      formik.setFieldTouched('remindMe', true);
                    },
                  },
                })
              );
            }}
            activeOpacity={0.7}>
            <Text style={styles.fieldLabel}>Remind Me</Text>
            <View style={styles.fieldValue}>
              <Text style={styles.fieldText}>{formik.values.remindMe}</Text>
              <Text style={styles.arrow}>▼</Text>
            </View>
          </TouchableOpacity>
          {formik.errors.remindMe && formik.touched.remindMe && (
            <Text style={styles.errorText}>{formik.errors.remindMe}</Text>
          )}

          {/* Active Toggle */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Active</Text>
            <Switch
              value={formik.values.active}
              onValueChange={(value) => {
                formik.setFieldValue('active', value);
              }}
              trackColor={{ false: Colors.switchTrackInactive, true: Colors.success }}
              thumbColor={formik.values.active ? Colors.textWhite : Colors.switchThumbInactive}
            />
          </View>
        </View>

        {/* Delete Button - Only for edit mode */}
        {mode === 'edit' && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...CommonStyles.container,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  header: {
    ...CommonStyles.header,
  },
  backButton: {
    padding: 8,
  },
  backButtonCircle: {
    ...CommonStyles.circularButton,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.text,
  },
  headerTitle: {
    ...CommonStyles.headerTitle,
  },
  saveButton: {
    ...CommonStyles.primaryButton,
  },
  saveButtonText: {
    ...CommonStyles.primaryButtonText,
  },
  saveButtonTextDisabled: {
    color: Colors.text,
    opacity: 0.5,
  },
  overviewCard: {
    ...CommonStyles.card,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  overviewContent: {
    flex: 1,
  },
  overviewAppName: {
    ...CommonStyles.textLarge,
    color: Colors.textAppName,
    marginBottom: 4,
  },
  overviewAmount: {
    ...CommonStyles.textXLarge,
  },
  detailsCard: {
    ...CommonStyles.sectionContainer,
  },
  field: {
    ...CommonStyles.field,
  },
  fieldError: {
    ...CommonStyles.fieldError,
  },
  fieldLabel: {
    ...CommonStyles.fieldLabel,
  },
  fieldValue: {
    ...CommonStyles.fieldValue,
  },
  fieldText: {
    ...CommonStyles.fieldText,
  },
  arrow: {
    ...CommonStyles.arrow,
  },
  errorText: {
    ...CommonStyles.errorText,
  },
  deleteButton: {
    ...CommonStyles.sectionContainer,
    marginBottom: 32,
    alignItems: 'center',
  },
  datePill: {
    ...CommonStyles.pill,
    marginRight: 8,
  },
  datePillText: {
    ...CommonStyles.pillText,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
});

