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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = function _default(props) {
  var datapackage; // Allow datapackage json or obj

  if (typeof props.datapackage === 'string') {
    try {
      datapackage = JSON.parse(props.datapackage);
    } catch (e) {
      // TODO -- would be nice for the app to still load in an empty state on fail case
      datapackage = {};
      console.warn('Invalid datapackage', e);
    }
  } else if (_typeof(props.datapackage) === 'object') {
    datapackage = props.datapackage;
  }

  var views;

  try {
    views = JSON.parse(JSON.stringify(datapackage.views));
    delete datapackage.views;
  } catch (_unused) {
    console.log('No views set on datapackage');
  }

  var widgetsFromViews = function widgetsFromViews(views) {
    var widgetNames = {
      'table': 'Table',
      'tabularmap': 'Map',
      'map': 'Map',
      'simple': 'Chart'
    };
    return views.map(function (view, index) {
      return {
        active: index === 0 ? true : false,
        name: widgetNames[view.specType],
        datapackage: {
          views: [view]
        }
      };
    });
  };

  var widgets = props.widgets ? props.widgets : widgetsFromViews(views);
  return _react.default.createElement(_reactRedux.Provider, {
    store: (0, _store.default)({
      widgets: widgets,
      datapackage: datapackage
    })
  }, _react.default.createElement(_App2.default, null));
};

exports.default = _default;