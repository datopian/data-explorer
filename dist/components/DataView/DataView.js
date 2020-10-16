"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataView = DataView;

require("../../i18n/i18n");

var _react = _interopRequireDefault(require("react"));

var _Table = _interopRequireDefault(require("./Table.js"));

var _datapackageRender = require("datapackage-render");

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DataView(props) {
  var _useTranslation = (0, _reactI18next.useTranslation)(),
      t = _useTranslation.t;

  if (props.loading) {
    return _react.default.createElement("div", {
      className: "App"
    }, _react.default.createElement(_reactLoaderSpinner.default, {
      type: "Grid",
      color: "#D3D3D3",
      height: "50",
      width: "50"
    }));
  }

  var countViews = props.datapackage.views ? props.datapackage.views.length : 0;

  if (countViews === 0) {
    return _react.default.createElement("div", {
      className: "App"
    }, t('No views available'));
  }

  for (var i = 0; i < countViews; i++) {
    var view = props.datapackage.views[i];

    if (!view.resources[0]._values && view.resources[0].data) {
      view.resources[0]._values = view.resources[0].data;
    }

    if (view.specType === 'table' && view.resources[0]._values) {
      var data = (0, _datapackageRender.getResourceCachedValues)(view.resources[0], true);
      var schema = view.resources[0].schema || {};
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_Table.default, {
        data: data,
        schema: schema
      }));
    } else {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_reactLoaderSpinner.default, {
        type: "Grid",
        color: "#D3D3D3",
        height: "50",
        width: "50"
      }));
    }
  }
}