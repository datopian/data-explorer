"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../i18n/i18n");
var _react = _interopRequireDefault(require("react"));
var _reactLoader = _interopRequireDefault(require("react-loader"));
var _datapackageViewsJs = require("@datopian/datapackage-views-js");
var _table = _interopRequireDefault(require("../DataView/table"));
var _reactI18next = require("react-i18next");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = props => {
  const {
    t
  } = (0, _reactI18next.useTranslation)();
  const views = props.datapackage.views;
  const showGuideText = specType => {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "dx-guiding-text"
    }, specType === 'simple' ? /*#__PURE__*/_react.default.createElement("p", null, t('Select chart type, group column (abscissa x-axis) and series (ordinate y-axis) on the right hand side panel.')) : '', specType === 'tabularmap' ? /*#__PURE__*/_react.default.createElement("p", null, t('Select geo data column on the right hand side panel.')) : '');
  };
  const checkIfGuideIsNeeded = view => {
    if (view.specType === 'simple' && !(view.spec && Object.keys(view.spec).length > 0)) {
      return true;
    }
    return false;
  };
  return /*#__PURE__*/_react.default.createElement(_reactLoader.default, {
    loaded: !props.loading,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, checkIfGuideIsNeeded(views[0]) ? showGuideText(views[0].specType) : views.map(view => {
    // use react-table v8 for table view
    // it's not supported in the current version of @datopian/datapackage-views-js
    // so we need to handle it separately
    if (view && view.specType === 'table') {
      if (view.resources && view.resources[0]) {
        return /*#__PURE__*/_react.default.createElement(_table.default, {
          resource: view.resources[0],
          data: view.resources[0].data || [],
          schema: view.resources[0].schema
        });
      }
    } else {
      return /*#__PURE__*/_react.default.createElement(_datapackageViewsJs.DataView, {
        key: Math.random(),
        datapackage: {
          views: [view]
        }
      });
    }
  })));
};
exports.default = _default;