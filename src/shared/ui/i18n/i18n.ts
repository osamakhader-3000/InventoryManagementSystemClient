import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define translation resources
import enTranslation from './locales/en/TitlesAndLables.json'
import arTranslation from './locales/ar/TitlesAndLables.json'

// Define resources
const resources = {
  en: {
    translation: enTranslation,
  },
  ar: {
    translation: arTranslation,
  },
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;