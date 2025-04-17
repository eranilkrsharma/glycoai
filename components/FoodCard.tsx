import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { ArrowRight } from 'lucide-react-native';
import colors from '@/constants/colors';
import { FoodItem } from '@/mocks/food-database';
import { router } from 'expo-router';
import { useTranslation } from '@/hooks/useTranslation';

interface FoodCardProps {
  food: FoodItem;
  showArrow?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, showArrow = true }) => {
  const { t } = useTranslation();

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

  const getImageUrl = () => {
    // Using Unsplash for food images
    return `https://source.unsplash.com/featured/?${food.name.replace(' ', ',')}`;
  };

  const handlePress = () => {
    router.push({
      pathname: '/result',
      params: { foodId: food.id }
    });
  };

  const getRecommendationText = () => {
    switch (food.diabeticRecommendation) {
      case 'good':
        return t('goodChoice');
      case 'moderate':
        return t('moderate');
      case 'limit':
        return t('limitConsumption');
      default:
        return '';
    }
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <Image
        source={{ uri: getImageUrl() }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{food.name}</Text>
        <View style={styles.infoRow}>
          <View style={[
            styles.badge,
            { backgroundColor: getRecommendationColor() + '20' }
          ]}>
            <Text style={[
              styles.badgeText,
              { color: getRecommendationColor() }
            ]}>
              {getRecommendationText()}
            </Text>
          </View>
          <Text style={styles.giText}>
            GI: {food.giIndex === 0 ? 'N/A' : food.giIndex}
          </Text>
        </View>
        {/* Added sugar info */}
        <Text style={styles.sugarText}>
          {t('sugar')}: {food.sugar}g {t('per')} 100g
        </Text>
      </View>
      {showArrow && (
        <View style={styles.arrowContainer}>
          <ArrowRight size={20} color={colors.primary} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    flexDirection: 'row',
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  giText: {
    fontSize: 12,
    color: colors.textLight,
  },
  sugarText: {
    fontSize: 12,
    color: colors.textLight,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingRight: 16,
  },
});

export default FoodCard;