"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("./store"));

require("./App.css");

var _App2 = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(props) {
  var datapackage = JSON.parse(props.datapackage);
  var views = JSON.parse(JSON.stringify(datapackage.views));
  delete datapackage.views;
  var widgetNames = {
    'table': 'Table',
    'tabularmap': 'Map',
    'map': 'Map',
    'simple': 'Chart'
  };
  var widgets = views.map(function (view, index) {
    return {
      active: index === 0 ? true : false,
      name: widgetNames[view.specType],
      datapackage: {
        views: [view]
      }
    };
  });
  return _react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)({
      widgets: widgets,
      views: views,
      datapackage: datapackage
    })
  }, _react.default.createElement(_App2.default, null));
};

exports.default = _default;