import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { X, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import colors from '@/constants/colors';
import foodDatabase, { FoodItem } from '@/mocks/food-database';
import { getFoodByName } from '@/mocks/scan-recognition';
import { useScanStore } from '@/store/scan-store';
import { useTranslation } from '@/hooks/useTranslation';

interface ManualEntryModalProps {
  visible: boolean;
  onClose: () => void;
}

const ManualEntryModal: React.FC<ManualEntryModalProps> = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [directInput, setDirectInput] = useState('');
  const { setScanResult } = useScanStore();
  const { t } = useTranslation();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.length >= 2) {
      // Search for foods that match the query in our database
      const searchResults = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(text.toLowerCase())
      );
      
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    onClose();
    
    // Set the selected food as the scan result
    setScanResult(food);
    
    // Navigate to result screen with the selected food
    router.push({
      pathname: '/result',
      params: { foodId: food.id }
    });
  };

  const handleAnalyzeFood = async () => {
    if (!directInput.trim()) return;
    
    setIsLoading(true);
    try {
      // Use Gemini API to analyze the food by text
      const foodResult = await getFoodByName(directInput);
      
      if (foodResult) {
        // Set the result and navigate
        setScanResult(foodResult);
        onClose();
        router.push('/result');
      } else {
        alert('Could not analyze this food. Please try a different description.');
      }
    } catch (error) {
      console.error('Error analyzing food:', error);
      alert('An error occurred while analyzing the food. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('enterFoodName')}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          </View>
          
          {/* Direct input section with AI analysis */}
          <View style={styles.directInputContainer}>
            <Text style={styles.directInputLabel}>{t('analyzeAnyFood')}</Text>
            <View style={styles.directInputRow}>
              <TextInput
                style={styles.directInput}
                placeholder="Enter any food (e.g., sushi, quinoa salad)"
                placeholderTextColor={colors.textLight}
                value={directInput}
                onChangeText={setDirectInput}
                returnKeyType="search"
                onSubmitEditing={handleAnalyzeFood}
              />
              <Pressable 
                style={styles.analyzeButton}
                onPress={handleAnalyzeFood}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.card} />
                ) : (
                  <>
                    <Search size={16} color={colors.card} style={styles.analyzeIcon} />
                    <Text style={styles.analyzeText}>{t('analyzeWithAI')}</Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('orSearchDatabase')}</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={t('searchDatabase')}
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={handleSearch}
              returnKeyType="search"
            />
          </View>
          
          {results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable 
                  style={({ pressed }) => [
                    styles.resultItem,
                    pressed && styles.resultItemPressed
                  ]}
                  onPress={() => handleSelectFood(item)}
                >
                  <Text style={styles.resultName}>{item.name}</Text>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultCategory}>{item.category}</Text>
                    <Text style={styles.resultGi}>GI: {item.giIndex === 0 ? 'N/A' : item.giIndex}</Text>
                    <Text style={styles.resultSugar}>{t('sugar')}: {item.sugar}g</Text>
                  </View>
                </Pressable>
              )}
              style={styles.resultsList}
            />
          ) : (
            <View style={styles.emptyResults}>
              {searchQuery.length >= 2 ? (
                <Text style={styles.emptyResultsText}>{t('noFoodsFound')} "{searchQuery}"</Text>
              ) : (
                <Text style={styles.emptyResultsText}>{t('type2CharsToSearch')}</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeButton: {
    padding: 5,
  },
  directInputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  directInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  directInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directInput: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  analyzeButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyzeIcon: {
    marginRight: 4,
  },
  analyzeText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    paddingHorizontal: 10,
    color: colors.textLight,
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  resultsList: {
    paddingHorizontal: 20,
  },
  resultItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultItemPressed: {
    backgroundColor: colors.background,
  },
  resultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  resultInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultCategory: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 12,
  },
  resultGi: {
    fontSize: 14,
    color: colors.textLight,
    marginRight: 12,
  },
  resultSugar: {
    fontSize: 14,
    color: colors.textLight,
  },
  emptyResults: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultsText: {
    color: colors.textLight,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ManualEntryModal;