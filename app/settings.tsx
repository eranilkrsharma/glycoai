import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Settings, Database, History, Info, Trash2, Heart, Globe } from 'lucide-react-native';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { useScanStore } from '@/store/scan-store';
import { useLanguageStore, Language } from '@/store/language-store';
import { useTranslation } from '@/hooks/useTranslation';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export default function SettingsScreen() {
  const { clearHistory } = useScanStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [saveScans, setSaveScans] = React.useState(true);
  const [notifications, setNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleClearHistory = () => {
    Alert.alert(
      t('clearScanHistory'),
      t('clearHistoryConfirm'),
      [
        {
          text: t('cancel'),
          style: "cancel"
        },
        { 
          text: t('clear'), 
          style: "destructive",
          onPress: () => {
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }
            clearHistory();
            Alert.alert(t('success'), t('historyCleared'));
          }
        }
      ]
    );
  };

  const handleToggleSwitch = (setting: string, value: boolean) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    switch (setting) {
      case 'saveScans':
        setSaveScans(value);
        break;
      case 'notifications':
        setNotifications(value);
        break;
      case 'darkMode':
        setDarkMode(value);
        break;
    }
  };

  const handleLanguageChange = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Toggle between English and Hindi
    const newLanguage: Language = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Settings size={28} color={colors.primary} />
          <Text style={typography.heading2}>{t('settings')}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://source.unsplash.com/featured/?diabetes,health,medical' }}
            style={styles.headerImage}
            contentFit="cover"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('appSettings')}</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Database size={20} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>{t('saveScanHistory')}</Text>
            </View>
            <Switch
              value={saveScans}
              onValueChange={(value) => handleToggleSwitch('saveScans', value)}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={saveScans ? colors.primary : colors.textLight}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Info size={20} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>{t('notifications')}</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={(value) => handleToggleSwitch('notifications', value)}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notifications ? colors.primary : colors.textLight}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Heart size={20} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>{t('darkMode')}</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(value) => handleToggleSwitch('darkMode', value)}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={darkMode ? colors.primary : colors.textLight}
            />
          </View>

          {/* Added language toggle */}
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe size={20} color={colors.primary} style={styles.settingIcon} />
              <Text style={styles.settingLabel}>{t('language')}</Text>
            </View>
            <Pressable 
              style={styles.languageButton}
              onPress={handleLanguageChange}
            >
              <Text style={styles.languageButtonText}>
                {language === 'en' ? 'English' : 'हिंदी'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dataManagement')}</Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed
            ]}
            onPress={handleClearHistory}
          >
            <Trash2 size={20} color={colors.danger} style={styles.actionIcon} />
            <Text style={[styles.actionText, { color: colors.danger }]}>{t('clearScanHistory')}</Text>
          </Pressable>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>{t('aboutDiabetScan')}</Text>
          <Text style={styles.aboutText}>
            {t('aboutText')}
          </Text>
          <Text style={styles.versionText}>{t('version')}</Text>
        </View>
        
        <View style={styles.apiInfoSection}>
          <Text style={styles.apiInfoTitle}>{t('aiPoweredAnalysis')}</Text>
          <Text style={styles.apiInfoText}>
            {t('aiInfoText')}
          </Text>
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
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 150,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButtonPressed: {
    opacity: 0.7,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  aboutSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'right',
  },
  apiInfoSection: {
    backgroundColor: colors.info + '15',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  apiInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  apiInfoText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  languageButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  languageButtonText: {
    color: colors.card,
    fontWeight: '600',
    fontSize: 14,
  },
});