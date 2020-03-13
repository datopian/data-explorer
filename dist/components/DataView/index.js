"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLoader = _interopRequireDefault(require("react-loader"));

var _datapackageViewsJs = require("@datopian/datapackage-views-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var views = props.datapackage.views;

  var showGuideText = function showGuideText(specType) {
    return _react.default.createElement("div", {
      className: "dx-guiding-text"
    }, specType === 'simple' ? _react.default.createElement("p", null, "Select chart type, group column (ordinate x-axis) and series (abscissa y-axis) on the right hand side panel.") : '', specType === 'tabularmap' ? _react.default.createElement("p", null, "Select geo data column on the right hand side panel.") : '');
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
    return _react.default.createElement(_datapackageViewsJs.DataView, {
      key: Math.random(),
      datapackage: {
        views: [view]
      }
    });
  })));
};

exports.default = _default;