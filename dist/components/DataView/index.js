"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("../../i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactLoader = _interopRequireDefault(require("react-loader"));

var _DataView = require("./DataView");

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  var views = props.datapackage.views;

  var showGuideText = function showGuideText(specType) {
    return _react.default.createElement("div", {
      className: "dx-guiding-text"
    }, specType === 'simple' ? _react.default.createElement("p", null, t('Select chart type, group column (abscissa x-axis) and series (ordinate y-axis) on the right hand side panel.')) : '', specType === 'tabularmap' ? _react.default.createElement("p", null, t('Select geo data column on the right hand side panel.')) : '');
  };

  var checkIfGuideIsNeeded = function checkIfGuideIsNeeded(view) {
    if (view.specType === 'simple' && !(view.spec && Object.keys(view.spec).length > 0)) {
      return true;
    }

    return false;
  };

  return _react.default.createElement(_reactLoader.default, {
    loaded: !props.loading,
    style: {
      position: "relative"
    }
  }, _react.default.createElement("div", null, checkIfGuideIsNeeded(views[0]) ? showGuideText(views[0].specType) : views.map(function (view) {
    return _react.default.createElement(_DataView.DataView, {
      key: Math.random(),
      datapackage: {
        views: [view]
      }
    });
  })));
};

exports.default = _default;