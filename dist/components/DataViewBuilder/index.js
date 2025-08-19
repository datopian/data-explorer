"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../i18n/i18n");
var _react = _interopRequireDefault(require("react"));
var _testChartBuilder = _interopRequireDefault(require("../../testData/testChartBuilder.json"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = props => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-2xl"
  }, "DataView Builder"), /*#__PURE__*/_react.default.createElement("button", {
    className: "bg-blue-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full m-2",
    onClick: e => {
      props.dataViewBuilderAction(_testChartBuilder.default);
    }
  }, t('UPDATE CHART')));
};
exports.default = _default;