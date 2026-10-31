import React, { Suspense } from 'react';
import i18n from 'i18next';
import { initReactI18next } from '../node_modules/react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector/cjs';
// Import translations
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import arTranslation from './locales/ar/translation.json';
const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  },
  ar: {
    translation: arTranslation
  }
};
i18n.
  use(LanguageDetector).
  use(initReactI18next).
  init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    }
  });
export default i18n;