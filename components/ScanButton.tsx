import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { Camera, Keyboard } from 'lucide-react-native';
import colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import ManualEntryModal from './ManualEntryModal';
import { useTranslation } from '@/hooks/useTranslation';

interface ScanButtonProps {
  onPress: () => void;
  isScanning?: boolean;
}

const ScanButton: React.FC<ScanButtonProps> = ({ 
  onPress, 
  isScanning = false 
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const handleTextEntry = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          isScanning && styles.buttonScanning
        ]}
        onPress={handlePress}
        disabled={isScanning}
      >
        <Camera 
          size={28} 
          color={colors.card} 
          style={styles.icon} 
        />
        <Text style={styles.text}>
          {isScanning ? t('scanning') : t('scanFood')}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.textButton,
          pressed && styles.textButtonPressed
        ]}
        onPress={handleTextEntry}
      >
        <Keyboard size={20} color={colors.primary} style={styles.textIcon} />
        <Text style={styles.textButtonLabel}>{t('enterFoodManually')}</Text>
      </Pressable>

      <ManualEntryModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: colors.primaryLight,
    transform: [{ scale: 0.98 }],
  },
  buttonScanning: {
    backgroundColor: colors.textLight,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    color: colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
  },
  textButtonPressed: {
    opacity: 0.7,
  },
  textIcon: {
    marginRight: 8,
  },
  textButtonLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ScanButton;