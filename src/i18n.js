import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from "react-i18next";

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({

    // for all options read: https://github.com/i18next/i18next-browser-languageDetector#detector-options
    detection: {
      order: ['cookie'],
      lookupCookie: 'defaultLocale'
    },

    initImmediate: false,
    fallbackLng: "en",
    debug: true,

    // use content as keys
    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;