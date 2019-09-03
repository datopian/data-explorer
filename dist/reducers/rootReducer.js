"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _widgets = _interopRequireDefault(require("./widgets"));

var _datapackage = _interopRequireDefault(require("./datapackage"));

var _datastoreFilters = _interopRequireDefault(require("./datastoreFilters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _redux.combineReducers)({
  widgets: _widgets.default,
  datastoreFilters: _datastoreFilters.default,
  datapackage: _datapackage.default
});

exports.default = _default;