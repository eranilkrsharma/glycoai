import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

interface GIIndexScaleProps {
  value: number;
}

const GIIndexScale: React.FC<GIIndexScaleProps> = ({ value }) => {
  const { t } = useTranslation();
  
  // Determine the color based on GI value
  const getColor = () => {
    if (value === 0) return colors.info; // No GI (proteins, fats)
    if (value <= 55) return colors.success; // Low GI
    if (value <= 69) return colors.warning; // Medium GI
    return colors.danger; // High GI
  };

  // Determine the label based on GI value
  const getLabel = () => {
    if (value === 0) return t('noGI');
    if (value <= 55) return t('lowGI');
    if (value <= 69) return t('mediumGI');
    return t('highGI');
  };

  // Calculate position on the scale (0-100%)
  const getPosition = () => {
    if (value === 0) return 0;
    return Math.min(Math.max((value / 100) * 100, 0), 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scaleContainer}>
        <View style={styles.scale}>
          <View style={styles.lowSection} />
          <View style={styles.mediumSection} />
          <View style={styles.highSection} />
        </View>
        <View 
          style={[
            styles.indicator, 
            { 
              left: `${getPosition()}%`,
              backgroundColor: getColor()
            }
          ]} 
        />
      </View>
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>0</Text>
        <Text style={styles.label}>55</Text>
        <Text style={styles.label}>70</Text>
        <Text style={styles.label}>100</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={[styles.valueText, { color: getColor() }]}>
          {value === 0 ? 'N/A' : value} - {getLabel()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  scaleContainer: {
    position: 'relative',
    height: 20,
    width: '100%',
  },
  scale: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  lowSection: {
    flex: 55,
    backgroundColor: colors.success,
  },
  mediumSection: {
    flex: 15,
    backgroundColor: colors.warning,
  },
  highSection: {
    flex: 30,
    backgroundColor: colors.danger,
  },
  indicator: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    top: -4,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: 'white',
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: colors.textLight,
  },
  valueContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GIIndexScale;