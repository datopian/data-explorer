"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTranslations = void 0;
var _i18next = _interopRequireDefault(require("i18next"));
var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const initTranslations = async () => {
  await _i18next.default.use(_i18nextBrowserLanguagedetector.default).use(_reactI18next.initReactI18next)
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
      lookupFromSubdomainIndex: 0
    },
    resources: {
      en: {
        translation: {
          ...require('./locales/en/translation.json'),
          ...require('@datopian/chart-builder/src/i18n/locales/en/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/en/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/en/translation.json'),
          ...require('@datopian/datastore-query-builder/src/i18n/locales/en/translation.json')
        }
      },
      da: {
        translation: {
          ...require('./locales/da/translation.json'),
          ...require('@datopian/chart-builder/src/i18n/locales/da/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/da/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/da/translation.json'),
          ...require('@datopian/datastore-query-builder/src/i18n/locales/da/translation.json')
        }
      },
      fr: {
        translation: {
          ...require('./locales/fr/translation.json'),
          ...require('@datopian/chart-builder/src/i18n/locales/fr/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/fr/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/fr/translation.json'),
          ...require('@datopian/datastore-query-builder/src/i18n/locales/fr/translation.json')
        }
      },
      pt_BR: {
        translation: {
          ...require('./locales/pt_BR/translation.json'),
          ...require('@datopian/chart-builder/src/i18n/locales/pt_BR/translation.json'),
          ...require('@datopian/map-builder/src/i18n/locales/pt_BR/translation.json'),
          ...require('@datopian/datapackage-views-js/src/i18n/locales/pt_BR/translation.json'),
          ...require('@datopian/datastore-query-builder/src/i18n/locales/pt_BR/translation.json')
        }
      }
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
  });
};
exports.initTranslations = initTranslations;