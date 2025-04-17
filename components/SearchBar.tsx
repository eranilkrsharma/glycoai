import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, FlatList, ActivityIndicator } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { router } from 'expo-router';
import colors from '@/constants/colors';
import foodDatabase, { FoodItem } from '@/mocks/food-database';
import { getFoodByName } from '@/mocks/scan-recognition';
import { useScanStore } from '@/store/scan-store';
import { useTranslation } from '@/hooks/useTranslation';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search for foods..." 
}) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { setScanResult } = useScanStore();
  const { t } = useTranslation();

  const handleSearch = (text: string) => {
    setQuery(text);
    
    if (text.length >= 2) {
      // Search for foods that match the query in our database
      const searchResults = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(text.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleSelectFood = (food: FoodItem) => {
    setQuery('');
    setShowResults(false);
    
    // Set the selected food as the scan result
    setScanResult(food);
    
    // Navigate to result screen with the selected food
    router.push({
      pathname: '/result',
      params: { foodId: food.id }
    });
  };

  const handleSubmitSearch = async () => {
    if (query.length < 2) return;
    
    setIsSearching(true);
    try {
      // Use Gemini API to analyze the food by text
      const foodResult = await getFoodByName(query);
      
      if (foodResult) {
        setScanResult(foodResult);
        setQuery('');
        setShowResults(false);
        router.push('/result');
      } else {
        alert('Could not analyze this food. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error analyzing food:', error);
      alert('An error occurred while analyzing the food. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {isSearching ? (
          <ActivityIndicator size="small" color={colors.primary} style={styles.searchIcon} />
        ) : (
          <Pressable onPress={handleSubmitSearch} disabled={query.length < 2}>
            <Search size={20} color={colors.textLight} style={styles.searchIcon} />
          </Pressable>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          value={query}
          onChangeText={handleSearch}
          returnKeyType="search"
          onSubmitEditing={handleSubmitSearch}
        />
        {query.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <X size={18} color={colors.textLight} />
          </Pressable>
        )}
      </View>
      
      {showResults && results.length > 0 && (
        <View style={styles.resultsContainer}>
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
                <Text style={styles.resultText}>{item.name}</Text>
                <Text style={styles.resultCategory}>{item.category}</Text>
              </Pressable>
            )}
            keyboardShouldPersistTaps="handled"
          />
          <Pressable 
            style={styles.analyzeButton}
            onPress={handleSubmitSearch}
            disabled={isSearching}
          >
            <Text style={styles.analyzeText}>
              {isSearching ? t('analyzing') : `${t('analyzeWithAI')} "${query}"`}
            </Text>
          </Pressable>
        </View>
      )}
      
      {showResults && results.length === 0 && query.length >= 2 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>{t('noFoodsFound')} "{query}"</Text>
          <Pressable 
            style={styles.analyzeButton}
            onPress={handleSubmitSearch}
            disabled={isSearching}
          >
            <Text style={styles.analyzeText}>
              {isSearching ? t('analyzing') : `${t('analyzeWithAI')} "${query}"`}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: 6,
  },
  resultsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginTop: 4,
    maxHeight: 300,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultItemPressed: {
    backgroundColor: colors.background,
  },
  resultText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  resultCategory: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  noResultsContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginTop: 4,
    padding: 16,
    alignItems: 'center',
  },
  noResultsText: {
    color: colors.textLight,
    fontSize: 14,
    marginBottom: 12,
  },
  analyzeButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 12,
    alignItems: 'center',
  },
  analyzeText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SearchBar;