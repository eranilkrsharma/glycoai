import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check, AlertTriangle, X } from 'lucide-react-native';
import colors from '@/constants/colors';
import { FoodItem } from '@/mocks/food-database';
import { useTranslation } from '@/hooks/useTranslation';

interface RecommendationCardProps {
  food: FoodItem;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ food }) => {
  const { t } = useTranslation();

  const getRecommendationIcon = () => {
    switch (food.diabeticRecommendation) {
      case 'good':
        return <Check size={24} color={colors.success} />;
      case 'moderate':
        return <AlertTriangle size={24} color={colors.warning} />;
      case 'limit':
        return <X size={24} color={colors.danger} />;
      default:
        return null;
    }
  };

  const getRecommendationTitle = () => {
    switch (food.diabeticRecommendation) {
      case 'good':
        return t('goodChoice');
      case 'moderate':
        return t('consumeInModeration');
      case 'limit':
        return t('limitConsumption');
      default:
        return '';
    }
  };

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

  return (
    <View style={styles.container}>
      <View style={[
        styles.header, 
        { backgroundColor: getRecommendationColor() + '20' }
      ]}>
        {getRecommendationIcon()}
        <Text style={[
          styles.title, 
          { color: getRecommendationColor() }
        ]}>
          {getRecommendationTitle()}
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.reasoningTitle}>{t('why')}</Text>
        <Text style={styles.reasoning}>{food.reasoning}</Text>
        
        <Text style={styles.tipsTitle}>{t('tips')}</Text>
        <Text style={styles.tips}>{food.tips}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: {
    padding: 16,
  },
  reasoningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  reasoning: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  tips: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});

export default RecommendationCard;