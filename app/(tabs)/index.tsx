import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useScanStore } from '@/store/scan-store';
import { recognizeFood } from '@/mocks/scan-recognition';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import ScanButton from '@/components/ScanButton';
import SearchBar from '@/components/SearchBar';
import FoodCard from '@/components/FoodCard';
import foodDatabase from '@/mocks/food-database';
import { useTranslation } from '@/hooks/useTranslation';
import { Activity } from 'lucide-react-native';

export default function HomeScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const { recentScans, startScan, setScanResult } = useScanStore();
  const { t } = useTranslation();

  const handleScan = async () => {
    try {
      // Request permissions
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
          return;
        }
      }

      // Launch camera or image picker
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        startScan(imageUri);
        setIsScanning(true);

        try {
          // Use Gemini API to analyze the food image
          const foodResult = await recognizeFood(imageUri);
          setScanResult(foodResult);
        } catch (error) {
          console.error('Error analyzing food with Gemini:', error);
          alert('Failed to analyze the food. Please try again or enter the food name manually.');
        } finally {
          setIsScanning(false);
          // Navigate to result screen
          router.push('/result');
        }
      }
    } catch (error) {
      console.error('Error scanning food:', error);
      setIsScanning(false);
      alert('Failed to scan food. Please try again.');
    }
  };

  // Get recommended foods for diabetics
  const recommendedFoods = foodDatabase
    .filter(food => food.diabeticRecommendation === 'good')
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner with heartbeat and text */}
        <View style={styles.heroBanner}>
          <View style={styles.heartbeatContainer}>
            <Activity size={28} color="white" style={styles.heartbeatIcon} />
            <Text style={styles.bannerTitle}>Gyco AI</Text>
          </View>
          <Text style={styles.bannerSubtitle}>Smart Glucose Management</Text>
        </View>

        <View style={styles.header}>
          <Text style={typography.heading2}>
            {t('scanFoodForHealth')}
          </Text>
          <Text style={[typography.body, styles.subtitle]}>
            {t('takePhotoOrSearch')}
          </Text>
        </View>

        {/* Added SearchBar component */}
        <SearchBar placeholder={t('searchForFoods')} />

        <ScanButton onPress={handleScan} isScanning={isScanning} />

        {recentScans.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('recentScans')}</Text>
            {recentScans.map(scan => {
              const food = foodDatabase.find(f => f.id === scan.foodId);
              if (!food) return null;
              
              return (
                <View key={scan.id} style={styles.recentScanItem}>
                  {scan.imageUri && (
                    <Image
                      source={{ uri: scan.imageUri }}
                      style={styles.recentScanImage}
                      contentFit="cover"
                    />
                  )}
                  <FoodCard food={food} />
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('recommendedForDiabetics')}</Text>
          {recommendedFoods.map(food => (
            <FoodCard key={food.id} food={food} />
          ))}
        </View>
        
        {/* Added new section for low sugar foods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('lowSugarOptions')}</Text>
          {foodDatabase
            .filter(food => food.sugar <= 2 && food.diabeticRecommendation === 'good')
            .slice(0, 3)
            .map(food => (
              <FoodCard key={food.id} food={food} />
            ))
          }
        </View>

        {/* Featured image section */}
        <View style={styles.featuredContainer}>
          <Image
            source={{ uri: 'https://source.unsplash.com/featured/?diabetes,healthy,lifestyle' }}
            style={styles.featuredImage}
            contentFit="cover"
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>{t('eatSmartLiveWell')}</Text>
            <Text style={styles.featuredSubtitle}>{t('discoverDiabeticFriendlyFoods')}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    padding: 0,
    paddingBottom: 16,
  },
  heroBanner: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  heartbeatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartbeatIcon: {
    marginRight: 10,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  subtitle: {
    color: colors.textLight,
    marginTop: 8,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  recentScanItem: {
    marginBottom: 16,
  },
  recentScanImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
  },
  featuredContainer: {
    position: 'relative',
    height: 180,
    marginTop: 24,
    marginBottom: 16,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  featuredSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 8,
    textAlign: 'center',
  },
});