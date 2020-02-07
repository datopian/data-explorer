"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLoader = _interopRequireDefault(require("react-loader"));

var _datapackageViewsJs = require("datapackage-views-js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var views = props.datapackage.views;
  return _react.default.createElement(_reactLoader.default, {
    loaded: !props.loading,
    style: {
      position: "relative"
    }
  }, _react.default.createElement("div", null, views.map(function (view) {
    return _react.default.createElement(_datapackageViewsJs.DataView, {
      key: Math.random(),
      datapackage: {
        views: [view]
      }
    });
  })));
};

exports.default = _default;