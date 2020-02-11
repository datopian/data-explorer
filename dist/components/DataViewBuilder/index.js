"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _testChartBuilder = _interopRequireDefault(require("../../testData/testChartBuilder.json"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  return _react.default.createElement("div", null, _react.default.createElement("h2", {
    className: "text-2xl"
  }, "DataView Builder"), _react.default.createElement("button", {
    className: "bg-blue-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-2",
    onClick: function onClick(e) {
      props.dataViewBuilderAction(_testChartBuilder.default);
    }
  }, t('UPDATE CHART')));
};

exports.default = _default;