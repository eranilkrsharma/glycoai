import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import { ArrowLeft, Share2, Camera, RefreshCcw } from 'lucide-react-native';
import { useScanStore } from '@/store/scan-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import GIIndexScale from '@/components/GIIndexScale';
import NutritionCard from '@/components/NutritionCard';
import RecommendationCard from '@/components/RecommendationCard';
import FoodCard from '@/components/FoodCard';
import LoadingIndicator from '@/components/LoadingIndicator';
import foodDatabase, { FoodItem } from '@/mocks/food-database';
import { getBetterAlternatives, getSimilarFoods, getFoodByName } from '@/mocks/scan-recognition';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from '@/hooks/useTranslation';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const { foodId } = params;
  const { currentScan, finishScan, startScan, setScanResult } = useScanStore();
  const [food, setFood] = useState<FoodItem | null>(null);
  const [alternatives, setAlternatives] = useState<FoodItem[]>([]);
  const [similarFoods, setSimilarFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiAnalyzed, setIsAiAnalyzed] = useState(false);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const { t } = useTranslation();
  
  // Use refs to track component state
  const isMounted = useRef(true);
  const dataLoaded = useRef(false);
  const scanProcessed = useRef(false);

  // Set up cleanup
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Process scan result
  useEffect(() => {
    if (currentScan.result && !scanProcessed.current) {
      scanProcessed.current = true;
      finishScan();
    }
  }, [currentScan.result, finishScan]);

  // Load food data
  useEffect(() => {
    if (dataLoaded.current) return;
    
    const loadFoodData = async () => {
      try {
        dataLoaded.current = true;
        
        let foundFood: FoodItem | null = null;
        
        // Case 1: Coming from a direct scan
        if (currentScan.result) {
          foundFood = currentScan.result;
          setIsAiAnalyzed(true);
        } 
        // Case 2: Coming from history or recommendations
        else if (foodId) {
          const foodIdStr = typeof foodId === 'string' ? foodId : String(foodId);
          foundFood = foodDatabase.find(f => f.id === foodIdStr) || null;
          setIsAiAnalyzed(false);
        }
        
        if (foundFood && isMounted.current) {
          setFood(foundFood);
          
          // Get alternatives and similar foods
          const altFoods = getBetterAlternatives(foundFood);
          const simFoods = getSimilarFoods(foundFood.category, foundFood.id);
          
          setAlternatives(altFoods);
          setSimilarFoods(simFoods);
        } else if (isMounted.current) {
          // No food found
          Alert.alert(t('foodNotFound'), t('tryAgain'));
          router.back();
        }
      } catch (error) {
        console.error('Error loading food data:', error);
        if (isMounted.current) {
          Alert.alert('Error', 'Failed to load food data. Please try again.');
          router.back();
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    loadFoodData();
  }, [foodId, currentScan.result, t]);

  const handleShare = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Share', 'Sharing functionality would be implemented here in a real app.');
  };

  const handleBack = () => {
    router.back();
  };

  const handleRescan = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    try {
      // Request permissions
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera permissions to make this work!');
          return;
        }
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        startScan(imageUri);
        
        // Navigate to home
        router.replace('/');
      }
    } catch (error) {
      console.error('Error rescanning food:', error);
      Alert.alert('Error', 'Failed to scan food. Please try again.');
    }
  };

  const handleReanalyze = async () => {
    if (!food) return;
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setIsReanalyzing(true);
    
    try {
      // Use text-based analysis with the current food name
      const foodResult = await getFoodByName(food.name);
      
      if (foodResult && isMounted.current) {
        setFood(foodResult);
        setIsAiAnalyzed(true);
        
        // Update alternatives and similar foods
        const altFoods = getBetterAlternatives(foodResult);
        const simFoods = getSimilarFoods(foodResult.category, foodResult.id);
        
        setAlternatives(altFoods);
        setSimilarFoods(simFoods);
        
        // Update in store
        setScanResult(foodResult);
        
        Alert.alert(t('success'), 'Food reanalyzed successfully with AI.');
      } else if (isMounted.current) {
        Alert.alert('Analysis Failed', 'Failed to reanalyze the food. Please try again.');
      }
    } catch (error) {
      console.error('Error reanalyzing food:', error);
      if (isMounted.current) {
        Alert.alert('Error', 'Failed to reanalyze food. Please try again.');
      }
    } finally {
      if (isMounted.current) {
        setIsReanalyzing(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingIndicator message={t('loadingAnalysis')} />;
  }

  if (!food) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>{t('foodNotFound')}</Text>
          <Text style={styles.errorMessage}>
            {t('tryAgain')}
          </Text>
          <Pressable
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>{t('goBack')}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const getImageUrl = () => {
    // If we have a scan image, use it, otherwise use Unsplash
    if (currentScan.imageUri) {
      return currentScan.imageUri;
    }
    return `https://source.unsplash.com/featured/?${food.name.replace(' ', ',')}`;
  };

  const getGIExplanation = () => {
    if (food.giIndex === 0) return t('giExplanationNone');
    if (food.giIndex <= 55) return t('giExplanationLow');
    if (food.giIndex <= 69) return t('giExplanationMedium');
    return t('giExplanationHigh');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: food.name,
          headerLeft: () => (
            <Pressable
              style={styles.headerButton}
              onPress={handleBack}
            >
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={styles.headerButton}
              onPress={handleShare}
            >
              <Share2 size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {isReanalyzing ? (
          <LoadingIndicator message={t('analyzingFood')} />
        ) : (
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Image
              source={{ uri: getImageUrl() }}
              style={styles.foodImage}
              contentFit="cover"
            />
            
            <View style={styles.foodHeader}>
              <Text style={typography.heading1}>{food.name}</Text>
              <Text style={styles.category}>{food.category.charAt(0).toUpperCase() + food.category.slice(1)}</Text>
              
              {isAiAnalyzed && (
                <View style={styles.aiPoweredBadge}>
                  <Text style={styles.aiPoweredText}>{t('aiPowered')}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('glycemicIndex')}</Text>
              <GIIndexScale value={food.giIndex} />
              <Text style={styles.giExplanation}>{getGIExplanation()}</Text>
            </View>
            
            <NutritionCard food={food} isAiAnalyzed={isAiAnalyzed} />
            
            <RecommendationCard food={food} />
            
            {alternatives.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('betterAlternatives')}</Text>
                {alternatives.map(alt => (
                  <FoodCard key={alt.id} food={alt} />
                ))}
              </View>
            )}
            
            {similarFoods.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('similarFoods')}</Text>
                {similarFoods.map(similar => (
                  <FoodCard key={similar.id} food={similar} />
                ))}
              </View>
            )}
            
            <View style={styles.actionButtons}>
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.primaryButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={handleRescan}
              >
                <Camera size={20} color={colors.card} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{t('newScan')}</Text>
              </Pressable>
              
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.secondaryButton,
                  pressed && styles.buttonPressed
                ]}
                onPress={handleReanalyze}
              >
                <RefreshCcw size={20} color={colors.primary} style={styles.buttonIcon} />
                <Text style={styles.secondaryButtonText}>{t('reanalyze')}</Text>
              </Pressable>
            </View>
            
            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                {t('disclaimer')}: {t('disclaimerText')}
              </Text>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  foodImage: {
    width: '100%',
    height: 250,
  },
  foodHeader: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
    color: colors.textLight,
    marginLeft: 8,
    backgroundColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  aiPoweredBadge: {
    marginLeft: 'auto',
    backgroundColor: colors.info + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  aiPoweredText: {
    fontSize: 12,
    color: colors.info,
    fontWeight: '600',
  },
  section: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  giExplanation: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  disclaimer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: colors.warning + '15',
    borderRadius: 8,
  },
  disclaimerText: {
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  headerButton: {
    padding: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 16,
  },
});