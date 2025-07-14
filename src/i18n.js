import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
    .use(LanguageDetector) // Detects user language
    .use(initReactI18next) // Passes i18n to react-i18next
    .init({
        resources: {
            en: { translation: en },
            ar: { translation: ar }
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // React already protects from XSS
        }
    });

export default i18n;
