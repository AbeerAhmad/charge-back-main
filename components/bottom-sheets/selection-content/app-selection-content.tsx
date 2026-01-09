import Icon from '@/components/icon';
import { APPS, App, Colors } from '@/constants';
import { UI_ICONS } from '@/constants/icon-mappings';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AppSelectionContentProps {
  selectedApp?: string;
  onSelect: (app: string) => void;
  onClose: () => void;
}

const AppSelectionContent: React.FC<AppSelectionContentProps> = ({
  selectedApp = '',
  onSelect,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = useMemo(() => {
    if (!searchQuery) return APPS;
    return APPS.filter(app =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelect = (appName: string) => {
    onSelect(appName);
    onClose();
  };

  const renderAppItem = ({ item }: { item: App }) => {
    const isSelected = item.name === selectedApp;
    const iconConfig = item.iconConfig;
    return (
      <TouchableOpacity
        style={styles.appItem}
        onPress={() => handleSelect(item.name)}
        activeOpacity={0.7}>
        <View style={[styles.logoContainer, { borderColor: item.color }]}>
          {iconConfig ? (
            <Icon
              name={iconConfig.name}
              family={iconConfig.family}
              size={20}
              color={item.color}
            />
          ) : (
            <Text style={[styles.logoText, { color: item.color }]}>{item.logo}</Text>
          )}
        </View>
        <Text style={styles.appName}>{item.name}</Text>
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
    <>
      <View style={styles.searchContainer}>
        <Icon
          name={UI_ICONS.search.name}
          family={UI_ICONS.search.family}
          size={18}
          color={Colors.text}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={Colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={false}
        />
      </View>

      <FlatList
        data={filteredApps}
        renderItem={renderAppItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    flex: 1,
    fontSize: 16,
    color: Colors.textAppName,
  },
});

export default AppSelectionContent;

