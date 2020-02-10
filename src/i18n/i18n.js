import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({

    // for all options read: https://github.com/i18next/i18next-browser-languageDetector#detector-options
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

      // keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'defaultLocale',
      lookupLocalStorage: 'defaultLocale',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
    },

    resources: {
      en: {
        translation: {
          ...require('./locales/en/translation.json'),
          ...require('chart-builder/src/i18n/locales/en/translation.json'),
          ...require('map-builder/src/i18n/locales/en/translation.json'),
          ...require('datapackage-views-js/src/i18n/locales/en/translation.json'),
          ...require('datastore-query-builder/src/i18n/locales/en/translation.json'),
        }
      },
      da: {
        translation: {
          ...require('./locales/da/translation.json'),
          ...require('chart-builder/src/i18n/locales/da/translation.json'),
          ...require('map-builder/src/i18n/locales/da/translation.json'),
          ...require('datapackage-views-js/src/i18n/locales/da/translation.json'),
          ...require('datastore-query-builder/src/i18n/locales/da/translation.json'),
        }
      },
    },

    react: {
      useSuspense: false
    },

    initImmediate: false,
    fallbackLng: "en",
    debug: true,

    // use content as keys
    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  })

export default i18n