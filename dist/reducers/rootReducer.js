"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _widgets = _interopRequireDefault(require("./widgets"));
var _datapackage = _interopRequireDefault(require("./datapackage"));
var _datastoreFilters = _interopRequireDefault(require("./datastoreFilters"));
var _serializedState = _interopRequireDefault(require("./serializedState"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = (state = {}, action) => {
  return {
    widgets: (0, _widgets.default)(state.widgets, action),
    datapackage: (0, _datapackage.default)(state.datapackage, action),
    datastoreFilters: (0, _datastoreFilters.default)(state.datastoreFilters, action),
    serializedState: (0, _serializedState.default)(state.serializedState, action, state) // we pass root of tree so it can export entire app state
  };
};
exports.default = _default;