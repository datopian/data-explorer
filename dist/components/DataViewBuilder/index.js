"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireWildcard(require("react"));

var _testChartBuilder = _interopRequireDefault(require("../../testData/testChartBuilder.json"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t; // loading component for suspense fallback


  var Loader = function Loader() {
    return _react.default.createElement("div", {
      className: "App"
    }, _react.default.createElement("div", null, "loading..."));
  };

  return _react.default.createElement(_react.Suspense, {
    fallback: _react.default.createElement(Loader, null)
  }, _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "text-2xl"
  }, "DataView Builder"), _react.default.createElement("button", {
    className: "bg-blue-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-2",
    onClick: function onClick(e) {
      props.dataViewBuilderAction(_testChartBuilder.default);
    }
  }, t('UPDATE CHART'))));
};

exports.default = _default;