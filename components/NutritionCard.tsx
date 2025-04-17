import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '@/constants/colors';
import { FoodItem } from '@/mocks/food-database';
import { AlertTriangle } from 'lucide-react-native';
import { useTranslation } from '@/hooks/useTranslation';

interface NutritionCardProps {
  food: FoodItem;
  isAiAnalyzed?: boolean;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ food, isAiAnalyzed = false }) => {
  const { t } = useTranslation();
  
  // Check if nutrition data is missing (all zeros)
  const hasNutritionData = food.carbs > 0 || food.protein > 0 || food.fat > 0 || food.calories > 0;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('nutritionFacts')}</Text>
        {isAiAnalyzed && (
          <View style={styles.aiPoweredBadge}>
            <Text style={styles.aiPoweredText}>{t('aiPowered')}</Text>
          </View>
        )}
      </View>
      
      {!hasNutritionData ? (
        <View style={styles.noDataContainer}>
          <AlertTriangle size={24} color={colors.warning} style={styles.noDataIcon} />
          <Text style={styles.noDataText}>
            {t('noNutritionData')} {t('noNutritionDataMessage')}
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>{t('calories')}</Text>
            <Text style={styles.value}>{food.calories} kcal</Text>
          </View>
          
          <View style={styles.nutrientContainer}>
            <View style={styles.nutrient}>
              <View style={[styles.nutrientBar, { 
                backgroundColor: colors.primary,
                height: `${Math.min(food.carbs * 2, 100)}%`
              }]} />
              <Text style={styles.nutrientValue}>{food.carbs}g</Text>
              <Text style={styles.nutrientLabel}>{t('carbs')}</Text>
            </View>
            
            <View style={styles.nutrient}>
              <View style={[styles.nutrientBar, { 
                backgroundColor: colors.secondary,
                height: `${Math.min(food.sugar * 3, 100)}%`
              }]} />
              <Text style={styles.nutrientValue}>{food.sugar}g</Text>
              <Text style={styles.nutrientLabel}>{t('sugar')}</Text>
            </View>
            
            <View style={styles.nutrient}>
              <View style={[styles.nutrientBar, { 
                backgroundColor: colors.success,
                height: `${Math.min(food.fiber * 10, 100)}%`
              }]} />
              <Text style={styles.nutrientValue}>{food.fiber}g</Text>
              <Text style={styles.nutrientLabel}>{t('fiber')}</Text>
            </View>
            
            <View style={styles.nutrient}>
              <View style={[styles.nutrientBar, { 
                backgroundColor: colors.info,
                height: `${Math.min(food.protein * 3, 100)}%`
              }]} />
              <Text style={styles.nutrientValue}>{food.protein}g</Text>
              <Text style={styles.nutrientLabel}>{t('protein')}</Text>
            </View>
            
            <View style={styles.nutrient}>
              <View style={[styles.nutrientBar, { 
                backgroundColor: colors.warning,
                height: `${Math.min(food.fat * 5, 100)}%`
              }]} />
              <Text style={styles.nutrientValue}>{food.fat}g</Text>
              <Text style={styles.nutrientLabel}>{t('fat')}</Text>
            </View>
          </View>
          
          <View style={styles.netCarbsContainer}>
            <Text style={styles.netCarbsLabel}>{t('netCarbs')}</Text>
            <Text style={styles.netCarbsValue}>{Math.max(0, food.carbs - food.fiber)}g</Text>
            <Text style={styles.netCarbsInfo}>({t('importantForBloodSugar')})</Text>
          </View>
          
          <View style={styles.sugarInfoContainer}>
            <Text style={styles.sugarInfoLabel}>{t('sugarImpact')}</Text>
            <Text style={[
              styles.sugarImpactValue, 
              { 
                color: food.sugar <= 5 ? colors.success : 
                      food.sugar <= 10 ? colors.warning : 
                      colors.danger 
              }
            ]}>
              {food.sugar <= 5 ? t('low') : food.sugar <= 10 ? t('moderate') : t('high')}
            </Text>
            <Text style={styles.sugarInfoText}>
              {food.sugar <= 5 
                ? t('sugarInfoLow')
                : food.sugar <= 10 
                ? t('sugarInfoModerate')
                : t('sugarInfoHigh')}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  aiPoweredBadge: {
    backgroundColor: colors.info + '30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  aiPoweredText: {
    fontSize: 12,
    color: colors.info,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: 16,
    color: colors.text,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  nutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    marginVertical: 16,
    alignItems: 'flex-end',
  },
  nutrient: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  nutrientBar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  nutrientValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  nutrientLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  netCarbsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  netCarbsLabel: {
    fontSize: 16,
    color: colors.text,
  },
  netCarbsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: 8,
  },
  netCarbsInfo: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  sugarInfoContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  sugarInfoLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  sugarImpactValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sugarInfoText: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  noDataContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.warning + '10',
    borderRadius: 8,
  },
  noDataIcon: {
    marginBottom: 12,
  },
  noDataText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default NutritionCard;