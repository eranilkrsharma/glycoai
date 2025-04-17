import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScanSearch } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  message 
}) => {
  const { t } = useTranslation();
  
  const defaultTitle = t('noScansYet');
  const defaultMessage = t('scanFirstFood');

  return (
    <View style={styles.container}>
      <ScanSearch size={80} color={colors.primary} style={styles.icon} />
      <Text style={styles.title}>{title || defaultTitle}</Text>
      <Text style={styles.message}>{message || defaultMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    marginBottom: 24,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EmptyState;