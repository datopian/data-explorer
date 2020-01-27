"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _reactI18next = require("react-i18next");

var _translation = _interopRequireDefault(require("./locales/en/translation.json"));

var _translation2 = _interopRequireDefault(require("./locales/da/translation.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_i18next.default.use(_i18nextBrowserLanguagedetector.default).use(_reactI18next.initReactI18next) // init i18next
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
      translation: _translation.default
    },
    da: {
      translation: _translation2.default
    }
  },
  react: {
    useSuspense: false
  },
  initImmediate: false,
  fallbackLng: "en",
  // use content as keys
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

var _default = _i18next.default;
exports.default = _default;