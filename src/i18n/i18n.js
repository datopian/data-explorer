import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"


export const initTranslations = async () => {
  await i18n
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
          ...require('@datopian/chart-builder/src/i18n/locales/en/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/en/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/en/translation.json'),
        }
      },
      da: {
        translation: {
          ...require('./locales/da/translation.json'),
          ...require('@datopian/chart-builder/src/i18n/locales/da/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/da/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/da/translation.json'),
        }
      },
      fr: {
        translation: {
          ...require('./locales/fr/translation.json'),
          ...require('@datopian/chart-builder/src/i18n/locales/fr/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/fr/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/fr/translation.json'),
        },
      },
    },

    react: {
      useSuspense: false
    },

    initImmediate: false,
    debug: false,

    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    keySeparator: false,

    // do not load a fallback
    fallbackLng: false,

    interpolation: {
      escapeValue: false
    }
  })
}
