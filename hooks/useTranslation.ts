import { useLanguageStore } from '@/store/language-store';
import { translations, TranslationKey } from '@/constants/translations';

export function useTranslation() {
  const { language } = useLanguageStore();
  
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };
  
  return { t, language };
}