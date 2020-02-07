"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      translation: _objectSpread({}, require('./locales/en/translation.json'), {}, require('chart-builder/src/i18n/locales/en/translation.json'), {}, require('map-builder/src/i18n/locales/en/translation.json'), {}, require('datapackage-views-js/src/i18n/locales/en/translation.json'), {}, require('datastore-query-builder/src/i18n/locales/en/translation.json'))
    },
    da: {
      translation: _objectSpread({}, require('./locales/da/translation.json'), {}, require('chart-builder/src/i18n/locales/da/translation.json'), {}, require('map-builder/src/i18n/locales/da/translation.json'), {}, require('datapackage-views-js/src/i18n/locales/da/translation.json'), {}, require('datastore-query-builder/src/i18n/locales/da/translation.json'))
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