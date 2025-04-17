import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Trash2 } from 'lucide-react-native';
import { useScanStore } from '@/store/scan-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import EmptyState from '@/components/EmptyState';
import foodDatabase from '@/mocks/food-database';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';

export default function HistoryScreen() {
  const { history, removeFromHistory, clearHistory } = useScanStore();
  const { t } = useTranslation();

  const handleClearHistory = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
    clearHistory();
  };

  const handleDeleteScan = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    removeFromHistory(id);
  };

  const handleScanPress = (foodId: string) => {
    router.push({
      pathname: '/result',
      params: { foodId }
    });
  };

  if (history.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState 
          title={t('noScanHistory')}
          message={t('scanFirstFood')}
        />
      </SafeAreaView>
    );
  }

  const renderScanItem = ({ item }: { item: typeof history[0] }) => {
    const food = foodDatabase.find(f => f.id === item.foodId);
    if (!food) return null;

    const scanDate = new Date(item.timestamp);
    const formattedDate = scanDate.toLocaleDateString();
    const formattedTime = scanDate.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const getRecommendationColor = () => {
      switch (food.diabeticRecommendation) {
        case 'good':
          return colors.success;
        case 'moderate':
          return colors.warning;
        case 'limit':
          return colors.danger;
        default:
          return colors.text;
      }
    };

    // Generate a placeholder image for history items
    const getImageUrl = () => {
      return `https://source.unsplash.com/featured/?${food.name.replace(' ', ',')}`;
    };

    return (
      <Pressable
        style={({ pressed }) => [
          styles.scanItem,
          pressed && styles.scanItemPressed
        ]}
        onPress={() => handleScanPress(food.id)}
      >
        <View style={styles.scanItemContent}>
          <View style={styles.scanImageContainer}>
            <Image
              source={{ uri: getImageUrl() }}
              style={styles.scanImage}
              contentFit="cover"
            />
          </View>
          
          <View style={styles.scanInfo}>
            <Text style={styles.scanName}>{food.name}</Text>
            <View style={[
              styles.scanBadge,
              { backgroundColor: getRecommendationColor() + '20' }
            ]}>
              <Text style={[
                styles.scanBadgeText,
                { color: getRecommendationColor() }
              ]}>
                {food.diabeticRecommendation === 'good' ? t('goodChoice') : 
                 food.diabeticRecommendation === 'moderate' ? t('moderate') : t('limitConsumption')}
              </Text>
            </View>
            <Text style={styles.scanDate}>
              {formattedDate} at {formattedTime}
            </Text>
          </View>
        </View>
        
        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed
          ]}
          onPress={() => handleDeleteScan(item.id)}
        >
          <Trash2 size={20} color={colors.danger} />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={history}
        renderItem={renderScanItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={typography.heading3}>{t('history')}</Text>
            {history.length > 0 && (
              <Pressable
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed && styles.clearButtonPressed
                ]}
                onPress={handleClearHistory}
              >
                <Text style={styles.clearButtonText}>{t('clearScanHistory')}</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.danger + '20',
  },
  clearButtonPressed: {
    opacity: 0.7,
  },
  clearButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
  },
  scanItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  scanItemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  scanItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  scanImage: {
    width: '100%',
    height: '100%',
  },
  scanInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  scanBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  scanBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scanDate: {
    fontSize: 12,
    color: colors.textLight,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonPressed: {
    opacity: 0.7,
  },
});